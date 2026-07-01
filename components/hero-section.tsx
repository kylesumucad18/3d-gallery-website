'use client'

import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

export function HeroSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut' },
    },
  }

  return (
    <section className="relative min-h-screen bg-background flex items-center justify-center overflow-hidden">
      {/* Background Glow */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/3 rounded-full blur-3xl" />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 max-w-4xl px-6 text-center"
      >
        <motion.div variants={itemVariants} className="mb-8">
          <div className="inline-block">
            <p className="text-primary text-lg font-bold uppercase tracking-widest mb-2">🎉 Special Day 🎉</p>
            <div className="w-full h-1 bg-gradient-to-r from-primary via-primary to-primary/50" />
          </div>
        </motion.div>

        <motion.h1
          variants={itemVariants}
          className="text-5xl md:text-7xl lg:text-8xl font-bold text-foreground mb-4 leading-tight text-balance"
        >
          Happy Birthday,{' '}
          <span className="text-primary">Rica Marie</span>
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="text-lg md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed text-balance"
        >
          Today we celebrate you—your compassion, creativity, and the beautiful moments you&apos;ve shared with everyone. 
          Explore this gallery to revisit our journey together and discover what makes you so special.
        </motion.p>

        <motion.div variants={itemVariants} className="flex gap-4 justify-center">
          <button className="px-8 py-3 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition-colors">
            View Gallery
          </button>
          <button className="px-8 py-3 border border-primary text-primary font-semibold rounded-lg hover:bg-primary/10 transition-colors">
            Learn More
          </button>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce"
        >
          <ChevronDown className="text-primary/50" size={32} />
        </motion.div>
      </motion.div>
    </section>
  )
}
