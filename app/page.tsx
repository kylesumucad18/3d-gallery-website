import { HeroSection } from '@/components/hero-section'
import { AboutSection } from '@/components/about-section'
import { PortfolioSection } from '@/components/portfolio-section'
import { BirthdaySection } from '@/components/birthday-section'
import { FavoritesSection } from '@/components/favorites-section'
import { PhotoboothSection } from '@/components/photobooth-section'
import { Footer } from '@/components/footer'

export const dynamic = 'force-dynamic'

export default function Home() {
  return (
    <main className="bg-background">
      <HeroSection />
      <PortfolioSection />
      <AboutSection />
      <BirthdaySection />
      <FavoritesSection />
      <PhotoboothSection />
      <Footer />
    </main>
  )
}
