'use client'

import { motion } from 'framer-motion'
import { Sparkles, Gift, ChevronLeft, ChevronRight } from 'lucide-react'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import { VerificationModal } from './verification-modal'

export function BirthdaySection() {
  const [isVerified, setIsVerified] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const carouselImages = [
    '/portfolio-1.png',
    '/portfolio-2.png',
    '/portfolio-3.png',
    '/portfolio-4.png',
  ]

  useEffect(() => {
    const verified = localStorage.getItem('verified_birthday') === 'true'
    setIsVerified(verified)
    if (!verified) {
      setShowModal(true)
    }
  }, [])

  useEffect(() => {
    if (!isVerified) return

    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % carouselImages.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [isVerified, carouselImages.length])

  const handleVerificationSuccess = () => {
    setIsVerified(true)
    setShowModal(false)
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % carouselImages.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + carouselImages.length) % carouselImages.length)
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  }

  return (
    <section className="relative py-32 px-6 bg-gradient-to-b from-card to-background overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        {!isVerified ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16"
          >
            <p className="text-muted-foreground mb-4">Answer the verification question to unlock the surprise</p>
            <button
              onClick={() => setShowModal(true)}
              className="px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition-colors"
            >
              Verify to Continue
            </button>
          </motion.div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            className="text-center"
          >
            <motion.div variants={itemVariants} className="mb-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full border border-primary/20">
                <Sparkles className="text-primary" size={18} />
                <span className="text-primary text-sm font-semibold uppercase tracking-widest">Special Celebration</span>
                <Sparkles className="text-primary" size={18} />
              </div>
            </motion.div>

            <motion.h2 variants={itemVariants} className="text-5xl md:text-7xl font-bold text-foreground mb-8 leading-tight">
              Happy <span className="text-primary">Birthday</span>
            </motion.h2>

            <motion.p
              variants={itemVariants}
              className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed text-balance"
            >
              Rica, this special day celebrates you and all the beauty you bring to everyone around you. Here&apos;s to capturing
              more beautiful moments and creating more timeless memories.
            </motion.p>

            {/* Image Carousel */}
            <motion.div variants={itemVariants} className="mb-12">
              <div className="relative group rounded-2xl overflow-hidden mb-6 h-80 md:h-96">
                <motion.div
                  key={currentImageIndex}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0"
                >
                  <Image
                    src={carouselImages[currentImageIndex]}
                    alt={`Birthday memory ${currentImageIndex + 1}`}
                    fill
                    className="object-cover"
                  />
                </motion.div>

                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />

                {/* Navigation Buttons */}
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-white/20 hover:bg-white/40 text-white rounded-full backdrop-blur-sm transition-colors z-10"
                >
                  <ChevronLeft size={24} />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-white/20 hover:bg-white/40 text-white rounded-full backdrop-blur-sm transition-colors z-10"
                >
                  <ChevronRight size={24} />
                </button>

                {/* Indicators */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                  {carouselImages.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`w-2 h-2 rounded-full transition-all ${
                        index === currentImageIndex ? 'bg-white w-8' : 'bg-white/50'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { label: 'Years of Excellence', value: '10+' },
                  { label: 'Photos Captured', value: '50K+' },
                  { label: 'Happy Clients', value: '500+' },
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    className="p-6 bg-background border border-border rounded-xl hover:border-primary/50 transition-colors"
                  >
                    <div className="text-4xl font-bold text-primary mb-2">{stat.value}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </motion.div>
                ))}
              </div>

              <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
                <button className="flex items-center justify-center gap-2 px-8 py-4 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition-colors">
                  <Gift size={20} />
                  Send a Message
                </button>
                <button className="px-8 py-4 border border-primary text-primary font-semibold rounded-lg hover:bg-primary/10 transition-colors">
                  View All Photos
                </button>
              </motion.div>
            </motion.div>
          </motion.div>
        )}

        <VerificationModal
          isOpen={showModal}
          question="What comes after laptop?"
          correctAnswers={['laplap', 'lap2']}
          sectionId="birthday"
          onSuccess={handleVerificationSuccess}
          onClose={() => setShowModal(false)}
        />
      </div>
    </section>
  )
}
