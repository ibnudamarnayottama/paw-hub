'use client'

import { motion } from 'motion/react'
import {
  ArrowUpRight,
  BedDouble,
  GraduationCap,
  Salad,
  Scissors,
  Sparkles,
  Stethoscope,
  Syringe,
  Truck,
  type LucideIcon,
} from 'lucide-react'
import { services, type ServiceKey } from '@/lib/data'
import { SectionHeading } from './reveal'

export const serviceIcons: Record<ServiceKey, LucideIcon> = {
  grooming: Scissors,
  klinik: Stethoscope,
  hotel: BedDouble,
  pelatihan: GraduationCap,
  'antar-jemput': Truck,
  spa: Sparkles,
  vaksinasi: Syringe,
  nutrisi: Salad,
}

export function Services() {
  return (
    <section id="layanan" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-5">
        <SectionHeading
          eyebrow="Layanan & Jasa"
          title={
            <>
              Semua yang anabul butuhkan, <em className="text-primary">dalam satu atap</em>
            </>
          }
          desc="Delapan layanan profesional yang dirancang dengan cinta — dari perawatan harian hingga kesehatan menyeluruh."
        />

        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s, i) => {
            const Icon = serviceIcons[s.key]
            return (
              <motion.a
                key={s.key}
                href="#booking"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.7, delay: (i % 4) * 0.08, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -8 }}
                className="group relative flex flex-col gap-5 overflow-hidden rounded-3xl bg-card p-6 ring-1 ring-border transition-shadow hover:shadow-2xl hover:shadow-primary/10"
              >
                <span
                  className="absolute -right-10 -top-10 size-32 rounded-full scale-0 bg-primary transition-[scale] duration-700 ease-out group-hover:scale-[9]"
                  aria-hidden="true"
                />
                <div className="relative flex items-start justify-between">
                  <span className="flex size-14 items-center justify-center rounded-2xl bg-secondary text-primary transition-all duration-500 group-hover:rotate-[-12deg] group-hover:bg-accent group-hover:text-accent-foreground">
                    <Icon className="size-6" aria-hidden="true" />
                  </span>
                  <ArrowUpRight
                    className="size-5 text-muted-foreground transition-all duration-500 group-hover:rotate-45 group-hover:text-primary-foreground"
                    aria-hidden="true"
                  />
                </div>
                <div className="relative flex flex-1 flex-col gap-2">
                  <h3 className="font-serif text-2xl transition-colors duration-500 group-hover:text-primary-foreground">{s.title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground transition-colors duration-500 group-hover:text-primary-foreground/80">
                    {s.desc}
                  </p>
                </div>
                <span className="relative w-fit rounded-full bg-muted px-3 py-1 text-xs font-semibold text-primary transition-colors duration-500 group-hover:bg-primary-foreground/15 group-hover:text-primary-foreground">
                  {s.price}
                </span>
              </motion.a>
            )
          })}
        </div>
      </div>
    </section>
  )
}
