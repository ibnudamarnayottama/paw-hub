import { Quote, Star } from 'lucide-react'
import { testimonials } from '@/lib/data'
import { SectionHeading } from './reveal'

function Card({ t }: { t: (typeof testimonials)[number] }) {
  return (
    <figure className="flex w-80 shrink-0 flex-col gap-4 rounded-[2rem] bg-card p-6 ring-1 ring-border transition-transform duration-300 hover:-rotate-1 hover:scale-[1.02] md:w-96">
      <div className="flex items-center justify-between">
        <div className="flex gap-0.5 text-accent" aria-label="Rating 5 dari 5">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className="size-4 fill-current" aria-hidden="true" />
          ))}
        </div>
        <Quote className="size-6 text-primary/20" aria-hidden="true" />
      </div>
      <blockquote className="flex-1 text-pretty leading-relaxed">{`"${t.text}"`}</blockquote>
      <figcaption className="flex items-center gap-3">
        <span className="flex size-10 items-center justify-center rounded-full bg-secondary font-serif text-lg text-primary">{t.name[0]}</span>
        <span>
          <span className="block text-sm font-semibold">{t.name}</span>
          <span className="block text-xs text-muted-foreground">{t.pet}</span>
        </span>
      </figcaption>
    </figure>
  )
}

export function Testimonials() {
  const rowA = testimonials.slice(0, 3)
  const rowB = testimonials.slice(3)

  return (
    <section id="testimoni" className="overflow-hidden bg-secondary/50 py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-5">
        <SectionHeading
          eyebrow="Testimoni"
          title={
            <>
              Kata para <em className="text-primary">pawrents</em>
            </>
          }
        />
      </div>
      <div className="group mt-14 flex flex-col gap-6 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
        <div className="flex w-max animate-marquee gap-6 group-hover:[animation-play-state:paused]">
          {[...rowA, ...rowA, ...rowA, ...rowA].map((t, i) => (
            <Card key={i} t={t} />
          ))}
        </div>
        <div className="flex w-max animate-marquee-reverse gap-6 group-hover:[animation-play-state:paused]">
          {[...rowB, ...rowB, ...rowB, ...rowB].map((t, i) => (
            <Card key={i} t={t} />
          ))}
        </div>
      </div>
    </section>
  )
}
