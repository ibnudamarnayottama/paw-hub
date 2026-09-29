'use client'

import { animate, motion, useInView } from 'motion/react'
import { useEffect, useRef, useState } from 'react'

const stats = [
  { value: 12000, suffix: '+', label: 'Anabul bahagia' },
  { value: 11, suffix: ' th', label: 'Pengalaman' },
  { value: 28, suffix: '', label: 'Tenaga ahli' },
  { value: 24, suffix: '/7', label: 'Layanan darurat' },
]

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (!inView) return
    const controls = animate(0, value, {
      duration: 2,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setDisplay(Math.round(v)),
    })
    return () => controls.stop()
  }, [inView, value])

  return (
    <span ref={ref} className="tabular-nums">
      {display.toLocaleString('id-ID')}
      {suffix}
    </span>
  )
}

export function Stats() {
  return (
    <section aria-label="Pencapaian kami" className="px-5 py-10">
      <div className="relative mx-auto max-w-6xl overflow-hidden rounded-[2.5rem] bg-primary px-6 py-14 text-primary-foreground md:px-12">
        <div className="pointer-events-none absolute -right-16 -top-16 size-64 animate-blob bg-accent/40 blur-2xl" aria-hidden="true" />
        <dl className="relative grid grid-cols-2 gap-10 md:grid-cols-4">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className="flex flex-col gap-1 text-center"
            >
              <dt className="order-2 text-sm text-primary-foreground/70">{s.label}</dt>
              <dd className="order-1 font-serif text-4xl md:text-6xl">
                <Counter value={s.value} suffix={s.suffix} />
              </dd>
            </motion.div>
          ))}
        </dl>
      </div>
    </section>
  )
}
