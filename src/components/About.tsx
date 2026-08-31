import { RevealGroup, RevealItem } from './ui/Reveal'
import { SectionHeading } from './ui/SectionHeading'

const VALUES = [
  {
    title: 'Qualidade técnica',
    description: 'Código bem pensado, testado e revisado — não só código que funciona no primeiro deploy.',
  },
  {
    title: 'Autonomia',
    description: 'Traduzir problemas complexos em soluções escaláveis, com liberdade para decidir o caminho.',
  },
  {
    title: 'Aprendizado contínuo',
    description: 'Hackathons, projetos pessoais e curiosidade genuína por tecnologias novas.',
  },
  {
    title: 'IA usada com responsabilidade',
    description: 'Não como modismo — como parte real de como o software é construído hoje.',
  },
]

export function About() {
  return (
    <section id="sobre" className="relative border-b border-line py-28 md:py-36">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-[0.85fr_1.15fr] lg:gap-12">
          <SectionHeading index="01" label="Sobre" title="Do backend ao frontend, com curiosidade genuína." />

          <div className="lg:pt-2">
            <RevealItem>
              <p className="max-w-[62ch] text-base leading-relaxed text-muted md:text-lg">
                Cursando Engenharia de Software na PUC Minas, com conclusão prevista para 2027/1, e mais
                de 3 anos construindo produtos reais — de sistemas de logística a plataformas de simulação
                industrial e ecossistemas jurídicos digitais. No caminho, aprendi que a parte difícil raramente é
                escrever código: é traduzir necessidades de negócio complexas em software que realmente resolve
                o problema.
              </p>
              <p className="mt-5 max-w-[62ch] text-base leading-relaxed text-muted md:text-lg">
                Hoje, o que mais me diferencia é a atuação prática com IA aplicada ao desenvolvimento — de
                agentes e RAG a Spec-Driven Development — sempre a serviço de qualidade técnica e impacto real,
                nunca como modismo.
              </p>
            </RevealItem>

            <RevealGroup className="mt-12 divide-y divide-line border-t border-line">
              {VALUES.map((value) => (
                <RevealItem key={value.title} className="grid grid-cols-1 gap-2 py-5 sm:grid-cols-[1fr_2fr] sm:gap-8">
                  <h3 className="font-mono text-sm text-paper">{value.title}</h3>
                  <p className="text-sm leading-relaxed text-muted">{value.description}</p>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </div>
      </div>
    </section>
  )
}
