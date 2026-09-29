'use client'

import { AnimatePresence, motion } from 'motion/react'
import { Check } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'
import { showcase } from '@/lib/data'
import { cn } from '@/lib/utils'
import { SectionHeading } from './reveal'

export function Showcase() {
  const [active, setActive] = useState(0)
  const item = showcase[active]

  return (
    <section className="bg-secondary/50 py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-5">
        <SectionHeading
          eyebrow="Kenali Lebih Dekat"
          title={
            <>
              Layanan unggulan yang bikin <em className="text-accent">ekor bergoyang</em>
            </>
          }
        />

        <div role="tablist" aria-label="Layanan unggulan" className="mx-auto mt-10 flex w-fit max-w-full flex-wrap justify-center gap-2 rounded-full bg-card p-1.5 ring-1 ring-border">
          {showcase.map((s, i) => (
            <button
              key={s.key}
              type="button"
              role="tab"
              aria-selected={active === i}
              aria-controls="showcase-panel"
              onClick={() => setActive(i)}
              className={cn(
                'relative rounded-full px-5 py-2.5 text-sm font-semibold transition-colors',
                active === i ? 'text-primary-foreground' : 'text-muted-foreground hover:text-foreground',
              )}
            >
              {active === i && (
                <motion.span
                  layoutId="showcase-pill"
                  className="absolute inset-0 rounded-full bg-primary"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
              <span className="relative">{s.label}</span>
            </button>
          ))}
        </div>

        <div id="showcase-panel" role="tabpanel" className="mt-12 grid items-center gap-10 md:grid-cols-2 md:gap-16">
          <div className="relative aspect-[4/3] overflow-hidden rounded-[2.5rem] bg-muted">
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.div
                key={item.key}
                initial={{ opacity: 0, scale: 1.15, clipPath: 'inset(0 0 100% 0)' }}
                animate={{ opacity: 1, scale: 1, clipPath: 'inset(0 0 0% 0)' }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0"
              >
                <Image src={item.image} alt={item.title} fill sizes="(min-width: 768px) 36rem, 90vw" className="object-cover" />
              </motion.div>
            </AnimatePresence>
            <span className="absolute bottom-5 left-5 rounded-full bg-card/90 px-4 py-2 text-sm font-semibold backdrop-blur">
              0{active + 1} / 0{showcase.length}
            </span>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={item.key}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col gap-6"
            >
              <h3 className="font-serif text-3xl leading-tight text-balance md:text-4xl">{item.title}</h3>
              <p className="leading-relaxed text-muted-foreground md:text-lg">{item.desc}</p>
              <ul className="flex flex-col gap-3">
                {item.points.map((p, i) => (
                  <motion.li
                    key={p}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 + i * 0.08 }}
                    className="flex items-center gap-3"
                  >
                    <span className="flex size-7 items-center justify-center rounded-full bg-primary text-primary-foreground">
                      <Check className="size-4" aria-hidden="true" />
                    </span>
                    {p}
                  </motion.li>
                ))}
              </ul>
              <a
                href="#booking"
                className="mt-2 w-fit rounded-full bg-accent px-7 py-3.5 font-semibold text-accent-foreground transition-transform hover:-translate-y-0.5"
              >
                Booking {item.label}
              </a>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
