import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion'
import { List, X } from '@phosphor-icons/react'
import { useEffect, useState } from 'react'
import { useActiveSection } from '../hooks/useActiveSection'
import { contact } from '../lib/data'
import { MagneticButton } from './ui/MagneticButton'

const NAV_ITEMS = [
  { id: 'sobre', label: 'Sobre' },
  { id: 'trajetoria', label: 'Trajetória' },
  { id: 'ia', label: 'IA aplicada' },
  { id: 'skills', label: 'Stack' },
  { id: 'alem', label: 'Além do código' },
  { id: 'contato', label: 'Contato' },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const { scrollY } = useScroll()
  const active = useActiveSection(NAV_ITEMS.map((item) => item.id))

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setScrolled(latest > 24)
  })

  useEffect(() => {
    document.documentElement.style.overflow = open ? 'hidden' : ''
    return () => {
      document.documentElement.style.overflow = ''
    }
  }, [open])

  function handleNavigate(id: string) {
    setOpen(false)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
          scrolled ? 'border-b border-line bg-ink/80 backdrop-blur-xl' : 'border-b border-transparent'
        }`}
      >
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:px-10">
          <a
            href="#top"
            onClick={(event) => {
              event.preventDefault()
              handleNavigate('top')
            }}
            className="font-mono text-sm font-medium tracking-tight text-paper"
          >
            VR<span className="text-accent">.</span>dev
          </a>

          <ul className="hidden items-center gap-8 md:flex">
            {NAV_ITEMS.map((item) => (
              <li key={item.id}>
                <button
                  type="button"
                  onClick={() => handleNavigate(item.id)}
                  className={`relative font-mono text-xs uppercase tracking-[0.15em] transition-colors ${
                    active === item.id ? 'text-paper' : 'text-muted hover:text-paper'
                  }`}
                >
                  {item.label}
                  {active === item.id && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute -bottom-2 left-0 right-0 h-px bg-accent"
                      transition={{ type: 'spring', stiffness: 200, damping: 24 }}
                    />
                  )}
                </button>
              </li>
            ))}
          </ul>

          <MagneticButton
            onClick={() => handleNavigate('contato')}
            className="hidden rounded-full border border-line px-5 py-2 font-mono text-xs uppercase tracking-[0.15em] text-paper transition-colors hover:border-accent hover:text-accent md:inline-flex"
          >
            Vamos conversar
          </MagneticButton>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="-mr-2 p-2 text-paper md:hidden"
            aria-label={open ? 'Fechar menu' : 'Abrir menu'}
          >
            {open ? <X size={22} /> : <List size={22} />}
          </button>
        </nav>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 flex flex-col overflow-y-auto bg-ink px-6 pb-8 pt-24 md:hidden"
          >
            <ul className="flex flex-col gap-1">
              {NAV_ITEMS.map((item, i) => (
                <motion.li
                  key={item.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.04, duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  className="border-b border-line"
                >
                  <button
                    type="button"
                    onClick={() => handleNavigate(item.id)}
                    className={`w-full py-5 text-left font-mono text-2xl tracking-tight ${
                      active === item.id ? 'text-accent' : 'text-paper'
                    }`}
                  >
                    {item.label}
                  </button>
                </motion.li>
              ))}
            </ul>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: NAV_ITEMS.length * 0.04, duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="mt-auto flex flex-col gap-1 pt-10 font-mono text-[11px] uppercase tracking-[0.2em] text-muted-2"
            >
              <span>{contact.email}</span>
              <span>PUC Minas · Eng. de Software · 2027/1</span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
