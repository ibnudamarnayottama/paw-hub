'use client'

import { AnimatePresence, motion } from 'motion/react'
import { Check, Dog, Cat } from 'lucide-react'
import { useState } from 'react'
import { formatRupiah, packages } from '@/lib/data'
import { cn } from '@/lib/utils'
import { SectionHeading } from './reveal'

type Pet = 'anjing' | 'kucing'

export function Pricing() {
  const [pet, setPet] = useState<Pet>('anjing')

  return (
    <section id="harga" className="py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-5">
        <SectionHeading
          eyebrow="Paket Grooming"
          title={
            <>
              Harga jujur, <em className="text-primary">hasil memukau</em>
            </>
          }
          desc="Pilih jenis anabul Anda untuk melihat harga paket yang sesuai."
        />

        <div className="mx-auto mt-10 flex w-fit rounded-full bg-card p-1.5 ring-1 ring-border" role="radiogroup" aria-label="Jenis hewan">
          {(['anjing', 'kucing'] as const).map((p) => {
            const Icon = p === 'anjing' ? Dog : Cat
            return (
              <button
                key={p}
                type="button"
                role="radio"
                aria-checked={pet === p}
                onClick={() => setPet(p)}
                className={cn(
                  'relative flex items-center gap-2 rounded-full px-6 py-2.5 text-sm font-semibold capitalize transition-colors',
                  pet === p ? 'text-accent-foreground' : 'text-muted-foreground',
                )}
              >
                {pet === p && (
                  <motion.span layoutId="pet-pill" className="absolute inset-0 rounded-full bg-accent" transition={{ type: 'spring', stiffness: 380, damping: 30 }} />
                )}
                <Icon className="relative size-4" aria-hidden="true" />
                <span className="relative">{p}</span>
              </button>
            )
          })}
        </div>

        <div className="mt-14 grid items-stretch gap-6 md:grid-cols-3">
          {packages.map((pkg, i) => (
            <motion.article
              key={pkg.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -6 }}
              className={cn(
                'relative flex flex-col gap-6 rounded-[2rem] p-8',
                pkg.popular
                  ? 'bg-primary text-primary-foreground shadow-2xl shadow-primary/25 md:-my-4 md:py-12'
                  : 'bg-card ring-1 ring-border',
              )}
            >
              {pkg.popular && (
                <span className="absolute -top-3 left-8 rounded-full bg-accent px-4 py-1 text-xs font-bold uppercase tracking-wider text-accent-foreground">
                  Paling Populer
                </span>
              )}
              <div>
                <h3 className="font-serif text-2xl">{pkg.name}</h3>
                <p className={cn('text-sm', pkg.popular ? 'text-primary-foreground/70' : 'text-muted-foreground')}>{pkg.desc}</p>
              </div>
              <div className="flex h-14 items-end gap-1 overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={pet}
                    initial={{ y: 40, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -40, opacity: 0 }}
                    transition={{ duration: 0.35 }}
                    className="font-serif text-4xl md:text-5xl"
                  >
                    {formatRupiah(pkg.price[pet])}
                  </motion.span>
                </AnimatePresence>
              </div>
              <ul className="flex flex-1 flex-col gap-3">
                {pkg.features.map((f) => (
                  <li key={f} className="flex items-center gap-3 text-sm">
                    <Check className={cn('size-4 shrink-0', pkg.popular ? 'text-accent' : 'text-primary')} aria-hidden="true" />
                    {f}
                  </li>
                ))}
              </ul>
              <a
                href="#booking"
                className={cn(
                  'rounded-full py-3.5 text-center font-semibold transition-all hover:scale-[1.02]',
                  pkg.popular ? 'bg-accent text-accent-foreground' : 'bg-secondary text-secondary-foreground hover:bg-primary hover:text-primary-foreground',
                )}
              >
                Pilih Paket
              </a>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
