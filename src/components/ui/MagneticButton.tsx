import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import type { ReactNode } from 'react'

type MagneticButtonProps = {
  children: ReactNode
  href?: string
  onClick?: () => void
  className?: string
  target?: string
  rel?: string
}

export function MagneticButton({ children, href, onClick, className, target, rel }: MagneticButtonProps) {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 150, damping: 15, mass: 0.2 })
  const springY = useSpring(y, { stiffness: 150, damping: 15, mass: 0.2 })
  const translateX = useTransform(springX, (v) => v * 0.35)
  const translateY = useTransform(springY, (v) => v * 0.35)

  function handleMouseMove(event: React.MouseEvent<HTMLElement>) {
    const rect = event.currentTarget.getBoundingClientRect()
    x.set(event.clientX - rect.left - rect.width / 2)
    y.set(event.clientY - rect.top - rect.height / 2)
  }

  function handleMouseLeave() {
    x.set(0)
    y.set(0)
  }

  const Component = href ? motion.a : motion.button

  return (
    <Component
      href={href}
      target={target}
      rel={rel}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: translateX, y: translateY }}
      whileTap={{ scale: 0.96 }}
      className={className}
    >
      {children}
    </Component>
  )
}
