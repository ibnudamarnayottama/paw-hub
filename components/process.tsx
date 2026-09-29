'use client'

import { motion, useScroll, useTransform } from 'motion/react'
import { CalendarDays, ClipboardList, HeartHandshake, Smile } from 'lucide-react'
import { useRef } from 'react'
import { SectionHeading } from './reveal'

const steps = [
  { icon: ClipboardList, title: 'Pilih layanan', desc: 'Tentukan layanan dan paket yang paling cocok untuk anabul Anda.' },
  { icon: CalendarDays, title: 'Atur jadwal', desc: 'Isi formulir booking dan pilih tanggal serta jam yang Anda inginkan.' },
  { icon: HeartHandshake, title: 'Kami rawat', desc: 'Tim profesional kami merawat anabul dengan penuh kasih sayang.' },
  { icon: Smile, title: 'Pulang bahagia', desc: 'Terima update foto dan jemput anabul yang wangi dan ceria.' },
]

export function Process() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 80%', 'end 60%'] })
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1])

  return (
    <section className="py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-5">
        <SectionHeading
          eyebrow="Cara Kerja"
          title={
            <>
              Empat langkah <em className="text-primary">mudah</em>
            </>
          }
        />

        <div ref={ref} className="relative mt-16">
          <div className="absolute left-7 top-0 h-full w-0.5 bg-border md:left-0 md:top-7 md:h-0.5 md:w-full" aria-hidden="true">
            <motion.div
              className="h-full w-full origin-top bg-accent md:hidden"
              style={{ scaleY: lineScale }}
            />
            <motion.div
              className="hidden h-full w-full origin-left bg-accent md:block"
              style={{ scaleX: lineScale }}
            />
          </div>

          <ol className="relative grid gap-10 md:grid-cols-4 md:gap-6">
            {steps.map((s, i) => (
              <motion.li
                key={s.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.7, delay: i * 0.12 }}
                className="flex gap-5 md:flex-col"
              >
                <motion.span
                  whileHover={{ rotate: 12, scale: 1.1 }}
                  className="relative z-10 flex size-14 shrink-0 items-center justify-center rounded-2xl bg-card text-primary shadow-lg shadow-primary/10 ring-1 ring-border"
                >
                  <s.icon className="size-6" aria-hidden="true" />
                  <span className="absolute -right-2 -top-2 flex size-6 items-center justify-center rounded-full bg-accent text-xs font-bold text-accent-foreground">
                    {i + 1}
                  </span>
                </motion.span>
                <div className="flex flex-col gap-2">
                  <h3 className="font-serif text-2xl">{s.title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
                </div>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
