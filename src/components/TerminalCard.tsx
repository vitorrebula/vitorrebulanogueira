import { AnimatePresence, motion } from 'framer-motion'
import { memo, useEffect, useState } from 'react'

type Line = { prompt: string; output: string }

const LINES: Line[] = [
  { prompt: 'whoami', output: 'Vitor Rebula Nogueira' },
  { prompt: 'role --current', output: 'Engenheiro de Software @ LEVTY' },
  { prompt: 'stack --core', output: 'React · TypeScript · Node.js · Spring Boot' },
  { prompt: 'focus --ai', output: 'LangChain · LangGraph · RAG · Spec-Driven Dev' },
  { prompt: 'status', output: 'shipping · mentorando · faixa azul' },
]

const TYPE_SPEED = 34
const HOLD_MS = 1500
const ERASE_SPEED = 16

function useTypewriter(lines: Line[]) {
  const [lineIndex, setLineIndex] = useState(0)
  const [typed, setTyped] = useState('')
  const [phase, setPhase] = useState<'typing' | 'holding' | 'erasing'>('typing')

  useEffect(() => {
    const current = lines[lineIndex].output
    let timeout: number

    if (phase === 'typing') {
      if (typed.length < current.length) {
        timeout = window.setTimeout(() => setTyped(current.slice(0, typed.length + 1)), TYPE_SPEED)
      } else {
        timeout = window.setTimeout(() => setPhase('holding'), HOLD_MS)
      }
    } else if (phase === 'holding') {
      timeout = window.setTimeout(() => setPhase('erasing'), HOLD_MS)
    } else {
      if (typed.length > 0) {
        timeout = window.setTimeout(() => setTyped(current.slice(0, typed.length - 1)), ERASE_SPEED)
      } else {
        timeout = window.setTimeout(() => {
          setLineIndex((i) => (i + 1) % lines.length)
          setPhase('typing')
        }, 200)
      }
    }

    return () => window.clearTimeout(timeout)
  }, [typed, phase, lineIndex, lines])

  return { current: lines[lineIndex], typed }
}

function TerminalCardBase() {
  const { current, typed } = useTypewriter(LINES)

  return (
    <div className="relative rounded-2xl border border-line bg-surface/80 backdrop-blur-xl shadow-[0_30px_80px_-30px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.06)]">
      <div className="flex items-center gap-2 border-b border-line px-5 py-3.5">
        <span className="h-2.5 w-2.5 rounded-full bg-[#5c5c62]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#5c5c62]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#5c5c62]" />
        <span className="ml-2 font-mono text-[11px] tracking-wide text-muted-2">vitor@levty ~ zsh</span>
      </div>

      <div className="px-5 py-6 font-mono text-[13px] leading-7 sm:text-sm">
        {LINES.slice(0, LINES.indexOf(current)).map((line) => (
          <div key={line.prompt} className="text-muted-2">
            <span className="text-accent">➜ </span>
            {line.prompt}
            <div className="text-paper/70">{line.output}</div>
          </div>
        ))}

        <div>
          <span className="text-accent">➜ </span>
          <span>{current.prompt}</span>
        </div>
        <div className="min-h-[1.75em] text-paper">
          {typed}
          <motion.span
            aria-hidden
            className="ml-0.5 inline-block h-[1em] w-[7px] translate-y-[2px] bg-accent align-middle"
            animate={{ opacity: [1, 1, 0, 0] }}
            transition={{ duration: 1, repeat: Infinity, times: [0, 0.5, 0.5, 1], ease: 'linear' }}
          />
        </div>
      </div>

      <AnimatePresence>
        <motion.div
          key="pulse"
          className="pointer-events-none absolute -right-1 top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-accent"
          animate={{ opacity: [0.4, 1, 0.4], scale: [1, 1.4, 1] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
        />
      </AnimatePresence>
    </div>
  )
}

export const TerminalCard = memo(TerminalCardBase)
