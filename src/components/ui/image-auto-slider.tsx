import { motion } from 'framer-motion'

type ImageAutoSliderProps = {
  images: string[]
  duration?: number
}

export function ImageAutoSlider({ images, duration = 28 }: ImageAutoSliderProps) {
  const sequence = [...images, ...images]

  return (
    <div className="relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
      <motion.div
        className="flex w-max gap-6"
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration, repeat: Infinity, ease: 'linear' }}
      >
        {sequence.map((src, i) => (
          <div
            key={`${src}-${i}`}
            className="group h-48 w-48 shrink-0 overflow-hidden rounded-xl border border-line shadow-2xl md:h-64 md:w-64 lg:h-72 lg:w-72"
          >
            <img
              src={src}
              alt={`Foto ${(i % images.length) + 1}`}
              loading="lazy"
              className="h-full w-full object-cover transition duration-300 ease-out group-hover:scale-105 group-hover:brightness-110"
            />
          </div>
        ))}
      </motion.div>
    </div>
  )
}
