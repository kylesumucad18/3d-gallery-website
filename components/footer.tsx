'use client'

import { Mail, Heart, Share2 } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-gradient-to-b from-card to-background border-t border-border">
      <div className="max-w-6xl mx-auto px-6 py-16">
        {/* Birthday Message */}
        <div className="text-center mb-12 pb-8 border-b border-border/50">
          <p className="text-primary font-semibold uppercase tracking-widest text-sm mb-2">Special Day</p>
          <h3 className="text-3xl font-bold text-foreground mb-2">Celebrating You</h3>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Thank you for bringing so much joy, creativity, and light into the world. Happy Birthday, Rica! 🎉
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div className="col-span-1 md:col-span-1">
            <h3 className="text-2xl font-bold text-foreground mb-4">Rica Marie</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Professional photographer capturing moments that matter. Here&apos;s to celebrating you on your special day!
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-lg font-semibold text-foreground mb-4">Explore</h4>
            <ul className="space-y-2 text-sm">
              {['Gallery', 'Portfolio', 'About', 'Contact'].map((link) => (
                <li key={link}>
                  <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="text-lg font-semibold text-foreground mb-4">Connect</h4>
            <div className="flex gap-4">
              <a
                href="#"
                className="inline-flex items-center justify-center w-10 h-10 bg-muted rounded-lg hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                <Mail size={18} />
              </a>
              <a
                href="#"
                className="inline-flex items-center justify-center w-10 h-10 bg-muted rounded-lg hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                <Heart size={18} />
              </a>
              <a
                href="#"
                className="inline-flex items-center justify-center w-10 h-10 bg-muted rounded-lg hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                <Share2 size={18} />
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-border pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
            <p>&copy; 2024 Rica Marie Huyo-a Caayon. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-primary transition-colors">
                Privacy
              </a>
              <a href="#" className="hover:text-primary transition-colors">
                Terms
              </a>
              <a href="#" className="hover:text-primary transition-colors">
                Credits
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
