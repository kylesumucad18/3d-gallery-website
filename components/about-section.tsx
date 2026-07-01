'use client'

import { motion } from 'framer-motion'
import { Camera, Sparkles, Heart } from 'lucide-react'

export function AboutSection() {
  const features = [
    {
      icon: Camera,
      title: 'Professional Vision',
      description: 'Capturing moments with precision, artistry, and technical excellence',
    },
    {
      icon: Heart,
      title: 'Passionate Work',
      description: 'Each frame tells a story, filled with emotion and authentic beauty',
    },
    {
      icon: Sparkles,
      title: 'Artistic Excellence',
      description: 'Blending creativity with technical mastery for timeless imagery',
    },
  ]

  return (
    <section className="relative py-24 px-6 bg-gradient-to-b from-background to-card overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center"
        >
          <p className="text-primary text-sm font-semibold uppercase tracking-widest mb-4">About the Work</p>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight text-balance">
            A Journey Through Light and Moments
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-transparent via-primary to-transparent mx-auto" />
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-lg text-muted-foreground max-w-3xl mx-auto mb-16 leading-relaxed text-center text-balance"
        >
          This gallery is a celebration of Rica&apos;s exceptional photography work, showcasing a diverse portfolio of
          stunning visual moments. From intimate portraits to dynamic compositions, each photograph reflects a unique
          perspective and mastery of light, color, and emotion.
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className="group p-8 rounded-xl bg-card border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/10"
              >
                <div className="mb-6 inline-block p-4 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                  <Icon className="text-primary" size={28} />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
