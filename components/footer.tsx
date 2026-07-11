'use client'

import { Mail, Heart, Share2, Phone, Star } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-gradient-to-b from-card to-background border-t border-border">
      <div className="max-w-6xl mx-auto px-6 py-16">
        {/* Birthday Message */}
        <div className="text-center mb-12 pb-8 border-b border-border/50">
          <p className="text-primary font-semibold uppercase tracking-widest text-sm mb-2">Special Day</p>
          <h3 className="text-3xl font-bold text-foreground mb-2">Celebrating You</h3>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Thank you for bringing so much joy, creativity, and light into the world.<br></br> Happy Birthday, Baby ^^ ! 🎉
          </p>
        </div>

        <div className="flex flex-col items-center justify-center text-center space-y-6 mb-16">
          <p className="text-2xl md:text-3xl font-serif italic text-foreground mb-4">
            With all my love,
          </p>
          <h3 className="text-4xl font-bold text-primary mb-2">Your Little Food Critic</h3>
          <div className="flex gap-4 mt-6">
            <a href="#" className="inline-flex items-center justify-center w-12 h-12 bg-muted text-muted-foreground rounded-full hover:bg-primary hover:text-primary-foreground transition-all hover:scale-110 shadow-sm hover:shadow-primary/30">
              <Heart size={20} />
            </a>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-border pt-8">
          <div className="flex justify-center items-center text-sm text-muted-foreground">
            <p>&copy; 2026 mylittlefoodcritic. For Rica Marie.</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
