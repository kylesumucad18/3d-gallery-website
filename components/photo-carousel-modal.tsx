'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import Image from 'next/image'

interface PhotoCarouselModalProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  photos?: { id: number | string; title: string; src: string }[]
  monthName?: string
  prevMonthName?: string | null
  nextMonthName?: string | null
  onNavigate?: (monthName: string) => void
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

export function PhotoCarouselModal({ 
  isOpen, 
  onClose, 
  title = 'Photo Album', 
  photos,
  monthName,
  prevMonthName,
  nextMonthName,
  onNavigate
}: PhotoCarouselModalProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const activePhotos = photos && photos.length > 0 ? photos : CAROUSEL_PHOTOS

  // Reset index when month changes
  useEffect(() => {
    setCurrentIndex(0)
  }, [monthName])

  // Navigate to previous photo
  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? activePhotos.length - 1 : prev - 1))
  }

  // Navigate to next photo
  const handleNext = () => {
    setCurrentIndex((prev) => (prev === activePhotos.length - 1 ? 0 : prev + 1))
  }

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') handlePrevious()
    if (e.key === 'ArrowRight') handleNext()
    if (e.key === 'Escape') onClose()
  }

  const currentPhoto = activePhotos[currentIndex]

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-50 overflow-hidden px-4 md:px-0"
          onKeyDown={handleKeyDown}
          tabIndex={0}
          onClick={onClose}
        >
          {/* Previous Month Card (Blurry) */}
          {prevMonthName && (
            <div 
              onClick={(e) => { e.stopPropagation(); if (onNavigate) onNavigate(prevMonthName); }}
              className="absolute left-0 top-0 bottom-0 w-16 md:w-[15%] xl:w-[20%] flex items-center justify-start group cursor-pointer z-0 overflow-hidden"
            >
              <div className="hidden md:block absolute left-[-50%] top-1/2 -translate-y-1/2 w-[200%] aspect-video opacity-30 group-hover:opacity-70 blur-md group-hover:blur-sm transition-all duration-700 ease-in-out rounded-3xl overflow-hidden scale-90 shadow-[0_0_40px_rgba(0,0,0,0.8)]">
                 <Image src={`/${prevMonthName.toLowerCase()}/1.png`} fill className="object-cover" alt="Previous" unoptimized />
              </div>
              <div className="hidden md:flex items-center relative z-10 ml-4 md:ml-8 transition-all duration-700 ease-in-out group-hover:translate-x-2">
                <ChevronLeft size={80} className="text-white/40 group-hover:text-white transition-all duration-700 drop-shadow-[0_0_10px_rgba(255,255,255,0.3)] group-hover:drop-shadow-[0_0_20px_rgba(255,255,255,0.8)] shrink-0" />
                <div className="flex flex-col ml-2 text-white/40 group-hover:text-white transition-all duration-700 drop-shadow-[0_0_10px_rgba(255,255,255,0.3)] group-hover:drop-shadow-[0_0_20px_rgba(255,255,255,0.8)]">
                  <span className="text-xs font-bold tracking-widest uppercase">Previous Month</span>
                  <span className="text-xl font-bold">{prevMonthName}</span>
                </div>
              </div>
              {/* Mobile Arrow */}
              <ChevronLeft size={32} className="md:hidden text-white/80 ml-2 relative z-10 bg-black/40 rounded-full p-1" />
            </div>
          )}

          {/* Next Month Card (Blurry) */}
          {nextMonthName && (
            <div 
              onClick={(e) => { e.stopPropagation(); if (onNavigate) onNavigate(nextMonthName); }}
              className="absolute right-0 top-0 bottom-0 w-16 md:w-[15%] xl:w-[20%] flex items-center justify-end group cursor-pointer z-0 overflow-hidden"
            >
              <div className="hidden md:block absolute right-[-50%] top-1/2 -translate-y-1/2 w-[200%] aspect-video opacity-30 group-hover:opacity-70 blur-md group-hover:blur-sm transition-all duration-700 ease-in-out rounded-3xl overflow-hidden scale-90 shadow-[0_0_40px_rgba(0,0,0,0.8)]">
                 <Image src={`/${nextMonthName.toLowerCase()}/1.png`} fill className="object-cover" alt="Next" unoptimized />
              </div>
              <div className="hidden md:flex items-center relative z-10 mr-4 md:mr-8 transition-all duration-700 ease-in-out group-hover:-translate-x-2">
                <div className="flex flex-col mr-2 text-white/40 group-hover:text-white transition-all duration-700 drop-shadow-[0_0_10px_rgba(255,255,255,0.3)] group-hover:drop-shadow-[0_0_20px_rgba(255,255,255,0.8)] text-right">
                  <span className="text-xs font-bold tracking-widest uppercase">Next Month</span>
                  <span className="text-xl font-bold">{nextMonthName}</span>
                </div>
                <ChevronRight size={80} className="text-white/40 group-hover:text-white transition-all duration-700 drop-shadow-[0_0_10px_rgba(255,255,255,0.3)] group-hover:drop-shadow-[0_0_20px_rgba(255,255,255,0.8)] shrink-0" />
              </div>
              {/* Mobile Arrow */}
              <ChevronRight size={32} className="md:hidden text-white/80 mr-2 relative z-10 bg-black/40 rounded-full p-1" />
            </div>
          )}

          <AnimatePresence mode="wait">
            <motion.div
              key={monthName}
              initial={{ opacity: 0, filter: 'blur(8px)', scale: 0.95 }}
              animate={{ opacity: 1, filter: 'blur(0px)', scale: 1 }}
              exit={{ opacity: 0, filter: 'blur(8px)', scale: 0.95 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="relative z-10 bg-card rounded-3xl max-w-7xl w-[95vw] min-h-[70vh] md:h-[80vh] overflow-hidden border border-border shadow-2xl flex flex-col md:flex-row"
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
            <div className="relative w-full md:w-[60%] h-80 md:h-full min-h-[400px] bg-background overflow-hidden">
              {monthName && (
                <div className="absolute top-6 left-6 z-30 pointer-events-none">
                  <h1 className="text-4xl md:text-5xl font-black text-white drop-shadow-[0_4px_8px_rgba(0,0,0,0.6)] tracking-tight">
                    {monthName}
                  </h1>
                </div>
              )}
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

              {/* Removed Navigation Buttons as requested */}

              {/* Progress Indicator */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 bg-black/50 rounded-full text-white text-sm font-semibold backdrop-blur-sm">
                {currentIndex + 1} / {activePhotos.length}
              </div>
            </div>

            {/* Photo Information and Thumbnails */}
            <div className="w-full md:w-[40%] p-8 md:p-12 flex flex-col justify-between bg-card overflow-y-auto">
              <div className="mb-8">
                <h3 className="text-3xl md:text-4xl font-bold text-foreground mb-4">{currentPhoto.title}</h3>
                <p className="text-lg text-muted-foreground leading-relaxed">{title}</p>
              </div>

              {/* Thumbnail Grid */}
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 mt-auto">
                {activePhotos.map((photo, index) => (
                  <button
                    key={photo.id}
                    onClick={() => setCurrentIndex(index)}
                    className={`relative w-full aspect-square rounded-xl overflow-hidden border-2 transition-all ${
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
        </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
