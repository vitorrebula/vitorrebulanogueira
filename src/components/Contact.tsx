import { ArrowUpRight, EnvelopeSimple, GithubLogo, LinkedinLogo } from '@phosphor-icons/react'
import { contact } from '../lib/data'
import { Reveal } from './ui/Reveal'
import { MagneticButton } from './ui/MagneticButton'

const CURRENT_YEAR = new Date().getFullYear()

export function Contact() {
  return (
    <footer id="contato" className="relative py-28 md:py-36">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <Reveal>
          <span className="inline-flex items-center gap-3 font-mono text-xs uppercase tracking-[0.25em] text-accent">
            <span className="text-muted-2">06</span> Contato
          </span>
        </Reveal>

        <Reveal delay={0.05}>
          <h2 className="mt-6 max-w-3xl text-4xl font-semibold leading-[1.02] tracking-tighter text-balance sm:text-6xl md:text-7xl">
            Vamos construir algo juntos.
          </h2>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="mt-6 max-w-[52ch] text-base leading-relaxed text-muted md:text-lg">
            Aberto a conversas sobre engenharia de software, produtos com IA aplicada ou times que
            queiram elevar a qualidade técnica com autonomia e aprendizado contínuo.
          </p>
        </Reveal>

        <Reveal delay={0.15}>
          <MagneticButton
            href={`mailto:${contact.email}`}
            className="mt-12 inline-flex items-center gap-3 border-b border-line pb-3 text-2xl font-medium tracking-tight text-paper transition-colors hover:border-accent hover:text-accent sm:text-4xl"
          >
            <EnvelopeSimple size={28} weight="light" />
            {contact.email}
          </MagneticButton>
        </Reveal>

        <Reveal delay={0.2}>
          <div className="mt-16 flex flex-wrap items-center gap-4">
            <MagneticButton
              href={contact.linkedin}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-line px-5 py-2.5 font-mono text-xs uppercase tracking-[0.15em] text-paper transition-colors hover:border-accent hover:text-accent"
            >
              <LinkedinLogo size={16} />
              LinkedIn
              <ArrowUpRight size={13} />
            </MagneticButton>
            <MagneticButton
              href={contact.github}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-line px-5 py-2.5 font-mono text-xs uppercase tracking-[0.15em] text-paper transition-colors hover:border-accent hover:text-accent"
            >
              <GithubLogo size={16} />
              GitHub
              <ArrowUpRight size={13} />
            </MagneticButton>
          </div>
        </Reveal>

        <div className="mt-24 flex flex-col gap-4 border-t border-line pt-8 font-mono text-[11px] uppercase tracking-[0.15em] text-muted-2 sm:flex-row sm:items-center sm:justify-between">
          <span>© {CURRENT_YEAR} Vitor Rebula Nogueira</span>
          <span>{contact.location} · Engenharia de Software</span>
        </div>
      </div>
    </footer>
  )
}
