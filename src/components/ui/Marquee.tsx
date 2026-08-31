import { motion } from 'framer-motion'
import { memo } from 'react'

type MarqueeProps = {
  items: string[]
  reverse?: boolean
  duration?: number
}

function MarqueeBase({ items, reverse = false, duration = 32 }: MarqueeProps) {
  const sequence = [...items, ...items]

  return (
    <div className="relative flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
      <motion.div
        className="flex shrink-0 gap-10 pr-10"
        animate={{ x: reverse ? ['-50%', '0%'] : ['0%', '-50%'] }}
        transition={{ duration, repeat: Infinity, ease: 'linear' }}
      >
        {sequence.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="flex items-center gap-3 whitespace-nowrap font-mono text-2xl text-muted-2 md:text-3xl"
          >
            {item}
            <span className="text-line">/</span>
          </span>
        ))}
      </motion.div>
    </div>
  )
}

export const Marquee = memo(MarqueeBase)
