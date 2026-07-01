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
            Thank you for bringing so much joy, creativity, and light into the world. Happy Birthday, Rica! 🎉
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="col-span-1">
            <h3 className="text-2xl font-bold text-foreground mb-4">Rica Marie</h3>
            <p className="text-muted-foreground text-sm leading-relaxed mb-4">
              From your little food critic
            </p>
            <div className="flex items-center gap-2">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star key={i} size={16} className="text-primary fill-primary" />
              ))}
            </div>
            <p className="text-sm text-muted-foreground mt-2">User Rating</p>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold text-foreground mb-4">Contacts</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2">
                <Phone size={16} className="text-primary" />
                <a href="tel:09753182549" className="text-muted-foreground hover:text-primary transition-colors">
                  09753182549
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={16} className="text-primary" />
                <a href="mailto:pastrack.casesupport@gmail.com" className="text-muted-foreground hover:text-primary transition-colors break-all">
                  pastrack.casesupport@gmail.com
                </a>
              </li>
            </ul>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-lg font-semibold text-foreground mb-4">Explore</h4>
            <ul className="space-y-2 text-sm">
              {[
                { name: 'History', href: '#history' },
                { name: 'About You', href: '#about' },
                { name: 'Birthday', href: '#birthday' },
                { name: 'Favorites', href: '#favorites' },
                { name: 'Photobooth', href: '#photobooth' }
              ].map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="text-muted-foreground hover:text-primary transition-colors">
                    {link.name}
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
                href="mailto:pastrack.casesupport@gmail.com"
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
            <p>&copy; 2026 mylittlefoodcritic. All rights reserved.</p>
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
