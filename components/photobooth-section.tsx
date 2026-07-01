'use client'

import { motion } from 'framer-motion'
import { Camera, ArrowRight } from 'lucide-react'
import Link from 'next/link'

export function PhotoboothSection() {
  const layouts = [
    {
      id: 'M',
      name: 'Layout M',
      description: 'Three pictures, three poses',
      icon: '3x1',
    },
    {
      id: 'A',
      name: 'Layout A',
      description: 'Two pictures, two poses',
      icon: '2x1',
    },
    {
      id: 'R',
      name: 'Layout R',
      description: 'Four pictures, four poses',
      icon: '2x2',
    },
    {
      id: 'I',
      name: 'Layout I',
      description: 'One picture, different filters, four results',
      icon: '1x4',
    },
    {
      id: 'E',
      name: 'Layout E',
      description: 'Six pictures, six poses',
      icon: '3x2',
    },
  ]

  return (
    <section className="relative py-20 md:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <p className="text-primary text-sm font-semibold uppercase tracking-widest mb-4">Interactive Fun</p>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight text-balance">
            Photobooth - Reactions of the Birthday Girl
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
            Step into the spotlight and capture fun moments. Choose your preferred layout and theme.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {layouts.map((layout, index) => (
            <motion.div
              key={layout.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group"
            >
              <Link href={`/photobooth?layout=${layout.id}`}>
                <div className="relative h-64 rounded-xl overflow-hidden border border-border hover:border-primary/50 transition-all duration-300 cursor-pointer bg-gradient-to-br from-primary/20 to-accent/20 hover:shadow-lg hover:shadow-primary/20">
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                    <div className="mb-4 p-4 bg-primary/20 rounded-lg group-hover:bg-primary/30 transition-colors">
                      <Camera className="text-primary" size={32} />
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-2">{layout.name}</h3>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{layout.description}</p>
                    <div className="text-xs font-semibold text-primary uppercase tracking-wider mb-4">
                      {layout.icon}
                    </div>
                    <div className="flex items-center gap-2 text-primary font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                      Start <ArrowRight size={16} />
                    </div>
                  </div>

                  <div className="absolute inset-0 bg-gradient-to-t from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12 p-8 rounded-xl border border-primary/20 bg-primary/5"
        >
          <h3 className="text-2xl font-bold text-foreground mb-4">How It Works</h3>
          <ul className="space-y-3 text-muted-foreground">
            <li className="flex gap-3">
              <span className="text-primary font-bold">1.</span>
              <span>Select your preferred layout and theme</span>
            </li>
            <li className="flex gap-3">
              <span className="text-primary font-bold">2.</span>
              <span>Allow camera access when prompted</span>
            </li>
            <li className="flex gap-3">
              <span className="text-primary font-bold">3.</span>
              <span>Follow the poses and capture your moments</span>
            </li>
            <li className="flex gap-3">
              <span className="text-primary font-bold">4.</span>
              <span>Customize with filters and download your creation</span>
            </li>
          </ul>
        </motion.div>
      </div>
    </section>
  )
}
