import { skillGroups } from '../lib/data'
import { Marquee } from './ui/Marquee'
import { RevealGroup, RevealItem } from './ui/Reveal'
import { SectionHeading } from './ui/SectionHeading'

const ALL_TOOLS = skillGroups.flatMap((group) => group.items)

export function Skills() {
  return (
    <section id="skills" className="relative border-b border-line py-28 md:py-36">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <SectionHeading
          index="04"
          label="Stack"
          title="Ferramentas para construir do zero ao produção."
        />
      </div>

      <div className="mt-16 space-y-4">
        <Marquee items={ALL_TOOLS} duration={38} />
        <Marquee items={ALL_TOOLS} reverse duration={44} />
      </div>

      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <RevealGroup className="mt-16 divide-y divide-line border-t border-line">
          {skillGroups.map((group) => (
            <RevealItem
              key={group.label}
              className="grid grid-cols-1 gap-3 py-6 sm:grid-cols-[1fr_2.4fr] sm:items-baseline sm:gap-8"
            >
              <h3 className="font-mono text-sm uppercase tracking-[0.1em] text-paper">{group.label}</h3>
              <div className="flex flex-wrap gap-x-4 gap-y-2">
                {group.items.map((item) => (
                  <span key={item} className="text-sm text-muted">
                    {item}
                  </span>
                ))}
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  )
}
