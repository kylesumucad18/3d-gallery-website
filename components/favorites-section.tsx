'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Music, X, Maximize2, ChevronLeft, ChevronRight } from 'lucide-react'
import Image from 'next/image'
import { useState, useRef, useEffect } from 'react'

interface FavoriteCard {
  id: number
  title: string
  image: string
  description: string
}

export function FavoritesSection() {
  const [playingId, setPlayingId] = useState<number | null>(null)
  const [expandedId, setExpandedId] = useState<number | null>(null)
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(0)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    setSelectedPhotoIndex(0)
  }, [expandedId])

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
      }
    }
  }, [])

  // ============================================================================
  // 📸 HOW TO CHANGE PHOTOS:
  // 1. Add your new image files to the `public` folder in your project
  // 2. Change the `image` path below to match your filename (e.g., '/my-photo.jpg')
  // ============================================================================
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
  ]

  const toggleMusic = (id: number) => {
    if (playingId === id) {
      if (audioRef.current) {
        audioRef.current.pause()
      }
      setPlayingId(null)
    } else {
      if (audioRef.current) {
        audioRef.current.pause()
      }
      const newAudio = new Audio(`/music-${id}.mp3`)
      audioRef.current = newAudio
      newAudio.play().catch(e => {
        console.log("Audio file not found or couldn't play:", e)
      })
      setPlayingId(id)

      newAudio.onended = () => {
        setPlayingId(null)
      }
    }
  }

  const currentIndex = expandedId ? favorites.findIndex(f => f.id === expandedId) : -1
  const prevFavorite = currentIndex > 0 ? favorites[currentIndex - 1] : null
  const nextFavorite = currentIndex !== -1 && currentIndex < favorites.length - 1 ? favorites[currentIndex + 1] : null

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
            A curated collection of our favorite moments together. <br></br> Click to explore each memory.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {favorites.map((favorite, index) => (
            <motion.div
              key={favorite.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative"
            >
              <div className="relative h-[400px] rounded-xl overflow-hidden border border-border hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/20 transition-all duration-300">
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
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all ${playingId === favorite.id
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
            className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex items-center justify-center overflow-hidden px-4 md:px-0"
            onClick={() => setExpandedId(null)}
          >
            {/* Previous Card (Blurry) */}
            {prevFavorite && (
              <div
                onClick={(e) => { e.stopPropagation(); setExpandedId(prevFavorite.id); }}
                className="absolute left-0 top-0 bottom-0 w-16 md:w-[15%] xl:w-[20%] flex items-center justify-start group cursor-pointer z-0 overflow-hidden"
              >
                <div className="hidden md:block absolute left-[-50%] top-1/2 -translate-y-1/2 w-[200%] aspect-video opacity-30 group-hover:opacity-70 blur-md group-hover:blur-sm transition-all duration-700 ease-in-out rounded-3xl overflow-hidden scale-90 shadow-[0_0_40px_rgba(0,0,0,0.8)]">
                  <Image src={prevFavorite.image} fill className="object-cover" alt="Previous" unoptimized />
                </div>
                <div className="hidden md:flex items-center relative z-10 ml-4 md:ml-8 transition-all duration-700 ease-in-out group-hover:translate-x-2">
                  <ChevronLeft size={80} className="text-white/40 group-hover:text-white transition-all duration-700 drop-shadow-[0_0_10px_rgba(255,255,255,0.3)] group-hover:drop-shadow-[0_0_20px_rgba(255,255,255,0.8)] shrink-0" />
                  <div className="flex flex-col ml-2 text-white/40 group-hover:text-white transition-all duration-700 drop-shadow-[0_0_10px_rgba(255,255,255,0.3)] group-hover:drop-shadow-[0_0_20px_rgba(255,255,255,0.8)]">
                    <span className="text-xs font-bold tracking-widest uppercase">Previous</span>
                    <span className="text-xl font-bold line-clamp-1">{prevFavorite.title}</span>
                  </div>
                </div>
                {/* Mobile Arrow */}
                <ChevronLeft size={32} className="md:hidden text-white/80 ml-2 relative z-10 bg-black/40 rounded-full p-1" />
              </div>
            )}

            {/* Next Card (Blurry) */}
            {nextFavorite && (
              <div
                onClick={(e) => { e.stopPropagation(); setExpandedId(nextFavorite.id); }}
                className="absolute right-0 top-0 bottom-0 w-16 md:w-[15%] xl:w-[20%] flex items-center justify-end group cursor-pointer z-0 overflow-hidden"
              >
                <div className="hidden md:block absolute right-[-50%] top-1/2 -translate-y-1/2 w-[200%] aspect-video opacity-30 group-hover:opacity-70 blur-md group-hover:blur-sm transition-all duration-700 ease-in-out rounded-3xl overflow-hidden scale-90 shadow-[0_0_40px_rgba(0,0,0,0.8)]">
                  <Image src={nextFavorite.image} fill className="object-cover" alt="Next" unoptimized />
                </div>
                <div className="hidden md:flex items-center relative z-10 mr-4 md:mr-8 transition-all duration-700 ease-in-out group-hover:-translate-x-2">
                  <div className="flex flex-col mr-2 text-white/40 group-hover:text-white transition-all duration-700 drop-shadow-[0_0_10px_rgba(255,255,255,0.3)] group-hover:drop-shadow-[0_0_20px_rgba(255,255,255,0.8)] text-right">
                    <span className="text-xs font-bold tracking-widest uppercase">Next</span>
                    <span className="text-xl font-bold line-clamp-1">{nextFavorite.title}</span>
                  </div>
                  <ChevronRight size={80} className="text-white/40 group-hover:text-white transition-all duration-700 drop-shadow-[0_0_10px_rgba(255,255,255,0.3)] group-hover:drop-shadow-[0_0_20px_rgba(255,255,255,0.8)] shrink-0" />
                </div>
                {/* Mobile Arrow */}
                <ChevronRight size={32} className="md:hidden text-white/80 mr-2 relative z-10 bg-black/40 rounded-full p-1" />
              </div>
            )}

            <AnimatePresence mode="wait">
              {favorites.map((favorite) =>
                favorite.id === expandedId ? (
                  <motion.div
                    key={favorite.id}
                    initial={{ opacity: 0, filter: 'blur(8px)', scale: 0.95 }}
                    animate={{ opacity: 1, filter: 'blur(0px)', scale: 1 }}
                    exit={{ opacity: 0, filter: 'blur(8px)', scale: 0.95 }}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                    onClick={(e) => e.stopPropagation()}
                    /* ADJUST FULL SCREEN MODAL SIZE HERE: Change max-w-7xl and min-h-[70vh] to your preferred dimensions */
                    className="relative z-10 bg-card rounded-3xl max-w-7xl w-[95vw] min-h-[70vh] md:h-[80vh] overflow-hidden border border-border shadow-2xl flex flex-col md:flex-row"
                  >
                    <div className="relative w-full md:w-[60%] h-80 md:h-full min-h-[400px]">
                      <Image
                        src={selectedPhotoIndex === 0 ? favorite.image : `/favorites/${favorite.id}/${selectedPhotoIndex + 1}.png`}
                        alt={favorite.title}
                        fill
                        className="object-cover"
                        unoptimized
                      />
                    </div>
                    <div className="w-full md:w-[40%] p-8 md:p-12 flex flex-col justify-between bg-card overflow-y-auto">
                      <div>
                        <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">{favorite.title}</h2>
                        <p className="text-lg text-muted-foreground leading-relaxed mb-8">{favorite.description}</p>
                      </div>

                      {/* 5 Small Images (Thumbnails) */}
                      <div className="grid grid-cols-5 gap-2 mb-8">
                        {[
                          favorite.image, // Thumbnail 1 (Cover)
                          `/favorites/${favorite.id}/2.png`,
                          `/favorites/${favorite.id}/3.png`,
                          `/favorites/${favorite.id}/4.png`,
                          `/favorites/${favorite.id}/5.png`
                        ].map((src, idx) => (
                          <button
                            key={idx}
                            onClick={() => setSelectedPhotoIndex(idx)}
                            className={`relative w-full aspect-square rounded-lg overflow-hidden border-2 transition-all ${selectedPhotoIndex === idx
                                ? 'border-primary shadow-md shadow-primary/40 scale-105'
                                : 'border-border hover:border-primary/50'
                              }`}
                          >
                            <Image src={src} alt={`Thumbnail ${idx + 1}`} fill className="object-cover" unoptimized />
                          </button>
                        ))}
                      </div>

                      <div className="flex flex-col gap-3 mt-auto">
                        <button
                          onClick={() => toggleMusic(favorite.id)}
                          className={`flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all ${playingId === favorite.id
                              ? 'bg-red-500 text-white shadow-lg shadow-red-500/20'
                              : 'bg-primary text-primary-foreground hover:bg-primary/90'
                            }`}
                        >
                          <Music size={18} />
                          {playingId === favorite.id ? 'Stop Music' : 'Start Music'}
                        </button>
                        <button
                          onClick={() => setExpandedId(null)}
                          className="flex items-center justify-center gap-2 px-6 py-3 border border-border text-foreground rounded-xl font-semibold hover:bg-muted transition-all"
                        >
                          <X size={18} />
                          Close
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ) : null
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
