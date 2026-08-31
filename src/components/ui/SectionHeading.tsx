import { Reveal } from './Reveal'

type SectionHeadingProps = {
  index: string
  label: string
  title: string
  align?: 'left' | 'right'
  description?: string
}

export function SectionHeading({ index, label, title, align = 'left', description }: SectionHeadingProps) {
  return (
    <Reveal className={align === 'right' ? 'text-right' : 'text-left'}>
      <div className={`flex items-baseline gap-3 font-mono text-xs tracking-[0.25em] text-accent uppercase ${align === 'right' ? 'justify-end' : ''}`}>
        <span className="text-muted-2">{index}</span>
        <span>{label}</span>
        <span className="h-px flex-1 max-w-16 bg-line" />
      </div>
      <h2 className="mt-5 text-4xl md:text-6xl font-semibold tracking-tighter leading-[0.95] text-balance">
        {title}
      </h2>
      {description ? (
        <p className={`mt-5 max-w-[54ch] text-base text-muted leading-relaxed ${align === 'right' ? 'ml-auto' : ''}`}>
          {description}
        </p>
      ) : null}
    </Reveal>
  )
}
