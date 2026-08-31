import { ArrowDown, ArrowUpRight } from '@phosphor-icons/react'
import { motion } from 'framer-motion'
import { AmbientGlow } from './ui/AmbientGlow'
import { MagneticButton } from './ui/MagneticButton'
import { Reveal } from './ui/Reveal'
import { TerminalCard } from './TerminalCard'

const STATS = [
  { value: '3+', label: 'anos de experiência' },
  { value: '3', label: 'empresas, do fullstack à IA' },
  { value: '1M+', label: 'registros processados no maior pipeline' },
]

export function Hero() {
  return (
    <section className="relative flex min-h-[100dvh] items-start overflow-hidden border-b border-line pt-28 lg:items-center lg:pt-24" id="top">
      <AmbientGlow />

      <div className="relative mx-auto grid w-full max-w-7xl grid-cols-1 gap-12 px-6 sm:gap-16 md:px-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-8">
        <div>
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-line px-4 py-1.5 font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              Disponível para novos desafios
            </span>
          </Reveal>

          <Reveal delay={0.05}>
            <h1 className="mt-8 text-5xl font-semibold leading-[0.98] tracking-tighter text-balance sm:text-6xl md:text-7xl">
              Vitor Rebula
              <br />
              Nogueira
            </h1>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="mt-7 max-w-[46ch] text-lg leading-relaxed text-muted md:text-xl">
              Engenheiro de software que constrói produtos do backend ao frontend —
              e usa <span className="text-paper">IA aplicada</span> como parte real do
              processo de engenharia, não como modismo.
            </p>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <MagneticButton
                onClick={() => document.getElementById('trajetoria')?.scrollIntoView({ behavior: 'smooth' })}
                className="inline-flex items-center gap-2 rounded-full bg-paper px-6 py-3 font-mono text-xs uppercase tracking-[0.15em] text-ink transition-transform"
              >
                Ver trajetória
                <ArrowDown size={14} weight="bold" />
              </MagneticButton>
              <MagneticButton
                onClick={() => document.getElementById('contato')?.scrollIntoView({ behavior: 'smooth' })}
                className="inline-flex items-center gap-2 rounded-full border border-line px-6 py-3 font-mono text-xs uppercase tracking-[0.15em] text-paper transition-colors hover:border-accent hover:text-accent"
              >
                Entrar em contato
                <ArrowUpRight size={14} weight="bold" />
              </MagneticButton>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <dl className="mt-16 grid max-w-lg grid-cols-3 gap-6 border-t border-line pt-8">
              {STATS.map((stat) => (
                <div key={stat.label}>
                  <dt className="sr-only">{stat.label}</dt>
                  <dd className="font-mono text-2xl font-medium text-paper md:text-3xl">{stat.value}</dd>
                  <dd className="mt-1.5 text-xs leading-snug text-muted-2">{stat.label}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>

        <div className="relative flex items-center justify-center lg:justify-end">
          <motion.div
            initial={{ opacity: 0, y: 40, rotate: -2 }}
            animate={{ opacity: 1, y: 0, rotate: -2 }}
            transition={{ type: 'spring', stiffness: 90, damping: 18, delay: 0.25 }}
            className="relative w-full max-w-md lg:-mr-6"
          >
            <TerminalCard />

            <motion.div
              className="absolute -left-6 -top-10 h-24 w-24 overflow-hidden rounded-2xl border border-line shadow-[0_20px_40px_-15px_rgba(0,0,0,0.55)] sm:h-28 sm:w-28"
              initial={{ opacity: 0, scale: 0.8, rotate: 6 }}
              animate={{ opacity: 1, scale: 1, rotate: 6 }}
              transition={{ type: 'spring', stiffness: 100, damping: 20, delay: 0.5 }}
            >
              <img
                src="/vitor-headshot.jpg"
                alt="Vitor Rebula Nogueira"
                className="h-full w-full object-cover"
              />
            </motion.div>
          </motion.div>
        </div>
      </div>

      <Reveal delay={0.4} className="absolute bottom-8 left-6 hidden font-mono text-[11px] uppercase tracking-[0.2em] text-muted-2 md:left-10 md:block">
        PUC Minas · Eng. de Software · 2027/1
      </Reveal>
    </section>
  )
}
