'use client'

import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Camera, X, Download, RotateCcw, Type, PenTool, Eraser, Trash2 } from 'lucide-react'
import Link from 'next/link'
import { ImageColorPicker } from './image-color-picker'
import { DrawingCanvas } from './drawing-canvas'

interface PhotoboothLayoutProps {
  layout: 'M' | 'A' | 'R' | 'I' | 'E' | 'H'
  theme: 'minimalistic' | 'coquette'
}

type LayoutType = 'strip-3' | 'strip-4' | '4R-split' | '4R-grid'

const PRESET_DOODLES = [
  { id: 'rabbit', label: 'Rabbit', emoji: '🐇' },
  { id: 'peacock', label: 'Peacock', emoji: '🦚' },
  { id: 'giraffe', label: 'Giraffe', emoji: '🦒' },
  { id: 'lion', label: 'Lion', emoji: '🦁' },
  { id: 'eagle', label: 'Eagle', emoji: '🦅' },
  { id: 'dinosaur', label: 'Dinosaur', emoji: '🦖' }
]

const getLayoutConfig = (layout: string) => {
  switch (layout) {
    case 'M':
    case 'A':
      return { count: 3, type: 'strip-3' as LayoutType, title: `Layout ${layout} - 6x2 (Strip) 3 Pose` }
    case 'R':
    case 'I':
      return { count: 4, type: 'strip-4' as LayoutType, title: `Layout ${layout} - 6x2 (Strip) 4 Pose` }
    case 'E':
      return { count: 4, type: '4R-split' as LayoutType, title: 'Layout E - 6x4 (4R) 4 Pose' }
    case 'H':
      return { count: 4, type: '4R-grid' as LayoutType, title: 'Layout H - 6x4 (4R) 4 Pose (Grid)' }
    default:
      return { count: 3, type: 'strip-3' as LayoutType, title: 'Layout M - 6x2 (Strip) 3 Pose' }
  }
}

