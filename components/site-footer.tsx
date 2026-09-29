import { ArrowRight, Camera, MessageCircle, PawPrint, Play } from 'lucide-react'
import { whatsappLink } from '@/lib/data'
import { Reveal } from './reveal'

export function SiteFooter() {
  return (
    <footer className="px-3 pb-3">
      <div className="relative overflow-hidden rounded-[2.5rem] bg-primary px-6 pb-8 pt-20 text-primary-foreground md:px-12">
        <div className="pointer-events-none absolute -left-20 -top-20 size-80 animate-blob bg-accent/30 blur-3xl" aria-hidden="true" />
        <PawPrint className="pointer-events-none absolute -bottom-10 -right-10 size-72 rotate-[-20deg] text-primary-foreground/5" aria-hidden="true" />

        <Reveal className="relative mx-auto flex max-w-6xl flex-col items-start justify-between gap-8 border-b border-primary-foreground/15 pb-16 md:flex-row md:items-end">
          <h2 className="max-w-2xl font-serif text-5xl leading-[0.95] tracking-tight text-balance md:text-7xl">
            Siap memanjakan <em className="text-accent">anabul</em> hari ini?
          </h2>
          <a
            href={whatsappLink('Halo Pawsome, saya ingin bertanya tentang layanan kalian.')}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex shrink-0 items-center gap-3 rounded-full bg-accent px-7 py-4 font-semibold text-accent-foreground transition-transform hover:scale-105"
          >
            <MessageCircle className="size-5" aria-hidden="true" />
            Chat WhatsApp
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
          </a>
        </Reveal>

        <div className="relative mx-auto grid max-w-6xl gap-10 py-14 sm:grid-cols-2 md:grid-cols-4">
          <div className="flex flex-col gap-4">
            <span className="flex items-center gap-2 font-serif text-2xl">
              <PawPrint className="size-6 text-accent" aria-hidden="true" />
              Pawsome
            </span>
            <p className="text-sm leading-relaxed text-primary-foreground/70">
              Pet shop, klinik, dan rumah kedua bagi anabul kesayangan sejak 2015.
            </p>
            <div className="flex gap-2">
              {[
                { icon: Camera, label: 'Instagram' },
                { icon: Play, label: 'YouTube' },
              ].map((s) => (
                <a
                  key={s.label}
                  href="#"
                  aria-label={s.label}
                  className="flex size-10 items-center justify-center rounded-full bg-primary-foreground/10 transition-all hover:-translate-y-1 hover:bg-accent"
                >
                  <s.icon className="size-4" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>
          <FooterCol title="Layanan" items={['Grooming', 'Klinik Hewan', 'Pet Hotel', 'Pelatihan', 'Spa']} href="#layanan" />
          <FooterCol title="Toko" items={['Makanan', 'Mainan', 'Aksesoris', 'Perawatan']} href="#toko" />
          <div className="flex flex-col gap-3 text-sm">
            <p className="font-semibold">Jam Operasional</p>
            <p className="text-primary-foreground/70">Senin – Minggu</p>
            <p className="text-primary-foreground/70">08.00 – 21.00 WIB</p>
            <p className="text-primary-foreground/70">Klinik darurat 24 jam</p>
          </div>
        </div>

        <p className="relative mx-auto max-w-6xl border-t border-primary-foreground/15 pt-6 text-xs text-primary-foreground/60">
          {`© ${new Date().getFullYear()} Pawsome Pet Shop. Dibuat dengan cinta untuk para anabul.`}
        </p>
      </div>
    </footer>
  )
}

function FooterCol({ title, items, href }: { title: string; items: string[]; href: string }) {
  return (
    <div className="flex flex-col gap-3 text-sm">
      <p className="font-semibold">{title}</p>
      <ul className="flex flex-col gap-2">
        {items.map((i) => (
          <li key={i}>
            <a href={href} className="text-primary-foreground/70 transition-colors hover:text-accent">
              {i}
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}
