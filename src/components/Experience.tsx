import { motion } from 'framer-motion'
import { experiences } from '../lib/data'
import { Reveal } from './ui/Reveal'
import { SectionHeading } from './ui/SectionHeading'

export function Experience() {
  return (
    <section id="trajetoria" className="relative border-b border-line py-28 md:py-36">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <SectionHeading
          index="02"
          label="Trajetória"
          title="Da logística à IA aplicada."
          description="Três empresas, uma escalada constante de complexidade técnica e responsabilidade — sempre traduzindo problemas de negócio em software."
        />

        <div className="mt-20 space-y-0">
          {experiences.map((exp, i) => (
            <Reveal key={exp.company} delay={i * 0.05}>
              <div className="grid grid-cols-1 gap-6 border-t border-line py-10 md:grid-cols-[200px_1fr] md:gap-10 lg:grid-cols-[220px_1fr]">
                <div className="flex items-start gap-3 md:flex-col md:gap-2">
                  <span className="font-mono text-sm text-muted-2">{exp.period}</span>
                  {exp.current && (
                    <span className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.15em] text-accent">
                      <motion.span
                        className="h-1.5 w-1.5 rounded-full bg-accent"
                        animate={{ opacity: [1, 0.3, 1] }}
                        transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
                      />
                      Atual
                    </span>
                  )}
                </div>

                <div>
                  <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                    <h3 className="text-2xl font-semibold tracking-tight text-paper md:text-3xl">{exp.company}</h3>
                  </div>
                  <p className="mt-1 font-mono text-sm text-accent">{exp.role}</p>
                  <p className="mt-4 max-w-[62ch] text-sm leading-relaxed text-muted md:text-base">
                    {exp.description}
                  </p>

                  <ul className="mt-5 space-y-2.5">
                    {exp.highlights.map((h) => (
                      <li key={h} className="flex gap-3 text-sm leading-relaxed text-muted">
                        <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-muted-2" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-6 flex flex-wrap gap-2">
                    {exp.stack.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-full border border-line px-3 py-1 font-mono text-[11px] text-muted-2"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
