'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, X, ChevronLeft, ChevronRight } from 'lucide-react'

interface Photo {
  id: number
  src: string
  aspect: string
}

export function RecentGallery({ photos }: { photos: Photo[] }) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (selectedIndex !== null) {
      setSelectedIndex((selectedIndex + 1) % photos.length)
    }
  }

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (selectedIndex !== null) {
      setSelectedIndex((selectedIndex - 1 + photos.length) % photos.length)
    }
  }

  const handleClose = () => {
    setSelectedIndex(null)
  }

  return (
    <main className="min-h-screen bg-background py-24 px-6 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors font-semibold mb-8 group"
          >
            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
            Back to Timeline
          </Link>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-foreground mb-4 tracking-tight">
            Recent Moments
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl">
            Thank you baby, hoping to have more pictures and memories with you :)
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-transparent mt-8" />
        </motion.div>

        {/* Masonry Layout via CSS Columns */}
        <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
          {photos.length > 0 ? (
            photos.map((photo, index) => (
              <motion.div
                key={photo.id}
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                onClick={() => setSelectedIndex(index)}
                className="break-inside-avoid relative group rounded-2xl overflow-hidden shadow-md hover:shadow-xl hover:shadow-primary/20 transition-all cursor-pointer"
              >
                <div className={`relative w-full ${photo.aspect}`}>
                  <Image
                    src={photo.src}
                    alt={`Recent memory ${photo.id}`}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </motion.div>
            ))
          ) : (
            <p className="text-muted-foreground col-span-full">No recent moments yet. Add some images to the public/rp folder to see them here!</p>
          )}
        </div>
      </div>

      {/* Fullscreen Lightbox Modal */}
      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-sm p-4 md:p-8"
          >
            {/* Close Button */}
            <button
              onClick={handleClose}
              className="absolute top-6 right-6 p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors z-[110]"
            >
              <X size={24} />
            </button>

            {/* Previous Button */}
            <button
              onClick={handlePrev}
              className="absolute left-4 md:left-8 p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors z-[110]"
            >
              <ChevronLeft size={32} />
            </button>

            {/* Next Button */}
            <button
              onClick={handleNext}
              className="absolute right-4 md:right-8 p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors z-[110]"
            >
              <ChevronRight size={32} />
            </button>

            {/* Image Container */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative w-full h-full max-w-7xl max-h-screen flex items-center justify-center"
              onClick={(e) => e.stopPropagation()} // Prevent clicking image from closing
            >
              <Image
                src={photos[selectedIndex].src}
                alt={`Fullscreen memory ${photos[selectedIndex].id}`}
                fill
                className="object-contain"
                priority
                quality={100}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  )
}
