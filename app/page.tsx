import { Booking } from '@/components/booking'
import { CartProvider } from '@/components/cart-context'
import { Faq } from '@/components/faq'
import { Hero } from '@/components/hero'
import { MarqueeStrip } from '@/components/marquee-strip'
import { Pricing } from '@/components/pricing'
import { Process } from '@/components/process'
import { Services } from '@/components/services'
import { Shop } from '@/components/shop'
import { Showcase } from '@/components/showcase'
import { SiteFooter } from '@/components/site-footer'
import { SiteHeader } from '@/components/site-header'
import { Stats } from '@/components/stats'
import { Testimonials } from '@/components/testimonials'

export default function Page() {
  return (
    <CartProvider>
      <SiteHeader />
      <main className="overflow-x-clip">
        <Hero />
        <MarqueeStrip />
        <Services />
        <Showcase />
        <Stats />
        <Pricing />
        <Shop />
        <Process />
        <Booking />
        <Testimonials />
        <Faq />
      </main>
      <SiteFooter />
    </CartProvider>
  )
}
