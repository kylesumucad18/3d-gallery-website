'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import Image from 'next/image'

interface PhotoCarouselModalProps {
  isOpen: boolean
  onClose: () => void
  title?: string
}

// 12 food critic and birthday moment photos
const CAROUSEL_PHOTOS = [
  { id: 1, title: 'Birthday Toast', src: '/photo-album/birthday-toast.jpg' },
  { id: 2, title: 'Cake Celebration', src: '/photo-album/cake-celebration.jpg' },
  { id: 3, title: 'Dinner Date', src: '/photo-album/dinner-date.jpg' },
  { id: 4, title: 'Food Tasting', src: '/photo-album/food-tasting.jpg' },
  { id: 5, title: 'Birthday Moment 1', src: '/photo-album/birthday-moment-1.jpg' },
  { id: 6, title: 'Birthday Moment 2', src: '/photo-album/birthday-moment-2.jpg' },
  { id: 7, title: 'Celebration Time', src: '/photo-album/celebration-time.jpg' },
  { id: 8, title: 'Special Memory', src: '/photo-album/special-memory.jpg' },
  { id: 9, title: 'Food Adventure', src: '/photo-album/food-adventure.jpg' },
  { id: 10, title: 'Birthday Cake', src: '/photo-album/birthday-cake.jpg' },
  { id: 11, title: 'Joyful Moments', src: '/photo-album/joyful-moments.jpg' },
  { id: 12, title: 'Forever Memories', src: '/photo-album/forever-memories.jpg' },
]

export function PhotoCarouselModal({ isOpen, onClose, title = 'Photo Album' }: PhotoCarouselModalProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  // Navigate to previous photo
  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? CAROUSEL_PHOTOS.length - 1 : prev - 1))
  }

  // Navigate to next photo
  const handleNext = () => {
    setCurrentIndex((prev) => (prev === CAROUSEL_PHOTOS.length - 1 ? 0 : prev + 1))
  }

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') handlePrevious()
    if (e.key === 'ArrowRight') handleNext()
    if (e.key === 'Escape') onClose()
  }

  const currentPhoto = CAROUSEL_PHOTOS[currentIndex]

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={onClose}
          onKeyDown={handleKeyDown}
          tabIndex={0}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="relative w-full max-w-4xl bg-card border border-border rounded-3xl shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-6 right-6 z-10 p-2 bg-background/80 hover:bg-background rounded-full transition-colors"
              aria-label="Close carousel"
            >
              <X size={24} className="text-foreground" />
            </button>

            {/* Main Photo Display */}
            <div className="relative w-full aspect-video bg-background overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0"
                >
                  <Image
                    src={currentPhoto.src}
                    alt={currentPhoto.title}
                    fill
                    className="object-cover"
                    priority
                    unoptimized
                  />
                </motion.div>
              </AnimatePresence>

              {/* Left Navigation Button */}
              <button
                onClick={handlePrevious}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all hover:scale-110"
                aria-label="Previous photo"
              >
                <ChevronLeft size={28} />
              </button>

              {/* Right Navigation Button */}
              <button
                onClick={handleNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all hover:scale-110"
                aria-label="Next photo"
              >
                <ChevronRight size={28} />
              </button>

              {/* Progress Indicator */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 bg-black/50 rounded-full text-white text-sm font-semibold backdrop-blur-sm">
                {currentIndex + 1} / {CAROUSEL_PHOTOS.length}
              </div>
            </div>

            {/* Photo Information and Thumbnails */}
            <div className="p-6 bg-card border-t border-border">
              <div className="mb-4">
                <h3 className="text-xl font-bold text-foreground mb-2">{currentPhoto.title}</h3>
                <p className="text-sm text-muted-foreground">Food Critic&apos;s Album</p>
              </div>

              {/* Thumbnail Strip */}
              <div className="flex gap-2 overflow-x-auto pb-2">
                {CAROUSEL_PHOTOS.map((photo, index) => (
                  <button
                    key={photo.id}
                    onClick={() => setCurrentIndex(index)}
                    className={`relative shrink-0 h-16 w-20 rounded-lg overflow-hidden border-2 transition-all ${
                      index === currentIndex
                        ? 'border-primary shadow-lg shadow-primary/50'
                        : 'border-border hover:border-primary/50'
                    }`}
                    aria-label={`Go to photo ${index + 1}`}
                  >
                    <Image
                      src={photo.src}
                      alt={photo.title}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
