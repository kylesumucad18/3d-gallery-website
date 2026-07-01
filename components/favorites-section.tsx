'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Music, X, Maximize2 } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'

interface FavoriteCard {
  id: number
  title: string
  image: string
  description: string
}

export function FavoritesSection() {
  const [playingId, setPlayingId] = useState<number | null>(null)
  const [expandedId, setExpandedId] = useState<number | null>(null)

  const favorites: FavoriteCard[] = [
    {
      id: 1,
      title: 'Laughter and Joy',
      image: '/portfolio-1.png',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    },
    {
      id: 2,
      title: 'Precious Moments',
      image: '/portfolio-2.png',
      description: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    },
    {
      id: 3,
      title: 'Beautiful Smiles',
      image: '/portfolio-3.png',
      description: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
    },
    {
      id: 4,
      title: 'Unforgettable Times',
      image: '/portfolio-4.png',
      description: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    },
    {
      id: 5,
      title: 'Golden Hour Magic',
      image: '/portfolio-1.png',
      description: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.',
    },
    {
      id: 6,
      title: 'Special Moments',
      image: '/portfolio-2.png',
      description: 'Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores.',
    },
  ]

  const toggleMusic = (id: number) => {
    setPlayingId(playingId === id ? null : id)
  }

  return (
    <section id="favorites" className="relative py-20 md:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center flex flex-col items-center"
        >
          <p className="text-primary text-sm font-semibold uppercase tracking-widest mb-4">Favorites</p>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight text-balance">
            Moments with the Birthday Girl
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl text-center leading-relaxed">
            A curated collection of our favorite moments together. Click to explore each memory.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {favorites.map((favorite, index) => (
            <motion.div
              key={favorite.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative"
            >
              <div className="relative h-80 rounded-xl overflow-hidden border border-border hover:border-primary/50 transition-all duration-300">
                <Image
                  src={favorite.image}
                  alt={favorite.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div className="absolute inset-0 flex flex-col justify-end p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <h3 className="text-xl font-bold text-white mb-2">{favorite.title}</h3>
                  <p className="text-sm text-gray-200 mb-4 line-clamp-2">{favorite.description}</p>

                  <div className="flex gap-3">
                    <button
                      onClick={() => toggleMusic(favorite.id)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all ${
                        playingId === favorite.id
                          ? 'bg-red-500 text-white'
                          : 'bg-primary text-primary-foreground hover:bg-primary/90'
                      }`}
                    >
                      <Music size={16} />
                      {playingId === favorite.id ? 'Stop Music' : 'Start Music'}
                    </button>
                    <button
                      onClick={() => setExpandedId(favorite.id)}
                      className="flex items-center gap-2 px-4 py-2 bg-accent text-accent-foreground rounded-lg font-semibold hover:bg-accent/90 transition-all"
                    >
                      <Maximize2 size={16} />
                      View Full Screen
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Full Screen Modal */}
      <AnimatePresence>
        {expandedId && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setExpandedId(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-card rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-auto border border-border"
            >
              {favorites.map((favorite) => 
                favorite.id === expandedId ? (
                  <div key={favorite.id} className="flex flex-col md:flex-row h-full">
                    <div className="relative w-full md:w-2/3 h-80 md:h-auto">
                      <Image
                        src={favorite.image}
                        alt={favorite.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="w-full md:w-1/3 p-8 flex flex-col justify-between">
                      <div>
                        <h2 className="text-3xl font-bold text-foreground mb-4">{favorite.title}</h2>
                        <p className="text-muted-foreground leading-relaxed mb-6">{favorite.description}</p>
                      </div>
                      <div className="flex flex-col gap-3">
                        <button
                          onClick={() => toggleMusic(favorite.id)}
                          className={`flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all ${
                            playingId === favorite.id
                              ? 'bg-red-500 text-white'
                              : 'bg-primary text-primary-foreground hover:bg-primary/90'
                          }`}
                        >
                          <Music size={18} />
                          {playingId === favorite.id ? 'Stop Music' : 'Start Music'}
                        </button>
                        <button
                          onClick={() => setExpandedId(null)}
                          className="flex items-center justify-center gap-2 px-6 py-3 border border-border text-foreground rounded-lg font-semibold hover:bg-muted transition-all"
                        >
                          <X size={18} />
                          Close
                        </button>
                      </div>
                    </div>
                  </div>
                ) : null
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
