import { ChalkboardTeacher, Medal, Translate, Trophy } from '@phosphor-icons/react'
import { beyondCode, hackathonPhotos } from '../lib/data'
import { ImageAutoSlider } from './ui/image-auto-slider'
import { Reveal, RevealGroup, RevealItem } from './ui/Reveal'
import { SectionHeading } from './ui/SectionHeading'
import { SpotlightCard } from './ui/SpotlightCard'

const ICONS = [Trophy, ChalkboardTeacher, Medal, Translate]

export function Beyond() {
  return (
    <section id="alem" className="relative border-b border-line py-28 md:py-36">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <SectionHeading
          index="05"
          label="Além do código"
          title="Curiosidade, ensino e faixa azul."
          align="right"
          description="A mesma paixão por ensinar que aplico no trabalho, levo para o tatame — e para todo projeto pessoal que me tira da zona de conforto."
        />

        <Reveal delay={0.1} className="mt-16">
          <ImageAutoSlider images={hackathonPhotos} />
        </Reveal>

        <RevealGroup className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {beyondCode.map((item, i) => {
            const Icon = ICONS[i % ICONS.length]
            return (
              <RevealItem key={item.title}>
                <SpotlightCard className="h-full p-8">
                  <Icon size={24} weight="light" className="text-accent" />
                  <h3 className="mt-6 text-lg font-semibold tracking-tight text-paper">{item.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted">{item.description}</p>
                </SpotlightCard>
              </RevealItem>
            )
          })}
        </RevealGroup>
      </div>
    </section>
  )
}
