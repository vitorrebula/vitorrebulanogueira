import { useCallback, useRef, useState } from 'react'

export type ChatMessage = { role: 'user' | 'assistant'; content: string }

export const MAX_INPUT_CHARS = 500

const GENERIC_ERROR = 'Não consegui responder agora. Tente novamente em instantes.'

// 'unavailable' cobre quota esgotada, modelo sobrecarregado e API fora do ar: o chat depende do
// pacote gratuito do Gemini. 'rate_limited' é o limite individual do visitante; 'error' é o resto.
export type ChatErrorKind = 'unavailable' | 'rate_limited' | 'error'
export type ChatError = { kind: ChatErrorKind; message: string }

class ApiError extends Error {
  kind: ChatErrorKind

  constructor(kind: ChatErrorKind, message: string) {
    super(message)
    this.kind = kind
  }
}

function kindFromCode(code: unknown): ChatErrorKind {
  if (code === 'quota' || code === 'overloaded' || code === 'unavailable') return 'unavailable'
  if (code === 'rate_limited') return 'rate_limited'
  return 'error'
}

export function useChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<ChatError | null>(null)
  const busy = useRef(false)

  const send = useCallback(
    async (raw: string) => {
      const text = raw.trim().slice(0, MAX_INPUT_CHARS)
      if (!text || busy.current) return
      busy.current = true

      const history = [...messages, { role: 'user' as const, content: text }]
      setMessages([...history, { role: 'assistant', content: '' }])
      setLoading(true)
      setError(null)

      const setAnswer = (content: string) =>
        setMessages((prev) => [...prev.slice(0, -1), { role: 'assistant', content }])

      try {
        const res = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ messages: history }),
        })

        if (!res.ok || !res.body) {
          const data = await res.json().catch(() => null)
          // Sem JSON (ex.: API fora do ar, 404/502 do proxy) também conta como indisponível.
          throw new ApiError(data ? kindFromCode(data.code) : 'unavailable', data?.error ?? GENERIC_ERROR)
        }

        const reader = res.body.getReader()
        const decoder = new TextDecoder()
        let answer = ''
        for (;;) {
          const { done, value } = await reader.read()
          if (done) break
          answer += decoder.decode(value, { stream: true })
          setAnswer(answer)
        }
        if (!answer.trim()) throw new ApiError('unavailable', GENERIC_ERROR)
      } catch (err) {
        setMessages((prev) => prev.slice(0, -1))
        // fetch rejeitado (rede caiu / servidor inacessível) cai em 'unavailable'.
        setError(
          err instanceof ApiError
            ? { kind: err.kind, message: err.message }
            : { kind: 'unavailable', message: GENERIC_ERROR },
        )
      } finally {
        busy.current = false
        setLoading(false)
      }
    },
    [messages],
  )

  return { messages, loading, error, send }
}
