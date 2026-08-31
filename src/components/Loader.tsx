import {
  AnimatePresence,
  motion,
  useMotionValue,
  useMotionValueEvent,
  useSpring,
  useTransform,
} from 'framer-motion'
import { useEffect, useState } from 'react'

const MIN_DURATION = 1100
const HOLD_DURATION = 380
const FALLBACK_DURATION = 4000

export function Loader() {
  const [visible, setVisible] = useState(true)
  const progress = useMotionValue(0)
  const smoothProgress = useSpring(progress, { stiffness: 60, damping: 20, mass: 0.4 })
  const barWidth = useTransform(smoothProgress, (v) => `${v}%`)
  const [displayValue, setDisplayValue] = useState(0)

  useMotionValueEvent(smoothProgress, 'change', (v) => setDisplayValue(Math.round(v)))

  useEffect(() => {
    document.documentElement.style.overflow = 'hidden'
    const start = performance.now()

    let raf: number
    const tick = (now: number) => {
      const elapsed = now - start
      const target = Math.min(90, (elapsed / MIN_DURATION) * 90)
      if (progress.get() < target) progress.set(target)
      if (elapsed < MIN_DURATION) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)

    const finish = () => {
      progress.set(100)
      window.setTimeout(() => {
        setVisible(false)
        document.documentElement.style.overflow = ''
      }, HOLD_DURATION)
    }

    const fontsReady = document.fonts ? document.fonts.ready : Promise.resolve()
    const windowLoaded =
      document.readyState === 'complete'
        ? Promise.resolve()
        : new Promise<void>((resolve) => window.addEventListener('load', () => resolve(), { once: true }))

    Promise.all([fontsReady, windowLoaded]).then(() => {
      const remaining = Math.max(0, MIN_DURATION - (performance.now() - start))
      window.setTimeout(finish, remaining)
    })

    const fallback = window.setTimeout(finish, FALLBACK_DURATION)

    return () => {
      cancelAnimationFrame(raf)
      window.clearTimeout(fallback)
    }
  }, [progress])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-ink"
          exit={{ opacity: 0, filter: 'blur(6px)' }}
          transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
        >
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="font-mono text-sm tracking-tight text-paper"
          >
            VR<span className="text-accent">.</span>dev
          </motion.div>

          <div className="relative mt-8 h-px w-56 overflow-hidden bg-line">
            <motion.div className="absolute inset-y-0 left-0 bg-accent" style={{ width: barWidth }} />
          </div>

          <div className="mt-4 font-mono text-xs tabular-nums text-muted-2">
            {String(displayValue).padStart(2, '0')}%
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
