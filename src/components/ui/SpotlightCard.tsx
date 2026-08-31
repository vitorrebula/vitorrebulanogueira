import { motion, useMotionTemplate, useMotionValue } from 'framer-motion'
import type { ReactNode } from 'react'

type SpotlightCardProps = {
  children: ReactNode
  className?: string
}

export function SpotlightCard({ children, className }: SpotlightCardProps) {
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  function handleMouseMove(event: React.MouseEvent<HTMLDivElement>) {
    const rect = event.currentTarget.getBoundingClientRect()
    mouseX.set(event.clientX - rect.left)
    mouseY.set(event.clientY - rect.top)
  }

  const background = useMotionTemplate`radial-gradient(240px circle at ${mouseX}px ${mouseY}px, color-mix(in oklab, var(--color-accent) 16%, transparent), transparent 70%)`

  return (
    <div
      onMouseMove={handleMouseMove}
      className={`group relative overflow-hidden rounded-2xl border border-line bg-surface/60 ${className ?? ''}`}
    >
      <motion.div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" style={{ background }} />
      <div className="relative h-full">{children}</div>
    </div>
  )
}
