'use client'

import { motion, useScroll, useTransform } from 'motion/react'
import { ArrowRight, CalendarCheck, HeartPulse, PawPrint, Scissors, Star } from 'lucide-react'
import Image from 'next/image'
import { useRef } from 'react'

const headline = ['Sayangi', 'mereka', 'seperti']
const ease = [0.22, 1, 0.36, 1] as const

export function Hero() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const imageY = useTransform(scrollYProgress, [0, 1], [0, 120])
  const imageRotate = useTransform(scrollYProgress, [0, 1], [0, -6])

  return (
    <section ref={ref} className="relative overflow-hidden pb-16 pt-32 md:pb-24 md:pt-40">
      <div className="pointer-events-none absolute -left-32 top-20 size-96 animate-blob bg-secondary/70 blur-2xl" aria-hidden="true" />
      <div className="pointer-events-none absolute -right-20 bottom-0 size-80 animate-blob bg-butter/50 blur-2xl [animation-delay:-5s]" aria-hidden="true" />

      {[
        'left-[8%] top-[22%] size-6 rotate-12',
        'left-[45%] top-[14%] size-4 -rotate-12',
        'right-[6%] top-[30%] size-8 rotate-45',
        'left-[4%] bottom-[18%] size-5 -rotate-45',
      ].map((pos, i) => (
        <PawPrint
          key={pos}
          aria-hidden="true"
          className={`pointer-events-none absolute animate-float text-primary/15 ${pos}`}
          style={{ animationDelay: `${i * -1.5}s` }}
        />
      ))}

      <div className="relative mx-auto grid max-w-6xl items-center gap-14 px-5 md:grid-cols-[1.1fr_1fr] md:gap-8">
        <div className="flex flex-col items-start gap-7">
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease }}
            className="inline-flex items-center gap-2 rounded-full bg-card px-4 py-2 text-sm font-medium shadow-sm ring-1 ring-border"
          >
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent opacity-75" />
              <span className="relative inline-flex size-2 rounded-full bg-accent" />
            </span>
            Buka hari ini · 08.00 – 21.00
          </motion.span>

          <h1 className="font-serif text-5xl leading-[0.95] tracking-tight text-balance sm:text-6xl lg:text-7xl">
            {headline.map((word, i) => (
              <span key={word} className="inline-block overflow-hidden pb-2 align-bottom">
                <motion.span
                  className="inline-block pr-3"
                  initial={{ y: '110%' }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.9, delay: 0.1 + i * 0.1, ease }}
                >
                  {word}
                </motion.span>
              </span>
            ))}
            <span className="inline-block overflow-hidden pb-2 align-bottom">
              <motion.span
                className="relative inline-block italic text-primary"
                initial={{ y: '110%' }}
                animate={{ y: 0 }}
                transition={{ duration: 0.9, delay: 0.45, ease }}
              >
                keluarga
                <motion.svg
                  viewBox="0 0 200 20"
                  className="absolute -bottom-1 left-0 h-3 w-full text-accent"
                  aria-hidden="true"
                >
                  <motion.path
                    d="M2 14 Q 50 2 100 10 T 198 8"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="4"
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1, delay: 1.1, ease }}
                  />
                </motion.svg>
              </motion.span>
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease }}
            className="max-w-lg text-pretty text-lg leading-relaxed text-muted-foreground"
          >
            Grooming, klinik hewan, pet hotel, pelatihan hingga produk premium — semua kebutuhan anabul kesayangan
            ada di satu tempat yang hangat dan penuh cinta.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.75, ease }}
            className="flex flex-wrap items-center gap-3"
          >
            <a
              href="#booking"
              className="group inline-flex items-center gap-2 rounded-full bg-primary px-7 py-4 font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition-all hover:-translate-y-0.5 hover:bg-accent hover:shadow-accent/30"
            >
              Booking Sekarang
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </a>
            <a
              href="#layanan"
              className="inline-flex items-center gap-2 rounded-full bg-card px-7 py-4 font-semibold ring-1 ring-border transition-all hover:-translate-y-0.5 hover:ring-primary"
            >
              Lihat Layanan
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="flex items-center gap-4"
          >
            <div className="flex -space-x-3" aria-hidden="true">
              {['bg-accent', 'bg-primary', 'bg-butter', 'bg-secondary'].map((c, i) => (
                <span key={c} className={`flex size-10 items-center justify-center rounded-full ring-4 ring-background ${c}`}>
                  <PawPrint className={`size-4 ${i < 2 ? 'text-primary-foreground' : 'text-primary'}`} />
                </span>
              ))}
            </div>
            <div>
              <div className="flex items-center gap-0.5 text-accent" aria-label="Rating 4,9 dari 5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="size-4 fill-current" aria-hidden="true" />
                ))}
                <span className="ml-1 text-sm font-semibold text-foreground">4,9</span>
              </div>
              <p className="text-sm text-muted-foreground">dari 12.000+ pawrents bahagia</p>
            </div>
          </motion.div>
        </div>

        <div className="relative mx-auto w-full max-w-md">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1.1, delay: 0.2, ease }}
            style={{ y: imageY, rotate: imageRotate }}
            className="relative"
          >
            <div className="absolute inset-0 translate-x-4 translate-y-4 rounded-t-full rounded-b-[3rem] bg-primary" aria-hidden="true" />
            <div className="relative aspect-[4/5] overflow-hidden rounded-t-full rounded-b-[3rem] bg-secondary">
              <Image
                src="/images/hero-pets.png"
                alt="Anak anjing golden retriever dan kucing oranye duduk bersama"
                fill
                priority
                sizes="(min-width: 768px) 28rem, 90vw"
                className="object-cover"
              />
            </div>
          </motion.div>

          <div className="absolute -left-6 -top-4 size-28 md:-left-12" aria-hidden="true">
            <svg viewBox="0 0 100 100" className="size-full animate-spin-slow text-primary">
              <defs>
                <path id="circle" d="M50,50 m-38,0 a38,38 0 1,1 76,0 a38,38 0 1,1 -76,0" />
              </defs>
              <text className="fill-current text-[10.5px] font-semibold uppercase tracking-[0.2em]">
                <textPath href="#circle">Grooming • Klinik • Hotel • Spa •</textPath>
              </text>
            </svg>
            <span className="absolute inset-0 m-auto flex size-12 items-center justify-center rounded-full bg-accent text-accent-foreground">
              <PawPrint className="size-6" />
            </span>
          </div>

          <FloatingCard className="-left-4 bottom-24 md:-left-16" delay={1.1} floatDelay="0s">
            <span className="flex size-10 items-center justify-center rounded-full bg-secondary text-primary">
              <Scissors className="size-5" aria-hidden="true" />
            </span>
            <div>
              <p className="text-sm font-semibold">Grooming selesai</p>
              <p className="text-xs text-muted-foreground">Mochi siap dijemput</p>
            </div>
          </FloatingCard>

          <FloatingCard className="-right-2 top-24 md:-right-10" delay={1.3} floatDelay="-3s">
            <span className="flex size-10 items-center justify-center rounded-full bg-accent/15 text-accent">
              <HeartPulse className="size-5" aria-hidden="true" />
            </span>
            <div>
              <p className="text-sm font-semibold">Dokter 24 jam</p>
              <p className="text-xs text-muted-foreground">Siaga darurat</p>
            </div>
          </FloatingCard>

          <FloatingCard className="-bottom-6 right-6" delay={1.5} floatDelay="-1.5s">
            <span className="flex size-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <CalendarCheck className="size-5" aria-hidden="true" />
            </span>
            <div>
              <p className="text-sm font-semibold">+230 booking</p>
              <p className="text-xs text-muted-foreground">minggu ini</p>
            </div>
          </FloatingCard>
        </div>
      </div>
    </section>
  )
}

function FloatingCard({
  children,
  className,
  delay,
  floatDelay,
}: {
  children: React.ReactNode
  className: string
  delay: number
  floatDelay: string
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: 'spring', stiffness: 200, damping: 16, delay }}
      className={`absolute ${className}`}
    >
      <div
        className="flex animate-float items-center gap-3 rounded-2xl bg-card/90 p-3 pr-5 shadow-xl shadow-primary/10 ring-1 ring-border backdrop-blur"
        style={{ animationDelay: floatDelay }}
      >
        {children}
      </div>
    </motion.div>
  )
}
