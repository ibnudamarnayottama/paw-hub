import { PawPrint } from 'lucide-react'

const words = ['Grooming', 'Klinik Hewan', 'Pet Hotel', 'Pelatihan', 'Spa & Aromaterapi', 'Vaksinasi', 'Antar Jemput', 'Produk Premium']

export function MarqueeStrip() {
  return (
    <div className="relative -rotate-2 overflow-hidden bg-primary py-5 text-primary-foreground" aria-hidden="true">
      <div className="flex w-max animate-marquee items-center">
        {[...words, ...words].map((w, i) => (
          <span key={i} className="flex items-center gap-8 px-4 font-serif text-2xl italic md:text-3xl">
            {w}
            <PawPrint className="size-6 text-accent" />
          </span>
        ))}
      </div>
    </div>
  )
}
