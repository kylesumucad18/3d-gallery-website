'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

// Using existing portfolio images and may/june images as a placeholder for "Recent" photos
const recentPhotos = [
  { id: 1, src: '/portfolio-1.png', aspect: 'aspect-[3/4]' },
  { id: 2, src: '/portfolio-2.png', aspect: 'aspect-[4/3]' },
  { id: 3, src: '/portfolio-3.png', aspect: 'aspect-square' },
  { id: 4, src: '/portfolio-4.png', aspect: 'aspect-[3/5]' },
  { id: 5, src: '/may/1.png', aspect: 'aspect-[4/3]' },
  { id: 6, src: '/june/1.png', aspect: 'aspect-[3/4]' },
  { id: 7, src: '/portfolio-1.png', aspect: 'aspect-[16/9]' },
  { id: 8, src: '/portfolio-2.png', aspect: 'aspect-square' },
  { id: 9, src: '/portfolio-3.png', aspect: 'aspect-[3/4]' },
  { id: 10, src: '/portfolio-4.png', aspect: 'aspect-[4/3]' },
]

export default function RecentPicturesPage() {
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
            A dynamic collection of our latest adventures, unfiltered and unforgettable.
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-transparent mt-8" />
        </motion.div>

        {/* Masonry Layout via CSS Columns */}
        <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
          {recentPhotos.map((photo, index) => (
            <motion.div
              key={photo.id}
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
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
          ))}
        </div>
      </div>
    </main>
  )
}
