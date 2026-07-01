'use client'

import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Camera, X, Download, RotateCcw, Settings } from 'lucide-react'
import Link from 'next/link'

interface PhotoboothLayoutProps {
  layout: 'M' | 'A' | 'R' | 'I' | 'E'
  theme: 'minimalistic' | 'coquette'
}

export function PhotoboothLayout({ layout, theme }: PhotoboothLayoutProps) {
  const [cameraActive, setCameraActive] = useState(false)
  const [photos, setPhotos] = useState<string[]>([])
  const [showThemeSelector, setShowThemeSelector] = useState(true)
  const [selectedTheme, setSelectedTheme] = useState(theme)
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const layoutConfig = {
    M: { count: 3, grid: 'grid-cols-3', title: 'Layout M - Three Pictures, Three Poses' },
    A: { count: 2, grid: 'grid-cols-2', title: 'Layout A - Two Pictures, Two Poses' },
    R: { count: 4, grid: 'grid-cols-2', title: 'Layout R - Four Pictures, Four Poses' },
    I: { count: 4, grid: 'grid-cols-2', title: 'Layout I - One Picture, Four Filters' },
    E: { count: 6, grid: 'grid-cols-3', title: 'Layout E - Six Pictures, Six Poses' },
  }

  const config = layoutConfig[layout]

  useEffect(() => {
    if (cameraActive && videoRef.current) {
      navigator.mediaDevices
        .getUserMedia({ video: { facingMode: 'user' } })
        .then((stream) => {
          if (videoRef.current) {
            videoRef.current.srcObject = stream
          }
        })
        .catch((err) => {
          console.error('Error accessing camera:', err)
          alert('Camera access denied. Please allow camera permissions.')
          setCameraActive(false)
        })
    }

    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const tracks = (videoRef.current.srcObject as MediaStream).getTracks()
        tracks.forEach((track) => track.stop())
      }
    }
  }, [cameraActive])

  const capturePhoto = () => {
    if (canvasRef.current && videoRef.current) {
      const ctx = canvasRef.current.getContext('2d')
      if (ctx) {
        ctx.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height)
        const photoData = canvasRef.current.toDataURL('image/png')
        setPhotos([...photos, photoData])
      }
    }
  }

  const downloadPhotos = () => {
    if (photos.length === 0) return

    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const photoWidth = 400
    const photoHeight = 300

    if (layout === 'M') {
      canvas.width = photoWidth * 3
      canvas.height = photoHeight
      photos.forEach((photo, idx) => {
        const img = new Image()
        img.onload = () => {
          ctx.drawImage(img, idx * photoWidth, 0, photoWidth, photoHeight)
        }
        img.src = photo
      })
    } else if (layout === 'A') {
      canvas.width = photoWidth * 2
      canvas.height = photoHeight
      photos.forEach((photo, idx) => {
        const img = new Image()
        img.onload = () => {
          ctx.drawImage(img, idx * photoWidth, 0, photoWidth, photoHeight)
        }
        img.src = photo
      })
    } else {
      canvas.width = photoWidth * 2
      canvas.height = photoHeight * 2
      photos.forEach((photo, idx) => {
        const img = new Image()
        img.onload = () => {
          const row = Math.floor(idx / 2)
          const col = idx % 2
          ctx.drawImage(img, col * photoWidth, row * photoHeight, photoWidth, photoHeight)
        }
        img.src = photo
      })
    }

    setTimeout(() => {
      const link = document.createElement('a')
      link.href = canvas.toDataURL('image/png')
      link.download = `photobooth-${layout}-${Date.now()}.png`
      link.click()
    }, 100)
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <div className="bg-card border-b border-border p-6">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-foreground">{config.title}</h1>
            <p className="text-muted-foreground mt-1">
              Photos captured: {photos.length}/{config.count}
            </p>
          </div>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-4 py-2 border border-border text-foreground rounded-lg hover:bg-muted transition-colors"
          >
            <X size={18} />
            Exit
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="max-w-6xl w-full">
          {showThemeSelector && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8 p-6 rounded-xl bg-card border border-border"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-foreground mb-2">Choose Your Theme</h2>
                  <p className="text-muted-foreground">Select a color theme for your photobooth experience</p>
                </div>
                <button
                  onClick={() => setShowThemeSelector(false)}
                  className="px-4 py-2 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors"
                >
                  Continue
                </button>
              </div>
              <div className="flex gap-4 mt-4">
                <button
                  onClick={() => setSelectedTheme('minimalistic')}
                  className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                    selectedTheme === 'minimalistic'
                      ? 'bg-blue-500 text-white'
                      : 'bg-muted text-foreground hover:bg-muted/80'
                  }`}
                >
                  Minimalistic (Blue)
                </button>
                <button
                  onClick={() => setSelectedTheme('coquette')}
                  className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                    selectedTheme === 'coquette'
                      ? 'bg-pink-500 text-white'
                      : 'bg-muted text-foreground hover:bg-muted/80'
                  }`}
                >
                  Coquette (Pink)
                </button>
              </div>
            </motion.div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Camera View */}
            <div className="lg:col-span-2">
              {!cameraActive ? (
                <motion.button
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  onClick={() => setCameraActive(true)}
                  className="w-full aspect-video bg-muted rounded-xl border-2 border-dashed border-primary/50 hover:border-primary transition-colors flex flex-col items-center justify-center gap-4 cursor-pointer group"
                >
                  <div className="p-4 bg-primary/20 rounded-lg group-hover:bg-primary/30 transition-colors">
                    <Camera className="text-primary" size={40} />
                  </div>
                  <div className="text-center">
                    <p className="text-foreground font-semibold text-lg">Click to Start Camera</p>
                    <p className="text-muted-foreground text-sm">Allow camera access to begin</p>
                  </div>
                </motion.button>
              ) : (
                <div className="relative w-full aspect-video bg-black rounded-xl overflow-hidden border-2 border-primary">
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    className="w-full h-full object-cover"
                  />
                  <canvas
                    ref={canvasRef}
                    width={640}
                    height={480}
                    className="hidden"
                  />

                  <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-4">
                    <button
                      onClick={capturePhoto}
                      disabled={photos.length >= config.count}
                      className="px-8 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                    >
                      <Camera size={18} />
                      Capture {photos.length + 1}/{config.count}
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Preview & Controls */}
            <div className="space-y-6">
              <div className="p-6 bg-card rounded-xl border border-border">
                <h3 className="text-lg font-bold text-foreground mb-4">Preview</h3>
                <div className={`grid ${config.grid} gap-2 mb-6 max-h-96 overflow-y-auto`}>
                  {photos.map((photo, idx) => (
                    <motion.img
                      key={idx}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      src={photo}
                      alt={`Photo ${idx + 1}`}
                      className="w-full h-auto rounded-lg border border-border cursor-pointer hover:border-primary transition-colors"
                      onClick={() => setPhotos(photos.filter((_, i) => i !== idx))}
                      title="Click to remove"
                    />
                  ))}
                  {Array.from({ length: config.count - photos.length }).map((_, idx) => (
                    <div
                      key={`empty-${idx}`}
                      className="aspect-square bg-muted rounded-lg border-2 border-dashed border-muted-foreground/30 flex items-center justify-center"
                    >
                      <span className="text-xs text-muted-foreground">{photos.length + idx + 1}</span>
                    </div>
                  ))}
                </div>

                <div className="space-y-3">
                  <button
                    onClick={() => {
                      setCameraActive(false)
                      setPhotos([])
                    }}
                    className="w-full px-4 py-2 border border-border text-foreground rounded-lg hover:bg-muted transition-colors flex items-center justify-center gap-2"
                  >
                    <RotateCcw size={16} />
                    Restart
                  </button>
                  <button
                    onClick={downloadPhotos}
                    disabled={photos.length === 0}
                    className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-semibold flex items-center justify-center gap-2"
                  >
                    <Download size={16} />
                    Download
                  </button>
                </div>
              </div>

              {/* Info */}
              <div className="p-4 bg-primary/10 rounded-lg border border-primary/20">
                <p className="text-sm text-muted-foreground">
                  <strong className="text-foreground">Tip:</strong> Capture {config.count} photos for the perfect {layout} layout. Click preview photos to remove them.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
