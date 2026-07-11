'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

import Image from 'next/image'
import Link from 'next/link'
import { VerificationModal } from './verification-modal'
import { PhotoCarouselModal } from './photo-carousel-modal'
import dynamicPhotos from '../public/photos.json'

// ============================================================================
// 📸 HOW TO CHANGE PHOTOS:
// 1. Add your new image files to the `public` folder in your project
// 2. Change the `image` path below to match your filename (e.g., '/my-photo.jpg')
// ============================================================================
const monthCards = [
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
    description: 'Springtime joys',
    image: '/portfolio-4.png',
    color: 'from-green-600 to-emerald-600',
  },
  {
    id: 5,
    title: 'May',
    description: 'Warmth and smiles',
    image: '/may/1.png',
    color: 'from-violet-600 to-purple-600',
  },
  {
    id: 6,
    title: 'June',
    description: 'Summer adventures',
    image: '/june/1.png',
    color: 'from-yellow-600 to-amber-600',
  },
]

export function PortfolioSection() {
  const [hoveredId, setHoveredId] = useState<number | null>(null)
  const [isVerified, setIsVerified] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [expandedMonth, setExpandedMonth] = useState<string | null>(null)

  const currentIndex = expandedMonth ? monthCards.findIndex(m => m.title === expandedMonth) : -1
  const prevMonth = currentIndex > 0 ? monthCards[currentIndex - 1] : null
  const nextMonth = currentIndex !== -1 && currentIndex < monthCards.length - 1 ? monthCards[currentIndex + 1] : null

  useEffect(() => {
    const verified = localStorage.getItem('verified_portfolio') === 'true'
    setIsVerified(verified)
    if (!verified) {
      setShowModal(true)
    }
  }, [])

  const handleVerificationSuccess = () => {
    setIsVerified(true)
    setShowModal(false)
  }

  return (
    <section id="history" className="relative py-24 px-6 bg-background overflow-hidden">
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
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-6 leading-relaxed">
            A beautiful journey through our shared moments. Each month brings a new story, a new smile, and memories we'll cherish forever.
          </p>
          <div className="w-16 h-1 bg-gradient-to-r from-transparent via-primary to-transparent mx-auto" />
        </motion.div>

        {!isVerified ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16"
          >
            <p className="text-muted-foreground mb-4">Answer the verification question to view this section</p>
            <button
              onClick={() => setShowModal(true)}
              className="px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition-colors"
            >
              Verify to Continue
            </button>
          </motion.div>
        ) : (
          <div className="space-y-12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {monthCards.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  onMouseEnter={() => setHoveredId(item.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  onClick={() => setExpandedMonth(item.title)}
                  className="group cursor-pointer relative overflow-hidden rounded-xl aspect-[4/5] hover:scale-[1.02] hover:brightness-110 hover:shadow-2xl hover:shadow-primary/20 transition-all duration-300"
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
                    <span 
                      className="inline-block px-6 py-2 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition-colors"
                    >
                      View Collection
                    </span>
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

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex justify-center"
            >
              <Link
                href="/recent"
                className="group relative px-8 py-4 bg-primary text-primary-foreground font-bold rounded-xl overflow-hidden shadow-xl hover:shadow-primary/30 transition-all active:scale-95 flex items-center gap-3"
              >
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                <span className="relative z-10">View Our Recent Pictures</span>
                <svg className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            </motion.div>
          </div>
        )}

        <VerificationModal
          isOpen={showModal}
          question="How many vowels are there in my name?"
          correctAnswers={['9', 'nine']}
          sectionId="portfolio"
          onSuccess={handleVerificationSuccess}
          onClose={() => setShowModal(false)}
        />

        <PhotoCarouselModal 
          isOpen={!!expandedMonth}
          onClose={() => setExpandedMonth(null)}
          title={expandedMonth === 'Recent' ? 'Recent pictures together' : (expandedMonth ? monthCards.find(m => m.title === expandedMonth)?.description : '')}
          photos={expandedMonth ? (dynamicPhotos[expandedMonth] || []) : undefined}
          monthName={expandedMonth || undefined}
          prevMonthName={expandedMonth === 'Recent' ? null : (prevMonth?.title || null)}
          nextMonthName={expandedMonth === 'Recent' ? null : (nextMonth?.title || null)}
          onNavigate={(monthName) => setExpandedMonth(monthName)}
        />
      </div>
    </section>
  )
}
