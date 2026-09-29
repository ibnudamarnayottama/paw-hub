'use client'

import { AnimatePresence, motion } from 'motion/react'
import { Check, Plus } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'
import { formatRupiah, products, type ProductCategory } from '@/lib/data'
import { cn } from '@/lib/utils'
import { useCart } from './cart-context'
import { SectionHeading } from './reveal'

const categories: ('Semua' | ProductCategory)[] = ['Semua', 'Makanan', 'Mainan', 'Aksesoris', 'Perawatan']

export function Shop() {
  const [filter, setFilter] = useState<(typeof categories)[number]>('Semua')
  const [justAdded, setJustAdded] = useState<string | null>(null)
  const cart = useCart()
  const visible = filter === 'Semua' ? products : products.filter((p) => p.category === filter)

  const handleAdd = (id: string) => {
    cart.add(id)
    setJustAdded(id)
    setTimeout(() => setJustAdded((cur) => (cur === id ? null : cur)), 1200)
  }

  return (
    <section id="toko" className="bg-secondary/50 py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-5">
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
          <SectionHeading
            align="left"
            eyebrow="Pet Shop"
            title={
              <>
                Produk pilihan untuk <em className="text-primary">si kesayangan</em>
              </>
            }
          />
          <div className="flex flex-wrap gap-2" role="group" aria-label="Filter kategori">
            {categories.map((c) => (
              <button
                key={c}
                type="button"
                aria-pressed={filter === c}
                onClick={() => setFilter(c)}
                className={cn(
                  'rounded-full px-4 py-2 text-sm font-semibold transition-all',
                  filter === c ? 'bg-primary text-primary-foreground' : 'bg-card ring-1 ring-border hover:ring-primary',
                )}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        <motion.ul layout className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {visible.map((p) => (
              <motion.li
                key={p.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="group flex flex-col overflow-hidden rounded-[2rem] bg-card ring-1 ring-border"
              >
                <div className="relative aspect-square overflow-hidden bg-muted">
                  <Image
                    src={p.image}
                    alt={p.name}
                    fill
                    sizes="(min-width: 1024px) 22rem, (min-width: 640px) 45vw, 90vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  {p.tag && (
                    <span className="absolute left-4 top-4 rounded-full bg-accent px-3 py-1 text-xs font-bold text-accent-foreground">
                      {p.tag}
                    </span>
                  )}
                </div>
                <div className="flex items-center justify-between gap-4 p-5">
                  <div className="min-w-0">
                    <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{p.category}</p>
                    <h3 className="truncate font-semibold">{p.name}</h3>
                    <p className="font-serif text-xl text-primary">{formatRupiah(p.price)}</p>
                  </div>
                  <motion.button
                    type="button"
                    whileTap={{ scale: 0.85 }}
                    onClick={() => handleAdd(p.id)}
                    aria-label={`Tambah ${p.name} ke keranjang`}
                    className={cn(
                      'flex size-12 shrink-0 items-center justify-center rounded-full transition-colors',
                      justAdded === p.id ? 'bg-accent text-accent-foreground' : 'bg-primary text-primary-foreground hover:bg-accent',
                    )}
                  >
                    <AnimatePresence mode="wait" initial={false}>
                      <motion.span
                        key={justAdded === p.id ? 'check' : 'plus'}
                        initial={{ rotate: -90, scale: 0 }}
                        animate={{ rotate: 0, scale: 1 }}
                        exit={{ rotate: 90, scale: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        {justAdded === p.id ? <Check className="size-5" /> : <Plus className="size-5" />}
                      </motion.span>
                    </AnimatePresence>
                  </motion.button>
                </div>
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>
      </div>
    </section>
  )
}
