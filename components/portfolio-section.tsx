'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import Image from 'next/image'

const portfolioItems = [
  {
    id: 1,
    title: 'January',
    description: 'Memories from the start',
    image: '/portfolio-1.png',
    color: 'from-amber-600 to-orange-600',
  },
  {
    id: 2,
    title: 'February',
    description: 'Love in every frame',
    image: '/portfolio-2.png',
    color: 'from-rose-600 to-pink-600',
  },
  {
    id: 3,
    title: 'March',
    description: 'New beginnings captured',
    image: '/portfolio-3.png',
    color: 'from-cyan-600 to-blue-600',
  },
  {
    id: 4,
    title: 'April',
    description: 'Spring moments',
    image: '/portfolio-4.png',
    color: 'from-emerald-600 to-green-600',
  },
  {
    id: 5,
    title: 'May',
    description: 'Growth and beauty',
    image: '/portfolio-1.png',
    color: 'from-purple-600 to-pink-600',
  },
  {
    id: 6,
    title: 'June',
    description: 'Perfect summer days',
    image: '/portfolio-2.png',
    color: 'from-yellow-600 to-amber-600',
  },
]

export function PortfolioSection() {
  const [hoveredId, setHoveredId] = useState<number | null>(null)

  return (
    <section className="relative py-24 px-6 bg-background overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center"
        >
          <p className="text-primary text-sm font-semibold uppercase tracking-widest mb-4">History</p>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight text-balance">
            Memory Timeline with Kyle
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-transparent via-primary to-transparent mx-auto" />
        </motion.div>

        <div className="flex overflow-x-auto gap-6 pb-4 scroll-smooth">
          {portfolioItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              onMouseEnter={() => setHoveredId(item.id)}
              onMouseLeave={() => setHoveredId(null)}
              className="group cursor-pointer relative overflow-hidden rounded-xl h-64 md:h-80 flex-shrink-0 w-72"
            >
              {/* Image Background */}
              <div className="absolute inset-0 overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent group-hover:from-primary/30 group-hover:via-transparent group-hover:to-transparent transition-all duration-300" />
              </div>

              {/* Content */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: hoveredId === item.id ? 1 : 0 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0 flex items-center justify-center bg-primary/20 backdrop-blur-sm"
              >
                <div className="text-center px-6">
                  <button className="px-6 py-2 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition-colors">
                    View Collection
                  </button>
                </div>
              </motion.div>

              {/* Title & Description */}
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="text-xl md:text-2xl font-bold text-foreground mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground group-hover:text-primary/80 transition-colors">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
