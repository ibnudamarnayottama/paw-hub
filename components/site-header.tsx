'use client'

import { AnimatePresence, motion, useMotionValueEvent, useScroll, useSpring } from 'motion/react'
import { Menu, Minus, PawPrint, Plus, ShoppingBag, X } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'
import { useCart } from './cart-context'
import { formatRupiah, products, whatsappLink } from '@/lib/data'
import { cn } from '@/lib/utils'

const links = [
  { href: '#layanan', label: 'Layanan' },
  { href: '#harga', label: 'Harga' },
  { href: '#toko', label: 'Toko' },
  { href: '#testimoni', label: 'Testimoni' },
  { href: '#faq', label: 'FAQ' },
]

export function SiteHeader() {
  const { scrollY, scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 })
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [cartOpen, setCartOpen] = useState(false)
  const cart = useCart()

  useMotionValueEvent(scrollY, 'change', (v) => setScrolled(v > 24))

  const checkout = () => {
    const lines = Object.entries(cart.items).map(([id, qty]) => {
      const p = products.find((x) => x.id === id)
      return `- ${p?.name} x${qty}`
    })
    window.open(
      whatsappLink(`Halo Pawsome, saya ingin memesan:\n${lines.join('\n')}\nTotal: ${formatRupiah(cart.total)}`),
      '_blank',
      'noopener,noreferrer',
    )
  }

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <motion.div
        className="absolute inset-x-0 top-0 h-1 origin-left bg-accent"
        style={{ scaleX: progress }}
        aria-hidden="true"
      />
      <div
        className={cn(
          'mx-auto mt-3 flex max-w-6xl items-center justify-between gap-4 rounded-full px-4 py-2.5 transition-all duration-500 md:px-6',
          scrolled ? 'mx-3 bg-card/80 shadow-lg shadow-primary/5 backdrop-blur-xl md:mx-auto' : 'bg-transparent',
        )}
      >
        <a href="#" className="group flex items-center gap-2" aria-label="Pawsome beranda">
          <span className="flex size-9 items-center justify-center rounded-full bg-primary text-primary-foreground transition-transform duration-500 group-hover:rotate-[20deg]">
            <PawPrint className="size-5" aria-hidden="true" />
          </span>
          <span className="font-serif text-2xl font-semibold tracking-tight">Pawsome</span>
        </a>

        <nav aria-label="Navigasi utama" className="hidden md:block">
          <ul className="flex items-center gap-1">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="group relative rounded-full px-4 py-2 text-sm font-medium text-foreground/80 transition-colors hover:text-foreground"
                >
                  {l.label}
                  <span className="absolute inset-x-4 bottom-1 h-px origin-left scale-x-0 bg-accent transition-transform duration-300 group-hover:scale-x-100" />
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <div className="relative">
            <button
              type="button"
              onClick={() => setCartOpen((o) => !o)}
              className="relative flex size-10 items-center justify-center rounded-full bg-card ring-1 ring-border transition-transform hover:scale-105"
              aria-label={`Keranjang, ${cart.count} item`}
              aria-expanded={cartOpen}
            >
              <ShoppingBag className="size-5" aria-hidden="true" />
              <AnimatePresence>
                {cart.count > 0 && (
                  <motion.span
                    key={cart.count}
                    initial={{ scale: 0 }}
                    animate={{ scale: [1.5, 1] }}
                    exit={{ scale: 0 }}
                    className="absolute -right-1 -top-1 flex size-5 items-center justify-center rounded-full bg-accent text-[10px] font-bold text-accent-foreground"
                  >
                    {cart.count}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>

            <AnimatePresence>
              {cartOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.96 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 top-12 w-[min(88vw,22rem)] origin-top-right rounded-3xl bg-card p-5 shadow-2xl ring-1 ring-border"
                >
                  <div className="mb-4 flex items-center justify-between">
                    <p className="font-serif text-xl">Keranjang</p>
                    <button type="button" onClick={() => setCartOpen(false)} aria-label="Tutup keranjang" className="rounded-full p-1 hover:bg-muted">
                      <X className="size-4" />
                    </button>
                  </div>
                  {cart.count === 0 ? (
                    <p className="py-6 text-center text-sm text-muted-foreground">Keranjang masih kosong. Yuk belanja kebutuhan anabul!</p>
                  ) : (
                    <>
                      <ul className="flex max-h-64 flex-col gap-3 overflow-auto">
                        {Object.entries(cart.items).map(([id, qty]) => {
                          const p = products.find((x) => x.id === id)
                          if (!p) return null
                          return (
                            <li key={id} className="flex items-center gap-3">
                              <Image src={p.image} alt="" width={48} height={48} className="size-12 rounded-xl object-cover" />
                              <div className="min-w-0 flex-1">
                                <p className="truncate text-sm font-medium">{p.name}</p>
                                <p className="text-xs text-muted-foreground">{formatRupiah(p.price)}</p>
                              </div>
                              <div className="flex items-center gap-1.5">
                                <button type="button" onClick={() => cart.remove(id)} aria-label={`Kurangi ${p.name}`} className="rounded-full bg-muted p-1">
                                  <Minus className="size-3" />
                                </button>
                                <span className="w-4 text-center text-sm tabular-nums">{qty}</span>
                                <button type="button" onClick={() => cart.add(id)} aria-label={`Tambah ${p.name}`} className="rounded-full bg-muted p-1">
                                  <Plus className="size-3" />
                                </button>
                              </div>
                            </li>
                          )
                        })}
                      </ul>
                      <div className="mt-4 flex items-center justify-between border-t pt-4">
                        <span className="text-sm text-muted-foreground">Total</span>
                        <span className="font-semibold">{formatRupiah(cart.total)}</span>
                      </div>
                      <button
                        type="button"
                        onClick={checkout}
                        className="mt-4 w-full rounded-full bg-primary py-3 text-sm font-semibold text-primary-foreground transition-transform hover:scale-[1.02]"
                      >
                        Pesan via WhatsApp
                      </button>
                    </>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <a
            href="#booking"
            className="hidden rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-all hover:bg-accent sm:inline-flex"
          >
            Booking
          </a>
          <button
            type="button"
            className="flex size-10 items-center justify-center rounded-full bg-card ring-1 ring-border md:hidden"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label={menuOpen ? 'Tutup menu' : 'Buka menu'}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            aria-label="Navigasi seluler"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            className="mx-3 mt-2 rounded-3xl bg-card p-4 shadow-xl ring-1 ring-border md:hidden"
          >
            <ul className="flex flex-col">
              {[...links, { href: '#booking', label: 'Booking' }].map((l, i) => (
                <motion.li key={l.href} initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}>
                  <a href={l.href} onClick={() => setMenuOpen(false)} className="block rounded-2xl px-4 py-3 font-serif text-xl hover:bg-muted">
                    {l.label}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  )
}
