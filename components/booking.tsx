'use client'

import { AnimatePresence, motion } from 'motion/react'
import { Cat, Clock, Dog, MapPin, PartyPopper, Phone, Rabbit } from 'lucide-react'
import { useState, type FormEvent } from 'react'
import { services, whatsappLink } from '@/lib/data'
import { cn } from '@/lib/utils'
import { Reveal } from './reveal'

const petTypes = [
  { value: 'Anjing', icon: Dog },
  { value: 'Kucing', icon: Cat },
  { value: 'Kelinci', icon: Rabbit },
]

const times = ['09.00', '11.00', '13.00', '15.00', '17.00', '19.00']

const inputClass =
  'w-full rounded-2xl border-0 bg-muted px-4 py-3.5 text-sm outline-none ring-1 ring-transparent transition focus:bg-card focus:ring-primary'

export function Booking() {
  const [pet, setPet] = useState('Anjing')
  const [time, setTime] = useState('11.00')
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')

  const today = new Date().toISOString().split('T')[0]

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    const name = String(data.get('name') ?? '').trim()
    const phone = String(data.get('phone') ?? '').trim()
    const petName = String(data.get('petName') ?? '').trim()
    const service = String(data.get('service') ?? '')
    const date = String(data.get('date') ?? '')
    const notes = String(data.get('notes') ?? '').trim()

    if (!name || !petName || !date) return setError('Mohon lengkapi nama, nama anabul, dan tanggal.')
    if (!/^(\+62|62|0)8\d{7,11}$/.test(phone.replace(/[\s-]/g, ''))) return setError('Nomor WhatsApp tidak valid.')
    setError('')

    const message = [
      'Halo Pawsome, saya ingin booking:',
      `Nama: ${name}`,
      `WhatsApp: ${phone}`,
      `Anabul: ${petName} (${pet})`,
      `Layanan: ${service}`,
      `Jadwal: ${date}, pukul ${time}`,
      notes && `Catatan: ${notes}`,
    ]
      .filter(Boolean)
      .join('\n')

    window.open(whatsappLink(message), '_blank', 'noopener,noreferrer')
    setSent(true)
    e.currentTarget.reset()
  }

  return (
    <section id="booking" className="py-24 md:py-32">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 md:grid-cols-[0.9fr_1.1fr] md:gap-16">
        <Reveal className="flex flex-col gap-6">
          <span className="inline-flex w-fit items-center gap-2 rounded-full border border-primary/20 bg-card px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-primary">
            <span className="size-1.5 rounded-full bg-accent" aria-hidden="true" />
            Booking Online
          </span>
          <h2 className="font-serif text-4xl leading-[1.05] tracking-tight text-balance md:text-5xl">
            Jadwalkan kunjungan <em className="text-accent">dalam hitungan detik</em>
          </h2>
          <p className="leading-relaxed text-muted-foreground md:text-lg">
            Isi formulir di samping, dan tim kami akan mengonfirmasi jadwal Anda melalui WhatsApp.
          </p>
          <ul className="mt-2 flex flex-col gap-4">
            {[
              { icon: MapPin, title: 'Jl. Kemang Raya No. 88, Jakarta Selatan' },
              { icon: Clock, title: 'Setiap hari · 08.00 – 21.00' },
              { icon: Phone, title: 'Hotline darurat: 0812-3456-7890' },
            ].map((item) => (
              <li key={item.title} className="flex items-center gap-4">
                <span className="flex size-11 items-center justify-center rounded-2xl bg-secondary text-primary">
                  <item.icon className="size-5" aria-hidden="true" />
                </span>
                <span className="text-sm font-medium">{item.title}</span>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={0.15} className="relative">
          <div className="relative overflow-hidden rounded-[2.5rem] bg-card p-6 shadow-2xl shadow-primary/10 ring-1 ring-border md:p-10">
            <AnimatePresence mode="wait">
              {sent ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="flex min-h-96 flex-col items-center justify-center gap-5 text-center"
                  role="status"
                >
                  <motion.span
                    initial={{ scale: 0, rotate: -45 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: 'spring', stiffness: 220, damping: 12, delay: 0.1 }}
                    className="flex size-20 items-center justify-center rounded-full bg-accent text-accent-foreground"
                  >
                    <PartyPopper className="size-9" aria-hidden="true" />
                  </motion.span>
                  <h3 className="font-serif text-3xl">Booking terkirim!</h3>
                  <p className="max-w-xs text-muted-foreground">
                    Silakan lanjutkan percakapan di WhatsApp. Kami akan segera mengonfirmasi jadwal Anda.
                  </p>
                  <button
                    type="button"
                    onClick={() => setSent(false)}
                    className="rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground"
                  >
                    Booking lagi
                  </button>
                </motion.div>
              ) : (
                <motion.form key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onSubmit={onSubmit} className="flex flex-col gap-5" noValidate>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <label className="flex flex-col gap-2 text-sm font-medium">
                      Nama Anda
                      <input name="name" required autoComplete="name" placeholder="Rina Amelia" className={inputClass} />
                    </label>
                    <label className="flex flex-col gap-2 text-sm font-medium">
                      No. WhatsApp
                      <input name="phone" required type="tel" autoComplete="tel" placeholder="0812xxxxxxx" className={inputClass} />
                    </label>
                  </div>

                  <fieldset className="flex flex-col gap-2">
                    <legend className="mb-2 text-sm font-medium">Jenis anabul</legend>
                    <div className="grid grid-cols-3 gap-3">
                      {petTypes.map((p) => (
                        <button
                          key={p.value}
                          type="button"
                          aria-pressed={pet === p.value}
                          onClick={() => setPet(p.value)}
                          className={cn(
                            'flex flex-col items-center gap-1.5 rounded-2xl py-3 text-sm font-semibold transition-all',
                            pet === p.value ? 'bg-primary text-primary-foreground scale-[1.03]' : 'bg-muted hover:bg-secondary',
                          )}
                        >
                          <p.icon className="size-5" aria-hidden="true" />
                          {p.value}
                        </button>
                      ))}
                    </div>
                  </fieldset>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <label className="flex flex-col gap-2 text-sm font-medium">
                      Nama anabul
                      <input name="petName" required placeholder="Mochi" className={inputClass} />
                    </label>
                    <label className="flex flex-col gap-2 text-sm font-medium">
                      Layanan
                      <select name="service" className={inputClass} defaultValue={services[0].title}>
                        {services.map((s) => (
                          <option key={s.key}>{s.title}</option>
                        ))}
                      </select>
                    </label>
                  </div>

                  <label className="flex flex-col gap-2 text-sm font-medium">
                    Tanggal
                    <input name="date" type="date" min={today} required className={inputClass} />
                  </label>

                  <fieldset>
                    <legend className="mb-2 text-sm font-medium">Jam kedatangan</legend>
                    <div className="grid grid-cols-3 gap-2 sm:grid-cols-6">
                      {times.map((t) => (
                        <button
                          key={t}
                          type="button"
                          aria-pressed={time === t}
                          onClick={() => setTime(t)}
                          className={cn(
                            'rounded-xl py-2.5 text-sm font-semibold tabular-nums transition-colors',
                            time === t ? 'bg-accent text-accent-foreground' : 'bg-muted hover:bg-secondary',
                          )}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  </fieldset>

                  <label className="flex flex-col gap-2 text-sm font-medium">
                    Catatan (opsional)
                    <textarea name="notes" rows={3} placeholder="Alergi, kebiasaan, atau permintaan khusus..." className={cn(inputClass, 'resize-none')} />
                  </label>

                  <AnimatePresence>
                    {error && (
                      <motion.p
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="text-sm font-medium text-destructive"
                        role="alert"
                      >
                        {error}
                      </motion.p>
                    )}
                  </AnimatePresence>

                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="rounded-full bg-primary py-4 font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition-colors hover:bg-accent"
                  >
                    Kirim Booking via WhatsApp
                  </motion.button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