function PreviewCanvas({ layout, photos, customColor, count }: { layout: LayoutType, photos: string[], customColor: string, count: number }) {
  const emptyBoxes = Array.from({ length: count - photos.length })

  if (layout === 'strip-3' || layout === 'strip-4') {
    return (
      <div className="w-48 mx-auto p-4 shadow-xl border border-border" style={{ backgroundColor: customColor }}>
        <div className="flex flex-col gap-3">
          {photos.map((p, i) => (
            <img key={i} src={p} alt="pose" className="w-full aspect-[4/3] object-cover bg-black" />
          ))}
          {emptyBoxes.map((_, i) => (
            <div key={`e-${i}`} className="w-full aspect-[4/3] bg-black/20 flex items-center justify-center border border-dashed border-black/30">
              <span className="text-sm font-bold opacity-50">{photos.length + i + 1}</span>
            </div>
          ))}
        </div>
        <div className="mt-6 mb-2 text-center text-white/90">
          <div className="font-bold text-lg">Title</div>
          <div className="text-xs italic">Subtitle</div>
        </div>
      </div>
    )
  }

  if (layout === '4R-split') {
    return (
      <div className="w-full aspect-[3/2] p-4 shadow-xl border border-border flex flex-col gap-3" style={{ backgroundColor: customColor }}>
        <div className="flex gap-3 h-3/5">
          <div className="w-2/3 h-full bg-black/20 relative overflow-hidden">
            {photos[0] ? <img src={photos[0]} alt="pose" className="w-full h-full object-cover" /> : <div className="absolute inset-0 flex items-center justify-center font-bold opacity-50 border border-dashed border-black/30">1</div>}
          </div>
          <div className="w-1/3 flex flex-col justify-center items-center text-white/90 p-2 text-center">
            <div className="font-bold text-xl">Title</div>
            <div className="text-sm italic">Subtitle</div>
          </div>
        </div>
        <div className="flex gap-3 h-2/5">
          {[1, 2, 3].map((idx) => (
            <div key={idx} className="flex-1 h-full bg-black/20 relative overflow-hidden">
              {photos[idx] ? <img src={photos[idx]} alt="pose" className="w-full h-full object-cover" /> : <div className="absolute inset-0 flex items-center justify-center font-bold opacity-50 border border-dashed border-black/30">{idx + 1}</div>}
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (layout === '4R-grid') {
    return (
      <div className="w-full aspect-[3/2] p-4 shadow-xl border border-border flex flex-col justify-between" style={{ backgroundColor: customColor }}>
        <div className="grid grid-cols-2 gap-3 h-[80%]">
          {[0, 1, 2, 3].map((idx) => (
            <div key={idx} className="bg-black/20 relative overflow-hidden">
              {photos[idx] ? <img src={photos[idx]} alt="pose" className="w-full h-full object-cover" /> : <div className="absolute inset-0 flex items-center justify-center font-bold opacity-50 border border-dashed border-black/30">{idx + 1}</div>}
            </div>
          ))}
        </div>
        <div className="h-[15%] flex justify-between items-end px-4 text-white/90">
          <div className="text-sm italic">Subtitle</div>
          <div className="font-bold text-xl">Title</div>
        </div>
      </div>
    )
  }

  return null
}

export function PhotoboothLayout({ layout, theme }: PhotoboothLayoutProps) {
  const [cameraActive, setCameraActive] = useState(false)
  const [photos, setPhotos] = useState<string[]>([])
  const [showThemeSelector, setShowThemeSelector] = useState(true)
  const [customColor, setCustomColor] = useState(theme === 'coquette' ? '#FBCFE8' : theme === 'medtech' ? '#0EA5E9' : '#E6C27A')
  const [titleText, setTitleText] = useState('Rica Marie')
  const [subtitleText, setSubtitleText] = useState('Happy Birthday!')
  const [doodleDataUrls, setDoodleDataUrls] = useState<(string | null)[]>([null, null, null])
  const [selectedEmojis, setSelectedEmojis] = useState<string[]>([])
  const [doodleCount, setDoodleCount] = useState(1)
  const [brushColor, setBrushColor] = useState('#ffffff')
  const [isErasing, setIsErasing] = useState(false)
  const [clearTrigger, setClearTrigger] = useState(0)
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const config = getLayoutConfig(layout)

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

    // Layout Dimension setup
    if (config.type.startsWith('strip')) {
      const pW = 500, pH = 375, pad = 30, tH = 150
      canvas.width = pW + (pad * 2)
      canvas.height = (pH * config.count) + (pad * (config.count + 1)) + tH
    } else if (config.type === '4R-split' || config.type === '4R-grid') {
      canvas.width = 1800
      canvas.height = 1200
    }

    // Fill background color
    ctx.fillStyle = customColor
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    const continueDrawingPhotos = () => {
      let loadedCount = 0
      photos.forEach((photo, idx) => {
        const img = new Image()
        img.onload = () => {

          if (config.type.startsWith('strip')) {
            const pW = 500, pH = 375, pad = 30
            const y = pad + (idx * (pH + pad))
            ctx.drawImage(img, pad, y, pW, pH)
          }
          else if (config.type === '4R-split') {
            const pad = 40
            if (idx === 0) {
              // Large top left
              ctx.drawImage(img, pad, pad, 1000, 700)
            } else {
              // Bottom row
              const pW = 546, pH = 380 // Roughly 1/3 of remaining
              const xOffset = pad + ((idx - 1) * (pW + pad))
              ctx.drawImage(img, xOffset, 700 + pad * 2, pW, pH)
            }
          }
          else if (config.type === '4R-grid') {
            const pad = 40
            const pW = 840, pH = 450
            const col = idx % 2
            const row = Math.floor(idx / 2)
            const x = pad + col * (pW + pad)
            const y = pad + row * (pH + pad)
            ctx.drawImage(img, x, y, pW, pH)
          }

          loadedCount++
          if (loadedCount === photos.length) {
            // Helper to draw two-tone RMHC logo
            const drawColoredRMHC = (x: number, y: number, align: 'center' | 'right', fontSize: number) => {
              ctx.font = `900 ${fontSize}px "Inter", Arial, sans-serif`
              const rWidth = ctx.measureText('R').width
              const mhcWidth = ctx.measureText('MHC').width
              const totalWidth = rWidth + mhcWidth

              let startX = x
              if (align === 'center') {
                startX = x - (totalWidth / 2)
              } else if (align === 'right') {
                startX = x - totalWidth
              }

              ctx.textAlign = 'left'
              // Draw 'R' in gold/yellow
              ctx.fillStyle = '#D9A05B'
              ctx.fillText('R', startX, y)
              // Draw 'MHC' in white
              ctx.fillStyle = '#FFFFFF'
              ctx.fillText('MHC', startX + rWidth, y)
            }

            // Draw Texts
            ctx.fillStyle = '#ffffff'
            if (config.type.startsWith('strip')) {
              ctx.font = 'bold 40px Arial'
              ctx.textAlign = 'center'
              ctx.fillText(titleText || ' ', canvas.width / 2, canvas.height - 90)
              ctx.font = 'italic 28px Arial'
              ctx.fillText(subtitleText || ' ', canvas.width / 2, canvas.height - 50)
              // Draw RMHC Logo
              drawColoredRMHC(canvas.width / 2, canvas.height - 15, 'center', 26)
            } else if (config.type === '4R-split') {
              ctx.font = 'bold 70px Arial'
              ctx.textAlign = 'center'
              ctx.fillText(titleText || ' ', 1420, 350)
              ctx.font = 'italic 40px Arial'
              ctx.fillText(subtitleText || ' ', 1420, 420)
              // Draw RMHC Logo
              drawColoredRMHC(1420, 500, 'center', 44)
            } else if (config.type === '4R-grid') {
              ctx.font = 'bold 60px Arial'
              ctx.textAlign = 'right'
              ctx.fillText(titleText || ' ', canvas.width - 60, canvas.height - 60)
              ctx.font = 'italic 40px Arial'
              ctx.textAlign = 'left'
              ctx.fillText(subtitleText || ' ', 60, canvas.height - 60)
              // Draw RMHC Logo
              drawColoredRMHC(canvas.width / 2, canvas.height - 60, 'center', 44)
            }

            setTimeout(() => {
              const link = document.createElement('a')
              link.href = canvas.toDataURL('image/png')
              link.download = `photobooth-${layout}-${Date.now()}.png`
              link.click()
            }, 100)
          }
        }
        img.src = photo
      })
    }

    // Draw doodles and emojis
    const validDoodles = doodleDataUrls.filter(Boolean)
    
    if (validDoodles.length > 0 || selectedEmojis.length > 0) {
      const finishDrawingDoodles = () => {
        if (selectedEmojis.length > 0) {
          ctx.globalAlpha = 0.85
          ctx.font = '50px Arial'
          ctx.textAlign = 'center'
          ctx.textBaseline = 'middle'
          for (let i = 0; i < 30; i++) {
            const emoji = selectedEmojis[Math.floor(Math.random() * selectedEmojis.length)]
            const dx = Math.random() * canvas.width
            const dy = Math.random() * canvas.height
            ctx.fillText(emoji, dx, dy)
          }
        }
        ctx.globalAlpha = 1.0
        ctx.filter = 'none' 
        continueDrawingPhotos()
      }

      if (validDoodles.length > 0) {
        let loadedCount = 0
        validDoodles.forEach((url) => {
          const doodleImg = new Image()
          doodleImg.onload = () => {
            ctx.globalAlpha = 0.85
            ctx.filter = 'blur(2px)' 
            // Stamp each doodle patch randomly
            for (let i = 0; i < 10; i++) {
              const x = Math.random() * canvas.width - 100
              const y = Math.random() * canvas.height - 100
              ctx.drawImage(doodleImg, x, y, 350, 250)
            }
            
            loadedCount++
            if (loadedCount === validDoodles.length) {
              finishDrawingDoodles()
            }
          }
          if (url) doodleImg.src = url
        })
      } else {
        finishDrawingDoodles()
      }
    } else {
      continueDrawingPhotos()
    }
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
      <div className="flex-1 flex flex-col lg:flex-row p-6 gap-8 max-w-[1600px] mx-auto w-full">
        {/* Left Column (Controls & Camera) */}
        <div className="flex-1 space-y-8 min-w-0">
          {showThemeSelector && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-8 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-[0_8px_30px_rgb(0,0,0,0.12)] relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -z-10 translate-x-1/2 -translate-y-1/2" />

              <div className="flex items-center justify-between border-b border-border/50 pb-6 mb-6">
                <div>
                  <h2 className="text-2xl font-black text-foreground mb-1 tracking-tight">Customize Your Photobooth</h2>
                  <p className="text-muted-foreground font-medium">Design your unique photostrip</p>
                </div>
                <button
                  onClick={() => setShowThemeSelector(false)}
                  className="px-6 py-2.5 bg-primary text-primary-foreground rounded-full font-bold hover:bg-primary/90 transition-all shadow-lg hover:shadow-primary/25 whitespace-nowrap ml-4 transform hover:-translate-y-0.5"
                >
                  Start Camera
                </button>
              </div>

              <div className="space-y-8">
                <ImageColorPicker color={customColor} onChange={setCustomColor} />

                <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl p-6 shadow-sm">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                    <h3 className="text-lg font-bold text-foreground">Add Custom Doodles (Up to 3)</h3>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => setIsErasing(false)}
                        className={`flex items-center gap-1 px-3 py-1.5 text-xs rounded-full transition-all font-semibold shadow-sm border ${
                          !isErasing ? 'bg-primary text-primary-foreground border-primary' : 'bg-card text-foreground border-border hover:bg-muted'
                        }`}
                      >
                        <PenTool size={14} /> Brush
                      </button>
                      <input 
                        type="color" 
                        value={brushColor} 
                        onChange={e => { setBrushColor(e.target.value); setIsErasing(false) }} 
                        className={`w-8 h-8 rounded cursor-pointer border-none p-0 ${isErasing ? 'opacity-50' : ''}`}
                      />
                      <button
                        onClick={() => setIsErasing(true)}
                        className={`flex items-center gap-1 px-3 py-1.5 text-xs rounded-full transition-all font-semibold shadow-sm border ${
                          isErasing ? 'bg-primary text-primary-foreground border-primary' : 'bg-card text-foreground border-border hover:bg-muted'
                        }`}
                      >
                        <Eraser size={14} /> Eraser
                      </button>
                      <button 
                        onClick={() => setClearTrigger(prev => prev + 1)}
                        className="flex items-center gap-1 px-3 py-1.5 text-xs text-red-500 hover:text-white hover:bg-red-500 border border-red-500/50 rounded-full transition-all font-semibold shadow-sm"
                      >
                        <Trash2 size={14} /> Clear All
                      </button>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4 w-full items-center">
                    {Array.from({ length: doodleCount }).map((_, idx) => (
                      <DrawingCanvas 
                        key={idx}
                        onDataUrlChange={(url) => {
                          setDoodleDataUrls(prev => {
                            const newUrls = [...prev]
                            newUrls[idx] = url
                            return newUrls
                          })
                        }} 
                        brushColor={brushColor}
                        isErasing={isErasing}
                        clearTrigger={clearTrigger}
                      />
                    ))}
                    {doodleCount < 3 && (
                      <button
                        onClick={() => setDoodleCount(prev => prev + 1)}
                        className="w-full aspect-video rounded-xl border-2 border-dashed border-primary/50 hover:border-primary flex flex-col items-center justify-center text-primary/70 hover:text-primary transition-all bg-black/5"
                      >
                        <span className="text-3xl font-light">+</span>
                        <span className="text-xs font-semibold mt-1">Add</span>
                      </button>
                    )}
                  </div>

                  <div className="pt-6 mt-6 border-t border-border/50">
                    <p className="text-sm font-semibold text-muted-foreground mb-3">Or choose up to 3 cute emojis:</p>
                    <div className="flex flex-wrap gap-3 justify-start">
                      {PRESET_DOODLES.map(d => {
                        const isSelected = selectedEmojis.includes(d.emoji)
                        return (
                          <button
                            key={d.id}
                            onClick={() => {
                              let next = [...selectedEmojis]
                              if (next.includes(d.emoji)) {
                                next = next.filter(e => e !== d.emoji)
                              } else {
                                if (next.length >= 3) {
                                  alert('You can only select a maximum of 3 cute emojis!')
                                  return
                                }
                                next.push(d.emoji)
                              }
                              setSelectedEmojis(next)
                            }}
                            className={`flex flex-col items-center p-2 rounded-xl border-2 transition-all ${
                              isSelected 
                                ? 'border-primary bg-primary/10 scale-110 shadow-sm' 
                                : 'border-border bg-card hover:border-primary/50 hover:bg-muted'
                            }`}
                          >
                            <span className="text-2xl">{d.emoji}</span>
                            <span className="text-xs font-semibold mt-1">{d.label}</span>
                          </button>
                        )
                      })}
                    </div>
                  </div>
                </div>

                <div className="flex flex-col md:flex-row gap-4 bg-background/50 backdrop-blur-sm p-5 rounded-2xl border border-border/50">
                  <div className="flex-1">
                    <label className="text-sm font-semibold text-muted-foreground mb-2 flex items-center gap-2">
                      <Type size={16} /> Title Text
                    </label>
                    <input
                      type="text"
                      value={titleText}
                      onChange={(e) => setTitleText(e.target.value)}
                      className="w-full px-4 py-2 bg-card border border-border rounded-lg text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-all"
                      placeholder="e.g. Rica Marie"
                    />
                  </div>
                  <div className="flex-1">
                    <label className="text-sm font-semibold text-muted-foreground mb-2 flex items-center gap-2">
                      <Type size={16} /> Subtitle Text
                    </label>
                    <input
                      type="text"
                      value={subtitleText}
                      onChange={(e) => setSubtitleText(e.target.value)}
                      className="w-full px-4 py-2 bg-card border border-border rounded-lg text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-all"
                      placeholder="e.g. Happy Birthday!"
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {!cameraActive ? (
            <motion.button
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              onClick={() => setCameraActive(true)}
              className="w-full aspect-video bg-card/50 backdrop-blur-sm rounded-3xl border-2 border-dashed border-primary/40 hover:border-primary transition-all duration-300 flex flex-col items-center justify-center gap-4 cursor-pointer group shadow-xl"
            >
              <div className="p-5 bg-primary/10 rounded-2xl group-hover:bg-primary/20 transition-colors transform group-hover:scale-110 duration-300">
                <Camera className="text-primary" size={48} />
              </div>
              <div className="text-center">
                <p className="text-foreground font-bold text-xl tracking-tight">Click to Start Camera</p>
                <p className="text-muted-foreground font-medium mt-1">Allow camera access to begin</p>
              </div>
            </motion.button>
          ) : (
            <div className="relative w-full aspect-video bg-black rounded-3xl overflow-hidden border-2 border-primary/50 shadow-2xl ring-4 ring-primary/10">
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

        {/* Right Column (Live Preview & Downloads) */}
        <div className="w-full lg:w-[500px] shrink-0 space-y-6">
          <div className="p-8 bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 shadow-[0_8px_30px_rgb(0,0,0,0.12)] sticky top-24">
            <h3 className="text-xl font-black text-foreground mb-6 tracking-tight">Live Layout Preview</h3>

            <div className="mb-6 flex justify-center bg-gray-100 dark:bg-gray-800 rounded-lg py-4 overflow-hidden">
              {/* Dynamic CSS Preview of the Layout */}
              <PreviewCanvas layout={config.type} photos={photos} customColor={customColor} count={config.count} />
            </div>

            <div className="space-y-3">
              <button
                onClick={() => {
                  setPhotos(photos.slice(0, -1))
                }}
                disabled={photos.length === 0}
                className="w-full px-4 py-2 border border-border text-foreground rounded-lg hover:bg-muted transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
              >
                <RotateCcw size={16} />
                Undo Last Photo
              </button>
              <button
                onClick={() => {
                  setCameraActive(false)
                  setPhotos([])
                }}
                className="w-full px-4 py-2 border border-border text-foreground rounded-lg hover:bg-muted transition-colors flex items-center justify-center gap-2"
              >
                <RotateCcw size={16} />
                Restart Session
              </button>
              <button
                onClick={downloadPhotos}
                disabled={photos.length !== config.count}
                className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-semibold flex items-center justify-center gap-2"
              >
                <Download size={16} />
                Download ({photos.length}/{config.count})
              </button>
            </div>

            {photos.length !== config.count && (
              <p className="text-xs text-center text-muted-foreground mt-4">
                Capture {config.count - photos.length} more photo{config.count - photos.length > 1 ? 's' : ''} to download.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
