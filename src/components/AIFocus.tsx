import { Brain, FileCode, GitMerge, UsersThree } from '@phosphor-icons/react'
import { aiPillars, skillGroups } from '../lib/data'
import { RevealGroup, RevealItem } from './ui/Reveal'
import { SectionHeading } from './ui/SectionHeading'
import { SpotlightCard } from './ui/SpotlightCard'

const ICONS = [UsersThree, Brain, GitMerge, FileCode]
const aiStack = skillGroups.find((group) => group.label === 'IA aplicada')?.items ?? []

export function AIFocus() {
  return (
    <section id="ia" className="relative border-b border-line bg-surface/30 py-28 md:py-36">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <SectionHeading
          index="03"
          label="IA aplicada"
          title="A intersecção entre engenharia sólida e IA de verdade."
          description="Fiz parte da equipe que levou o uso de agentes de IA para o dia a dia da LEVTY, ajudando a estabelecer padrões e sugerindo novas aplicações — não para acelerar por acelerar, mas para elevar a qualidade do que entregamos."
        />

        <RevealGroup className="mt-16 grid grid-cols-1 gap-4 md:grid-cols-3 md:grid-rows-2">
          {aiPillars.map((pillar, i) => {
            const Icon = ICONS[i % ICONS.length]
            const spanClass = i === 0 ? 'md:col-span-2 md:row-span-1' : 'md:col-span-1'
            return (
              <RevealItem key={pillar.title} className={spanClass}>
                <SpotlightCard className="h-full p-8">
                  <Icon size={26} weight="light" className="text-accent" />
                  <h3 className="mt-6 text-xl font-semibold tracking-tight text-paper">{pillar.title}</h3>
                  <p className="mt-3 max-w-[42ch] text-sm leading-relaxed text-muted">{pillar.description}</p>
                </SpotlightCard>
              </RevealItem>
            )
          })}
        </RevealGroup>

        <RevealItem className="mt-6">
          <div className="flex flex-wrap items-center gap-3 rounded-2xl border border-line bg-surface/60 px-6 py-5">
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-2">Ferramentas</span>
            <span className="h-4 w-px bg-line" />
            {aiStack.map((tool) => (
              <span key={tool} className="font-mono text-xs text-muted">
                {tool}
              </span>
            ))}
          </div>
        </RevealItem>
      </div>
    </section>
  )
}
