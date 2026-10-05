import { AnimatePresence, motion } from 'framer-motion'
import { ChatCircleDots, EnvelopeSimple, HourglassMedium, PaperPlaneTilt, Warning, X } from '@phosphor-icons/react'
import { useEffect, useRef, useState } from 'react'
import { MAX_INPUT_CHARS, useChat, type ChatError } from '../hooks/useChat'
import { contact } from '../lib/data'

const SUGGESTIONS = [
  'Qual é a experiência atual do Vitor?',
  'Quais tecnologias ele domina?',
  'Como ele usa IA no trabalho?',
]

export function ChatWidget() {
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState('')
  const { messages, loading, error, send } = useChat()
  const listRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight })
  }, [messages, error])

  useEffect(() => {
    if (!open) return
    inputRef.current?.focus()
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  function submit(text: string) {
    if (!text.trim() || loading) return
    setInput('')
    void send(text)
  }

  return (
    <div className="fixed bottom-4 right-4 z-[60] md:bottom-6 md:right-6">
      <AnimatePresence>
        {open && (
          <motion.section
            role="dialog"
            aria-label="Chat com o assistente do Vitor"
            initial={{ opacity: 0, y: 16, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.97 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-x-3 bottom-20 flex h-[min(34rem,calc(100dvh-7rem))] flex-col overflow-hidden rounded-2xl border border-line bg-surface shadow-2xl shadow-black/60 sm:absolute sm:inset-x-auto sm:bottom-16 sm:right-0 sm:w-[24rem]"
          >
            <header className="flex items-center justify-between border-b border-line px-4 py-3">
              <div>
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent">Pergunte à IA</p>
                <p className="text-sm text-muted">Assistente sobre o Vitor</p>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="p-1 text-muted transition-colors hover:text-paper"
                aria-label="Fechar chat"
              >
                <X size={18} />
              </button>
            </header>

            <div ref={listRef} className="flex flex-1 flex-col gap-3 overflow-y-auto px-4 py-4" aria-live="polite">
              <Bubble role="assistant">
                Oi! Sou uma IA que responde dúvidas sobre o Vitor: experiências, stack, formação e projetos. O que
                você quer saber?
              </Bubble>

              {messages.map((message, i) => (
                <Bubble key={i} role={message.role}>
                  {message.content || <TypingDots />}
                </Bubble>
              ))}

              {messages.length === 0 && (
                <div className="mt-1 flex flex-col items-start gap-2">
                  {SUGGESTIONS.map((suggestion) => (
                    <button
                      key={suggestion}
                      type="button"
                      onClick={() => submit(suggestion)}
                      className="rounded-full border border-line px-3 py-1.5 text-left text-xs text-muted transition-colors hover:border-accent hover:text-accent"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              )}

              {error && <ErrorNotice error={error} />}
            </div>

            <form
              onSubmit={(event) => {
                event.preventDefault()
                submit(input)
              }}
              className="flex items-center gap-2 border-t border-line p-3"
            >
              <input
                ref={inputRef}
                value={input}
                onChange={(event) => setInput(event.target.value)}
                maxLength={MAX_INPUT_CHARS}
                placeholder="Pergunte sobre o Vitor..."
                aria-label="Sua pergunta"
                className="min-w-0 flex-1 rounded-full border border-line bg-ink px-4 py-2 text-base text-paper placeholder:text-muted-2 focus:border-accent focus:outline-none sm:text-sm"
              />
              <button
                type="submit"
                disabled={loading || !input.trim()}
                className="flex size-9 shrink-0 items-center justify-center rounded-full bg-accent text-ink transition-opacity disabled:opacity-40"
                aria-label="Enviar pergunta"
              >
                <PaperPlaneTilt size={16} weight="fill" />
              </button>
            </form>
            <p className="px-4 pb-2 text-center font-mono text-[10px] uppercase tracking-[0.15em] text-muted-2">
              Resposta gerada por IA · pode conter erros
            </p>
          </motion.section>
        )}
      </AnimatePresence>

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? 'Fechar chat' : 'Abrir chat com a IA'}
        aria-expanded={open}
        className="relative flex size-14 items-center justify-center rounded-full bg-accent text-ink shadow-lg shadow-accent/20 transition-transform hover:scale-105 active:scale-95"
      >
        {open ? <X size={24} weight="bold" /> : <ChatCircleDots size={26} weight="fill" />}
      </button>
    </div>
  )
}

function Bubble({ role, children }: { role: 'user' | 'assistant'; children: React.ReactNode }) {
  const isUser = role === 'user'
  return (
    <div
      className={`max-w-[85%] whitespace-pre-wrap rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
        isUser ? 'self-end bg-accent/15 text-paper' : 'self-start border border-line bg-surface-2 text-paper'
      }`}
    >
      {children}
    </div>
  )
}

function TypingDots() {
  return (
    <span className="flex gap-1 py-1" aria-label="Digitando">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="size-1.5 animate-pulse rounded-full bg-muted"
          style={{ animationDelay: `${i * 150}ms` }}
        />
      ))}
    </span>
  )
}

function ErrorNotice({ error }: { error: ChatError }) {
  if (error.kind === 'unavailable') {
    return (
      <motion.div
        role="alert"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="rounded-xl border border-accent/30 bg-accent/5 p-4"
      >
        <div className="mb-2 flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-accent">
          <HourglassMedium size={16} weight="duotone" />
          IA em pausa
        </div>
        <p className="text-sm leading-relaxed text-paper">
          Este chat foi criado com o pacote gratuito do Gemini e uma base de conhecimento com dados do Vitor. Os
          tokens gratuitos acabaram por agora, ou o serviço está sobrecarregado. Tente novamente mais tarde.
        </p>
        <p className="mt-2 text-xs text-muted">Enquanto isso, fale direto com ele:</p>
        <div className="mt-2 flex flex-wrap gap-2">
          <a
            href={`mailto:${contact.email}`}
            className="inline-flex items-center gap-1.5 rounded-full border border-line px-3 py-1.5 text-xs text-paper transition-colors hover:border-accent hover:text-accent"
          >
            <EnvelopeSimple size={14} /> E-mail
          </a>
          <a
            href={contact.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full border border-line px-3 py-1.5 text-xs text-paper transition-colors hover:border-accent hover:text-accent"
          >
            LinkedIn
          </a>
        </div>
      </motion.div>
    )
  }

  return (
    <p
      role="alert"
      className="flex items-start gap-2 rounded-lg border border-rose/40 bg-rose/10 px-3 py-2 text-xs text-rose"
    >
      <Warning size={14} className="mt-px shrink-0" />
      {error.message}
    </p>
  )
}
