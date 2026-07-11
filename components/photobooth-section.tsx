'use client'

import { motion } from 'framer-motion'
import { Camera, ArrowRight } from 'lucide-react'
import Link from 'next/link'

export function PhotoboothSection() {
  const layouts = [
    {
      id: 'M',
      name: 'Layout M',
      description: 'Size: 6x2 (Strip) 3 Pose',
      icon: '3x1',
    },
    {
      id: 'A',
      name: 'Layout A',
      description: 'Size: 6x2 (Strip) 3 Pose',
      icon: '3x1',
    },
    {
      id: 'R',
      name: 'Layout R',
      description: 'Size: 6x2 (Strip) 4 Pose',
      icon: '4x1',
    },
    {
      id: 'I',
      name: 'Layout I',
      description: 'Size: 6x2 (Strip) 4 Pose',
      icon: '4x1',
    },
    {
      id: 'E',
      name: 'Layout E',
      description: 'Size: 6x4 (4R) 4 Pose',
      icon: '4R',
    },
    {
      id: 'H',
      name: 'Layout H',
      description: 'Size: 6x4 (4R) 4 Pose (Grid)',
      icon: '2x2',
    },
  ]

  return (
    <section id="photobooth" className="relative py-20 md:py-32 overflow-hidden">
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {layouts.map((layout, index) => (
            <motion.div
              key={layout.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group"
            >
              <Link href={`/photobooth?layout=${layout.id}`}>
                <div className="relative h-72 rounded-3xl overflow-hidden border border-border hover:border-primary transition-all duration-500 cursor-pointer bg-card shadow-lg hover:shadow-[0_8px_30px_rgb(var(--primary)_/_0.3)] hover:-translate-y-1">
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center z-10">
                    <div className="mb-5 p-5 bg-primary/10 rounded-2xl group-hover:bg-primary transition-all duration-300 transform group-hover:scale-110">
                      <Camera className="text-primary group-hover:text-primary-foreground" size={36} />
                    </div>
                    <h3 className="text-2xl font-black text-foreground mb-2 tracking-tight">{layout.name}</h3>
                    <p className="text-sm text-foreground font-medium mb-5">{layout.description}</p>
                    <div className="text-xs font-bold text-primary-foreground bg-primary px-4 py-1.5 rounded-full uppercase tracking-wider mb-4">
                      {layout.icon}
                    </div>
                    <div className="flex items-center gap-2 text-primary font-bold opacity-0 group-hover:opacity-100 transition-opacity translate-y-2 group-hover:translate-y-0 duration-300">
                      Start <ArrowRight size={18} />
                    </div>
                  </div>

                  <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
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
          <ul className="space-y-3 text-foreground font-medium">
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
