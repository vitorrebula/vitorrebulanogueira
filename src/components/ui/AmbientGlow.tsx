import { motion } from 'framer-motion'
import { memo } from 'react'

function AmbientGlowBase({ className }: { className?: string }) {
  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className ?? ''}`} aria-hidden>
      <svg className="absolute inset-0 h-full w-full opacity-[0.07]" aria-hidden>
        <defs>
          <pattern id="grid" width="42" height="42" patternUnits="userSpaceOnUse">
            <path d="M 42 0 L 0 0 0 42" fill="none" stroke="currentColor" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" className="text-paper" />
      </svg>

      <motion.div
        className="absolute -top-40 right-[-10%] h-[36rem] w-[36rem] rounded-full bg-accent/20 blur-[120px]"
        animate={{ opacity: [0.35, 0.55, 0.35], scale: [1, 1.08, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-[-15%] left-[-10%] h-[28rem] w-[28rem] rounded-full bg-rose/10 blur-[130px]"
        animate={{ opacity: [0.25, 0.4, 0.25] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
      />
    </div>
  )
}

export const AmbientGlow = memo(AmbientGlowBase)
