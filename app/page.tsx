import { HeroSection } from '@/components/hero-section'
import { AboutSection } from '@/components/about-section'
import { PortfolioSection } from '@/components/portfolio-section'
import { BirthdaySection } from '@/components/birthday-section'
import { Footer } from '@/components/footer'

export default function Home() {
  return (
    <main className="bg-background">
      <HeroSection />
      <PortfolioSection />
      <AboutSection />
      <BirthdaySection />
      <Footer />
    </main>
  )
}
