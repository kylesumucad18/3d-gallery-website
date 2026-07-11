'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles, Gift, ChevronLeft, ChevronRight, X } from 'lucide-react'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import { VerificationModal } from './verification-modal'

export function BirthdaySection() {
  const [isVerified, setIsVerified] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [showAllPhotos, setShowAllPhotos] = useState(false)
  const [zoomedImage, setZoomedImage] = useState<string | null>(null)

  // Lock body scroll when modals are open
  useEffect(() => {
    if (showAllPhotos || zoomedImage) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [showAllPhotos, zoomedImage])

  // ============================================================================
  // 📸 HOW TO CHANGE CAROUSEL PHOTOS:
  // 1. Add your new image files to the `public` folder in your project
  // 2. Replace the paths below with your new filenames (e.g., '/my-photo.jpg')
  // Note: You can add as many photos as you want by adding more strings to this list!
  // ============================================================================
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

  // Removed variants to prevent framer-motion mounting bugs

  return (
    <section id="birthday" className="relative py-32 px-6 bg-gradient-to-b from-card to-background overflow-hidden">
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
          <div className="text-center animate-in fade-in zoom-in duration-700">
            <div className="mb-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full border border-primary/20">
                <Sparkles className="text-primary" size={18} />
                <span className="text-primary text-sm font-semibold uppercase tracking-widest">Special Celebration</span>
                <Sparkles className="text-primary" size={18} />
              </div>
            </div>

            <h2 className="text-5xl md:text-7xl font-bold text-foreground mb-8 leading-tight">
              Happy <span className="text-primary">Birthday</span>
            </h2>

            <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed text-balance">
              Rica, this special day celebrates you and all the beauty you bring to everyone around you. Here&apos;s to capturing
              more beautiful moments and creating more timeless memories.
            </p>

            {/* Image Carousel */}
            <div className="mb-12">
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
            </div>

            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { label: 'Days Together', value: '1,000+' },
                  { label: 'Memories Made', value: 'Countless' },
                  { label: 'Reasons to Smile', value: 'Infinite' },
                ].map((stat, index) => (
                  <div
                    key={index}
                    className="p-6 bg-background border border-border rounded-xl hover:border-primary/50 transition-colors"
                  >
                    <div className="text-4xl font-bold text-primary mb-2">{stat.value}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
                <button
                  onClick={() => window.open('https://www.messenger.com/', '_blank')}
                  className="flex items-center justify-center gap-2 px-8 py-4 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition-colors"
                >
                  <Gift size={20} />
                  Send a Message
                </button>
                <button
                  onClick={() => setShowAllPhotos(true)}
                  className="px-8 py-4 border border-primary text-primary font-semibold rounded-lg hover:bg-primary/10 transition-colors"
                >
                  View All Photos
                </button>
              </div>
            </div>
          </div>
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

      <AnimatePresence>
        {showAllPhotos && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 md:p-8"
              onClick={() => setShowAllPhotos(false)}
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-card w-full max-w-6xl max-h-[90vh] rounded-3xl overflow-hidden border border-border shadow-2xl flex flex-col"
              >
                <div className="p-6 md:p-8 border-b border-border flex justify-between items-center bg-card z-10 sticky top-0">
                  <div>
                    <h2 className="text-3xl font-bold text-foreground mb-2">All Memories</h2>
                    <p className="text-muted-foreground font-medium">January to June Collection</p>
                  </div>
                  <button onClick={() => setShowAllPhotos(false)} className="p-3 bg-muted rounded-full hover:bg-primary hover:text-primary-foreground transition-colors">
                    <X size={24} />
                  </button>
                </div>
                <div className="p-6 md:p-8 overflow-y-auto">
                  {['January', 'February', 'March', 'April', 'May', 'June'].map(month => (
                    <div key={month} className="mb-12 last:mb-0">
                      <div className="flex items-center gap-4 mb-6">
                        <h3 className="text-2xl font-bold text-primary">{month}</h3>
                        <div className="h-px bg-border flex-1" />
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                        {Array.from({ length: 12 }).map((_, i) => {
                          const imageSrc = `/${month.toLowerCase()}/${i + 1}.png`
                          return (
                            <div 
                              key={i} 
                              onClick={() => setZoomedImage(imageSrc)}
                              className="relative aspect-square rounded-xl overflow-hidden border border-border hover:border-primary/50 hover:shadow-xl hover:shadow-primary/20 transition-all duration-300 cursor-pointer"
                            >
                              <Image 
                                src={imageSrc} 
                                alt={`${month} photo ${i + 1}`} 
                                fill 
                                className="object-cover hover:scale-110 transition-transform duration-500" 
                                unoptimized 
                              />
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Zoomed Image Modal */}
        <AnimatePresence>
          {zoomedImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[110] bg-black/95 flex items-center justify-center p-4"
              onClick={() => setZoomedImage(null)}
            >
              <button 
                onClick={() => setZoomedImage(null)}
                className="absolute top-6 right-6 z-[120] p-3 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors backdrop-blur-sm"
              >
                <X size={32} />
              </button>
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="relative w-full max-w-5xl h-[85vh] rounded-xl overflow-hidden"
              >
                <Image 
                  src={zoomedImage} 
                  alt="Zoomed photo" 
                  fill 
                  className="object-contain" 
                  unoptimized 
                />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
    </section>
  )
}
