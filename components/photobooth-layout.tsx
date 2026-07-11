'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Camera, X, Download, RotateCcw, Type, PenTool, Eraser, Trash2, Palette, ChevronDown, Zap, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { ImageColorPicker } from './image-color-picker'
import { DrawingCanvas } from './drawing-canvas'
import { PresetDoodles } from './preset-doodles'
import { ClipArtDoodles } from './clipart-doodles'

interface PhotoboothLayoutProps {
  layout: 'M' | 'A' | 'R' | 'I' | 'E' | 'H'
  theme: 'default' | 'minimalistic' | 'medtech' | 'coquette'
}

const THEME_DEFAULT_COLORS: Record<string, string> = {
  default: '#0EA5E9',
  minimalistic: '#000000',
  medtech: '#0369A1',
  coquette: '#EC4899',
}

type LayoutType = 'strip-3' | 'strip-4' | '4R-split' | '4R-grid'

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

function PreviewCanvas({ layout, photos, customColor, count, patternSrc, presetSrcs = [] }: { layout: LayoutType, photos: string[], customColor: string, count: number, patternSrc?: string | null, presetSrcs?: string[] }) {
  const emptyBoxes = Array.from({ length: count - photos.length })

  const renderBackground = () => (
    <>
      <div className="absolute inset-0" style={{ backgroundColor: customColor }} />
      {patternSrc && (
        <div 
          className="absolute inset-0 opacity-30" 
          style={{ 
            backgroundImage: `url(${patternSrc})`, 
            backgroundSize: '100px 100px', 
            backgroundRepeat: 'repeat' 
          }} 
        />
      )}
    </>
  )

  if (layout === 'strip-3' || layout === 'strip-4') {
    return (
      <div className="relative w-48 mx-auto p-4 rounded-2xl shadow-2xl border border-white/10 transition-all duration-300 hover:shadow-3xl overflow-hidden">
        {renderBackground()}
        <div className="relative z-10 flex flex-col gap-3">
          {photos.map((p, i) => (
            <div key={i} className="relative w-full aspect-[4/3] rounded-lg overflow-hidden shadow-inner">
              <img src={p} alt="pose" className="w-full h-full object-cover bg-black" />
              <div className="absolute inset-0 bg-[radial-gradient(circle,transparent_50%,rgba(0,0,0,0.45)_120%)] pointer-events-none" />
            </div>
          ))}
          {emptyBoxes.map((_, i) => (
            <div key={`e-${i}`} className="w-full aspect-[4/3] bg-black/20 flex items-center justify-center border border-dashed border-black/30 backdrop-blur-sm rounded-lg overflow-hidden">
              <span className="text-sm font-bold opacity-50">{photos.length + i + 1}</span>
            </div>
          ))}
        </div>
        <div className="relative z-10 mt-6 mb-2 text-center text-white/90">
          <div className="font-bold text-lg">Title</div>
          <div className="text-xs italic">Subtitle</div>
        </div>
        {/* Preset Animals */}
        {presetSrcs[0] && <img src={presetSrcs[0]} className="absolute bottom-2 left-2 w-10 h-10 object-contain z-20 opacity-90" alt="" />}
        {presetSrcs[1] && <img src={presetSrcs[1]} className="absolute bottom-2 right-2 w-10 h-10 object-contain z-20 opacity-90" alt="" />}
        {presetSrcs[2] && <img src={presetSrcs[2]} className="absolute bottom-12 left-1/2 -translate-x-1/2 w-10 h-10 object-contain z-20 opacity-90" alt="" />}
      </div>
    )
  }

  if (layout === '4R-split') {
    return (
      <div className="relative w-full aspect-[3/2] p-4 shadow-xl border border-border flex flex-col gap-3 overflow-hidden">
        {renderBackground()}
        <div className="relative z-10 flex gap-3 h-3/5">
          <div className="w-2/3 h-full bg-black/20 relative overflow-hidden backdrop-blur-sm rounded-lg shadow-inner">
            {photos[0] ? (
              <>
                <img src={photos[0]} alt="pose" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-[radial-gradient(circle,transparent_50%,rgba(0,0,0,0.45)_120%)] pointer-events-none" />
              </>
            ) : <div className="absolute inset-0 flex items-center justify-center font-bold opacity-50 border border-dashed border-black/30">1</div>}
          </div>
          <div className="w-1/3 flex flex-col justify-center items-center text-white/90 p-2 text-center relative">
            <div className="font-bold text-xl mb-1 z-30">Title</div>
            <div className="text-sm italic z-30">Subtitle</div>
            {presetSrcs[0] && <img src={presetSrcs[0]} className="absolute top-4 left-4 w-12 h-12 object-contain z-20 opacity-90" alt="" />}
            {presetSrcs[1] && <img src={presetSrcs[1]} className="absolute top-4 right-4 w-12 h-12 object-contain z-20 opacity-90" alt="" />}
            {presetSrcs[2] && <img src={presetSrcs[2]} className="absolute bottom-4 left-1/2 -translate-x-1/2 w-12 h-12 object-contain z-20 opacity-90" alt="" />}
          </div>
        </div>
        <div className="relative z-10 flex gap-3 h-2/5">
          {[1, 2, 3].map((idx) => (
            <div key={idx} className="flex-1 h-full bg-black/20 relative overflow-hidden backdrop-blur-sm rounded-lg shadow-inner">
              {photos[idx] ? (
                <>
                  <img src={photos[idx]} alt="pose" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-[radial-gradient(circle,transparent_50%,rgba(0,0,0,0.45)_120%)] pointer-events-none" />
                </>
              ) : <div className="absolute inset-0 flex items-center justify-center font-bold opacity-50 border border-dashed border-black/30">{idx + 1}</div>}
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (layout === '4R-grid') {
    return (
      <div className="relative w-full aspect-[3/2] p-4 shadow-xl border border-border flex flex-col justify-between overflow-hidden">
        {renderBackground()}
        <div className="relative z-10 grid grid-cols-2 gap-3 h-[80%]">
          {[0, 1, 2, 3].map((idx) => (
            <div key={idx} className="bg-black/20 relative overflow-hidden backdrop-blur-sm rounded-lg shadow-inner">
              {photos[idx] ? (
                <>
                  <img src={photos[idx]} alt="pose" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-[radial-gradient(circle,transparent_50%,rgba(0,0,0,0.45)_120%)] pointer-events-none" />
                </>
              ) : <div className="absolute inset-0 flex items-center justify-center font-bold opacity-50 border border-dashed border-black/30">{idx + 1}</div>}
            </div>
          ))}
        </div>
        <div className="relative z-10 h-[15%] flex justify-between items-end px-4 text-white/90">
          <div className="text-sm italic relative z-30">
            Subtitle
            {presetSrcs[0] && <img src={presetSrcs[0]} className="absolute bottom-6 -left-2 w-10 h-10 object-contain z-20 opacity-90" alt="" />}
          </div>
          {presetSrcs[2] && <img src={presetSrcs[2]} className="absolute bottom-2 left-1/2 -translate-x-1/2 w-10 h-10 object-contain z-20 opacity-90" alt="" />}
          <div className="font-bold text-xl relative z-30">
            Title
            {presetSrcs[1] && <img src={presetSrcs[1]} className="absolute bottom-8 -right-2 w-10 h-10 object-contain z-20 opacity-90" alt="" />}
          </div>
        </div>
      </div>
    )
  }

  return null
}

export function PhotoboothLayout({ layout, theme }: PhotoboothLayoutProps) {
  const [currentStep, setCurrentStep] = useState<1 | 2>(1)
  const [currentLayout, setCurrentLayout] = useState(layout)
  const [photos, setPhotos] = useState<string[]>([])
  const [customColor, setCustomColor] = useState(THEME_DEFAULT_COLORS[theme] || '#0EA5E9')
  const [titleText, setTitleText] = useState('Rica Marie')
  const [subtitleText, setSubtitleText] = useState('Happy Birthday!')
  // Store custom-drawn doodles (up to 3)
  const [doodleDataUrls, setDoodleDataUrls] = useState<(string | null)[]>([null, null, null])
  // Store selected preset animal doodles (up to 3 animals for side backgrounds)
  const [presetDoodleSrcs, setPresetDoodleSrcs] = useState<string[]>([])
  // Store selected clipart pattern doodle (only 1 pattern for overlay decoration)
  const [clipartDoodleSrc, setClipartDoodleSrc] = useState<string | null>(null)
  const [expandedAccordion, setExpandedAccordion] = useState<'animals' | 'patterns' | 'draw' | null>('animals')
  const [doodleCount, setDoodleCount] = useState(1)
  const [brushColor, setBrushColor] = useState('#ffffff')
  const [isErasing, setIsErasing] = useState(false)
  const [clearTrigger, setClearTrigger] = useState(0)
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const config = getLayoutConfig(currentLayout)
  const cameraActive = currentStep === 2

  useEffect(() => {
    if (photos.length > config.count) {
      setPhotos(photos.slice(0, config.count))
    }
  }, [config.count, photos])

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

    // Calculate photo bounds based on layout
    const pBounds: {x: number, y: number, w: number, h: number}[] = []
    if (config.type.startsWith('strip')) {
      const pW = 500, pH = 375, pad = 30
      for(let i=0; i<config.count; i++) {
        pBounds.push({ x: pad, y: pad + i * (pH + pad), w: pW, h: pH })
      }
    } else if (config.type === '4R-split') {
      pBounds.push({ x: 80, y: 80, w: 900, h: 1040 }) // large
      pBounds.push({ x: 1060, y: 80, w: 660, h: 320 }) // small 1
      pBounds.push({ x: 1060, y: 440, w: 660, h: 320 }) // small 2
      pBounds.push({ x: 1060, y: 800, w: 660, h: 320 }) // small 3
    } else if (config.type === '4R-grid') {
      pBounds.push({ x: 60, y: 60, w: 810, h: 420 })
      pBounds.push({ x: 930, y: 60, w: 810, h: 420 })
      pBounds.push({ x: 60, y: 540, w: 810, h: 420 })
      pBounds.push({ x: 930, y: 540, w: 810, h: 420 })
    }

    // Fill background color
    ctx.fillStyle = customColor
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    const drawPhotos = () => {
      let loadedCount = 0
      photos.forEach((photo, idx) => {
        const img = new Image()
        img.crossOrigin = 'anonymous'
        img.onload = () => {
          const bound = pBounds[idx]
          if (!bound) return
          const { x: dX, y: dY, w: dWidth, h: dHeight } = bound

          ctx.save()
          ctx.beginPath()
          if (ctx.roundRect) {
            ctx.roundRect(dX, dY, dWidth, dHeight, 16)
          } else {
            ctx.rect(dX, dY, dWidth, dHeight)
          }
          ctx.clip()

          ctx.drawImage(img, 0, 0, img.width, img.height, dX, dY, dWidth, dHeight)

          const gradient = ctx.createRadialGradient(
            dX + dWidth/2, dY + dHeight/2, Math.min(dWidth, dHeight) * 0.35,
            dX + dWidth/2, dY + dHeight/2, Math.max(dWidth, dHeight) * 0.75
          )
          gradient.addColorStop(0, 'rgba(0,0,0,0)')
          gradient.addColorStop(1, 'rgba(0,0,0,0.45)')
          ctx.fillStyle = gradient
          ctx.fillRect(dX, dY, dWidth, dHeight)
          
          ctx.restore()

          loadedCount++
          if (loadedCount === photos.length) {
            drawTextLayer()
          }
        }
        img.src = photo
      })
    }

    const drawDoodlesLayer = () => {
      const customDoodles = doodleDataUrls.filter(Boolean)
      const hasPresetAnimals = presetDoodleSrcs.length > 0
      const hasClipartPattern = !!clipartDoodleSrc

      if (customDoodles.length === 0 && !hasPresetAnimals && !hasClipartPattern) {
        drawPhotos()
        return
      }

      let loadedCount = 0
      const totalDoodlesToLoad = customDoodles.length + (hasPresetAnimals ? presetDoodleSrcs.length : 0) + (hasClipartPattern ? 1 : 0)

      if (customDoodles.length > 0) {
        customDoodles.forEach((url) => {
          const doodleImg = new Image()
          doodleImg.crossOrigin = 'anonymous'
          doodleImg.onload = () => {
            ctx.globalAlpha = 0.9
            for (let i = 0; i < 4; i++) {
              if (pBounds.length === 0) break
              const bound = pBounds[Math.floor(Math.random() * pBounds.length)]
              const placement = Math.floor(Math.random() * 8)
              const scale = 0.4 + Math.random() * 0.4
              const dW = 200 * scale
              const dH = 150 * scale
              let x = bound.x
              let y = bound.y
              switch(placement) {
                case 0: x -= dW*0.6; y -= dH*0.6; break
                case 1: x += bound.w/2 - dW/2; y -= dH*0.7; break
                case 2: x += bound.w - dW*0.4; y -= dH*0.6; break
                case 3: x += bound.w - dW*0.3; y += bound.h/2 - dH/2; break
                case 4: x += bound.w - dW*0.4; y += bound.h - dH*0.4; break
                case 5: x += bound.w/2 - dW/2; y += bound.h - dH*0.3; break
                case 6: x -= dW*0.6; y += bound.h - dH*0.4; break
                case 7: x -= dW*0.7; y += bound.h/2 - dH/2; break
              }
              ctx.drawImage(doodleImg, x, y, dW, dH)
            }
            loadedCount++
            if (loadedCount === totalDoodlesToLoad) {
              ctx.globalAlpha = 1.0
              drawPhotos()
            }
          }
          doodleImg.src = url
        })
      }

      if (hasPresetAnimals) {
        presetDoodleSrcs.forEach((presetSrc, idx) => {
          const presetImg = new Image()
          presetImg.crossOrigin = 'anonymous'
          presetImg.onload = () => {
            ctx.globalAlpha = 0.9 
            const isStrip = config.type.startsWith('strip')
            const is4RSplit = config.type === '4R-split'
            const is4RGrid = config.type === '4R-grid'
            let x = 0, y = 0, size = 150
            if (isStrip) {
               size = 120
               if (idx === 0) { x = 10; y = canvas.height - 160 } 
               else if (idx === 1) { x = canvas.width - size - 10; y = canvas.height - 160 } 
               else { x = canvas.width / 2 - (size/2); y = canvas.height - 230 }
            } else if (is4RSplit) {
               size = 200
               if (idx === 0) { x = 1100; y = 200 } 
               else if (idx === 1) { x = 1550; y = 200 } 
               else { x = 1320; y = 600 }
            } else if (is4RGrid) {
               size = 180
               if (idx === 0) { x = 40; y = canvas.height - size - 90 } 
               else if (idx === 1) { x = canvas.width - size - 40; y = canvas.height - size - 90 } 
               else { x = canvas.width / 2 - (size/2); y = canvas.height - size - 50 }
            }
            ctx.drawImage(presetImg, x, y, size, size)
            loadedCount++
            if (loadedCount === totalDoodlesToLoad) {
              ctx.globalAlpha = 1.0
              drawPhotos()
            }
          }
          presetImg.src = presetSrc
        })
      }

      if (hasClipartPattern) {
        const clipartImg = new Image()
        clipartImg.crossOrigin = 'anonymous'
        clipartImg.onload = () => {
          ctx.globalAlpha = 0.3
          
          // Pattern overlay: tile across the entire canvas as a background
          const patternCanvas = document.createElement('canvas')
          patternCanvas.width = 300
          patternCanvas.height = 300
          const pCtx = patternCanvas.getContext('2d')
          if (pCtx) {
            pCtx.drawImage(clipartImg, 0, 0, 300, 300)
            const pattern = ctx.createPattern(patternCanvas, 'repeat')
            if (pattern) {
              ctx.fillStyle = pattern
              ctx.fillRect(0, 0, canvas.width, canvas.height)
            }
          }

          loadedCount++
          if (loadedCount === totalDoodlesToLoad) {
            ctx.globalAlpha = 1.0
            drawPhotos()
          }
        }
        clipartImg.src = clipartDoodleSrc
      }
    }

    const drawTextLayer = () => {
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
        ctx.fillStyle = '#D9A05B'
        ctx.fillText('R', startX, y)
        ctx.fillStyle = '#FFFFFF'
        ctx.fillText('MHC', startX + rWidth, y)
      }

      ctx.fillStyle = '#ffffff'
      if (config.type.startsWith('strip')) {
        ctx.font = 'bold 40px Arial'
        ctx.textAlign = 'center'
        ctx.fillText(titleText || ' ', canvas.width / 2, canvas.height - 90)
        ctx.font = 'italic 28px Arial'
        ctx.fillText(subtitleText || ' ', canvas.width / 2, canvas.height - 50)
        drawColoredRMHC(canvas.width / 2, canvas.height - 15, 'center', 26)
      } else if (config.type === '4R-split') {
        ctx.font = 'bold 70px Arial'
        ctx.textAlign = 'center'
        ctx.fillText(titleText || ' ', 1420, 350)
        ctx.font = 'italic 40px Arial'
        ctx.fillText(subtitleText || ' ', 1420, 420)
        drawColoredRMHC(1420, 500, 'center', 44)
      } else if (config.type === '4R-grid') {
        ctx.font = 'bold 60px Arial'
        ctx.textAlign = 'right'
        ctx.fillText(titleText || ' ', canvas.width - 60, canvas.height - 60)
        ctx.font = 'italic 40px Arial'
        ctx.textAlign = 'left'
        ctx.fillText(subtitleText || ' ', 60, canvas.height - 60)
        drawColoredRMHC(canvas.width / 2, canvas.height - 60, 'center', 44)
      }

      setTimeout(() => {
        const link = document.createElement('a')
        link.href = canvas.toDataURL('image/png')
        link.download = `photobooth-${layout}-${Date.now()}.png`
        link.click()
      }, 100)
    }

    drawDoodlesLayer()
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
            className="inline-flex items-center justify-center h-10 px-5 border border-border text-foreground rounded-xl hover:bg-muted transition-all shadow-sm active:scale-95 text-sm font-semibold gap-2"
          >
            <X size={18} />
            Exit
          </Link>
        </div>
      </div>

      {/* Main Content - ALWAYS maintain camera on LEFT, preview on RIGHT */}
      <div className={`flex-1 flex flex-col lg:flex-row p-6 gap-8 max-w-[1600px] mx-auto w-full items-start`}>
        {/* Left Column - 2 Step Accordion */}
        <div className="flex-1 space-y-6 min-w-0">
          
          {/* Step 1: Customize Your Photobooth */}
          <div className="bg-card/40 border border-border/50 rounded-2xl overflow-hidden shadow-lg">
            <button 
              onClick={() => setCurrentStep(1)}
              className={`w-full flex items-center justify-between p-6 transition-colors ${currentStep === 1 ? 'bg-primary/5 border-b border-border/50' : 'hover:bg-muted/50'}`}
            >
              <div className="flex items-center gap-4">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-colors ${currentStep === 1 ? 'bg-primary text-primary-foreground shadow-sm' : 'bg-muted text-muted-foreground'}`}>
                  {currentStep > 1 ? '✓' : '1'}
                </div>
                <h2 className={`text-xl font-bold tracking-tight transition-colors ${currentStep === 1 ? 'text-foreground' : 'text-muted-foreground'}`}>
                  Customize Your Photobooth
                </h2>
              </div>
              {currentStep !== 1 && <ChevronDown size={20} className="text-muted-foreground" />}
            </button>
            <AnimatePresence>
              {currentStep === 1 && (
                <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="overflow-hidden">
                  <div className="p-6 space-y-8">
                    {/* Layout Switcher */}
                    <div className="space-y-3">
                      <label className="text-sm font-bold text-foreground">Layout Template</label>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                        {['M', 'A', 'R', 'I', 'E', 'H'].map((l) => {
                          const lConfig = getLayoutConfig(l)
                          return (
                            <button
                              key={l}
                              onClick={() => setCurrentLayout(l as any)}
                              className={`p-3 rounded-xl border text-left transition-all flex flex-col items-start ${
                                currentLayout === l 
                                  ? 'border-primary bg-primary/5 ring-1 ring-primary shadow-sm' 
                                  : 'border-border bg-card hover:border-primary/50 hover:bg-muted/50'
                              }`}
                            >
                              <div className="font-bold text-foreground text-sm">{lConfig.title.split(' - ')[0]}</div>
                              <div className="text-xs text-muted-foreground mt-1">{lConfig.title.split(' - ')[1]}</div>
                            </button>
                          )
                        })}
                      </div>
                    </div>

                    <ImageColorPicker color={customColor} onChange={setCustomColor} />

                <div className="bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-lg border border-border/50 rounded-2xl p-6 shadow-lg">
                  <div className="space-y-4">
                    {/* Accordion 1: Preset Animal Doodles */}
                    <div className="border border-border/50 rounded-xl overflow-hidden bg-card/40">
                      <button 
                        onClick={() => setExpandedAccordion(expandedAccordion === 'animals' ? null : 'animals')}
                        className="w-full text-left p-4 hover:bg-muted/50 transition-colors"
                      >
                        <div className="flex items-center justify-between">
                          <h3 className="text-base font-bold text-foreground flex items-center gap-2">
                            <Zap size={18} className="text-primary" />
                            Animal Doodles
                          </h3>
                          <ChevronDown size={20} className={`transform transition-transform text-muted-foreground ${expandedAccordion === 'animals' ? 'rotate-180' : ''}`} />
                        </div>
                        <p className="text-xs text-muted-foreground mt-1 ml-6">Select up to 3 animals for side backgrounds</p>
                      </button>
                      <AnimatePresence>
                        {expandedAccordion === 'animals' && (
                          <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="overflow-hidden">
                            <div className="p-4 pt-0 border-t border-border/50 mt-2">
                              <PresetDoodles 
                                selectedSrcs={presetDoodleSrcs}
                                onSelectDoodles={(srcs) => setPresetDoodleSrcs(srcs)}
                              />
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Accordion 2: Pattern ClipArt */}
                    <div className="border border-border/50 rounded-xl overflow-hidden bg-card/40">
                      <button 
                        onClick={() => setExpandedAccordion(expandedAccordion === 'patterns' ? null : 'patterns')}
                        className="w-full text-left p-4 hover:bg-muted/50 transition-colors"
                      >
                        <div className="flex items-center justify-between">
                          <h3 className="text-base font-bold text-foreground flex items-center gap-2">
                            <Palette size={18} className="text-primary" />
                            Pattern ClipArt
                          </h3>
                          <ChevronDown size={20} className={`transform transition-transform text-muted-foreground ${expandedAccordion === 'patterns' ? 'rotate-180' : ''}`} />
                        </div>
                        <p className="text-xs text-muted-foreground mt-1 ml-6">Select 1 pattern style for decorative overlay</p>
                      </button>
                      <AnimatePresence>
                        {expandedAccordion === 'patterns' && (
                          <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="overflow-hidden">
                            <div className="p-4 pt-0 border-t border-border/50 mt-2">
                              <ClipArtDoodles
                                selectedSrc={clipartDoodleSrc}
                                onSelectClipArt={(src) => setClipartDoodleSrc(src)}
                              />
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Accordion 3: Custom Drawing */}
                    <div className="border border-border/50 rounded-xl overflow-hidden bg-card/40">
                      <button 
                        onClick={() => setExpandedAccordion(expandedAccordion === 'draw' ? null : 'draw')}
                        className="w-full text-left p-4 hover:bg-muted/50 transition-colors"
                      >
                        <div className="flex items-center justify-between">
                          <h3 className="text-base font-bold text-foreground flex items-center gap-2">
                            <PenTool size={18} className="text-primary" />
                            Custom Drawing
                          </h3>
                          <ChevronDown size={20} className={`transform transition-transform text-muted-foreground ${expandedAccordion === 'draw' ? 'rotate-180' : ''}`} />
                        </div>
                        <p className="text-xs text-muted-foreground mt-1 ml-6">Draw up to 3 custom doodles</p>
                      </button>
                      <AnimatePresence>
                        {expandedAccordion === 'draw' && (
                          <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="overflow-hidden">
                            <div className="p-4 pt-4 border-t border-border/50">
                              <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4 mb-4">
                                <div className="flex items-center gap-2 flex-wrap">
                                  <button
                                    onClick={() => setIsErasing(false)}
                                    className={`flex items-center justify-center gap-2 h-10 px-4 rounded-xl text-sm font-semibold transition-all shadow-sm active:scale-95 ${
                                      !isErasing ? 'bg-primary text-primary-foreground' : 'bg-card text-foreground border border-border hover:bg-muted'
                                    }`}
                                  >
                                    <PenTool size={16} /> Brush
                                  </button>
                                  <div className="h-10 px-2 flex items-center bg-card border border-border rounded-xl">
                                    <input 
                                      type="color" 
                                      value={brushColor} 
                                      onChange={e => { setBrushColor(e.target.value); setIsErasing(false) }} 
                                      className={`w-6 h-6 rounded cursor-pointer border-none p-0 transition-opacity ${isErasing ? 'opacity-50' : ''}`}
                                    />
                                  </div>
                                  <button
                                    onClick={() => setIsErasing(true)}
                                    className={`flex items-center justify-center gap-2 h-10 px-4 rounded-xl text-sm font-semibold transition-all shadow-sm active:scale-95 ${
                                      isErasing ? 'bg-primary text-primary-foreground' : 'bg-card text-foreground border border-border hover:bg-muted'
                                    }`}
                                  >
                                    <Eraser size={16} /> Eraser
                                  </button>
                                  <button 
                                    onClick={() => setClearTrigger(prev => prev + 1)}
                                    className="flex items-center justify-center gap-2 h-10 px-4 text-red-500 bg-red-500/10 hover:bg-red-500 hover:text-white rounded-xl transition-all font-semibold shadow-sm active:scale-95 ml-auto"
                                  >
                                    <Trash2 size={16} /> Clear
                                  </button>
                                </div>
                              </div>
                              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 w-full items-center">
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
                                    className="w-full aspect-video rounded-xl border-2 border-dashed border-primary/50 hover:border-primary flex flex-col items-center justify-center text-primary/70 hover:text-primary transition-all bg-black/5 hover:bg-primary/5"
                                  >
                                    <span className="text-3xl font-light">+</span>
                                    <span className="text-xs font-semibold mt-1">Add Draw</span>
                                  </button>
                                )}
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </div>

                <div className="bg-card/40 border border-border/50 rounded-xl p-4">
                  <div className="mb-4">
                    <h3 className="text-base font-bold text-foreground flex items-center gap-2">
                      <Type size={18} className="text-primary" />
                      Title Text / Subtitle Text
                    </h3>
                    <p className="text-xs text-muted-foreground mt-1 ml-6">Add personalized text to your photostrip</p>
                  </div>
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1">
                      <input
                        type="text"
                        value={titleText}
                        onChange={(e) => setTitleText(e.target.value)}
                        className="w-full px-4 py-2.5 bg-background border border-border rounded-lg text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-all text-sm"
                        placeholder="Title (e.g. Rica Marie)"
                      />
                    </div>
                    <div className="flex-1">
                      <input
                        type="text"
                        value={subtitleText}
                        onChange={(e) => setSubtitleText(e.target.value)}
                        className="w-full px-4 py-2.5 bg-background border border-border rounded-lg text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-all text-sm"
                        placeholder="Subtitle (e.g. Happy Birthday!)"
                      />
                    </div>
                  </div>
                </div>
                  </div>
                  {/* Continue to Step 2 Button */}
                  <div className="px-6 pb-6 flex justify-end">
                    <button 
                      onClick={() => setCurrentStep(2)}
                      className="px-8 py-3 bg-primary text-primary-foreground rounded-xl font-bold hover:bg-primary/90 transition-all shadow-sm hover:shadow-md active:scale-95 flex items-center gap-2"
                    >
                      Continue to Capture
                      <ArrowRight size={18} />
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Step 2: Capture Photos */}
          <div className="bg-card/40 border border-border/50 rounded-2xl overflow-hidden shadow-lg">
            <button 
              onClick={() => setCurrentStep(2)}
              className={`w-full flex items-center justify-between p-6 transition-colors ${currentStep === 2 ? 'bg-primary/5 border-b border-border/50' : 'hover:bg-muted/50'}`}
            >
              <div className="flex items-center gap-4">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-colors ${currentStep === 2 ? 'bg-primary text-primary-foreground shadow-sm' : 'bg-muted text-muted-foreground'}`}>
                  2
                </div>
                <h2 className={`text-xl font-bold tracking-tight transition-colors ${currentStep === 2 ? 'text-foreground' : 'text-muted-foreground'}`}>
                  Capture Photos
                </h2>
              </div>
              {currentStep !== 2 && <ChevronDown size={20} className="text-muted-foreground" />}
            </button>
            <AnimatePresence>
              {currentStep === 2 && (
                <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="overflow-hidden">
                  <div className="p-6">
                    <div className="relative w-full aspect-video bg-black rounded-3xl overflow-hidden border-2 border-primary/60 shadow-2xl ring-4 ring-primary/20 group">
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

              {/* Photo counter overlay */}
              <div className="absolute top-6 right-6 bg-black/60 backdrop-blur-md px-4 py-2 rounded-full border border-white/20">
                <p className="text-white font-semibold text-sm">
                  {photos.length}
                  <span className="text-white/60">{` / ${config.count}`}</span>
                </p>
              </div>

              {/* Capture button */}
              <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-4 pb-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={capturePhoto}
                  disabled={photos.length >= config.count}
                  className="px-8 py-3 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground rounded-full font-bold hover:from-primary/90 hover:to-primary/70 transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 disabled:hover:shadow-lg"
                >
                  <Camera size={18} />
                  <span>Capture {photos.length + 1}/{config.count}</span>
                </motion.button>
              </div>

              {/* Side control buttons */}
              <div className="absolute bottom-6 left-6 space-y-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setCameraActive(false)
                    setPhotos([])
                  }}
                  className="w-12 h-12 bg-black/60 hover:bg-red-500/80 text-white rounded-full flex items-center justify-center transition-colors backdrop-blur-md border border-white/20 hover:border-red-500"
                  title="Restart Session"
                >
                  <RotateCcw size={20} />
                </motion.button>
                {photos.length > 0 && (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setPhotos(photos.slice(0, -1))}
                    className="w-12 h-12 bg-black/60 hover:bg-orange-500/80 text-white rounded-full flex items-center justify-center transition-colors backdrop-blur-md border border-white/20 hover:border-orange-500"
                    title="Undo Last Photo"
                  >
                    <RotateCcw size={20} className="rotate-90" />
                  </motion.button>
                )}
              </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Right Column - Live Preview & Downloads (always on the RIGHT) */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className={`w-full lg:w-[480px] shrink-0 sticky top-24 space-y-6`}
        >
          <div className="p-8 bg-gradient-to-br from-white/8 to-white/3 backdrop-blur-2xl rounded-3xl border border-white/15 shadow-[0_12px_40px_rgba(0,0,0,0.15)]">
            <h3 className="text-xl font-black text-foreground mb-6 tracking-tight flex items-center gap-2">
              <Palette size={24} className="text-primary" />
              Live Preview
            </h3>

            <div className="mb-8 flex justify-center bg-gradient-to-b from-gray-900/50 to-gray-950/50 rounded-2xl p-6 overflow-hidden border border-white/5">
              <PreviewCanvas 
                layout={config.type} 
                photos={photos} 
                customColor={customColor} 
                count={config.count}
                patternSrc={clipartDoodleSrc}
                presetSrcs={presetDoodleSrcs}
              />
            </div>

            <div className="space-y-3">
              {!cameraActive ? (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setCurrentStep(2)}
                  className="w-full h-10 bg-primary text-primary-foreground rounded-xl font-bold hover:bg-primary/90 transition-all shadow-sm hover:shadow-md active:scale-95 flex items-center justify-center gap-2 text-sm"
                >
                  <Camera size={18} />
                  Start Camera
                </motion.button>
              ) : (
                <>
                  {photos.length > 0 && (
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setPhotos(photos.slice(0, -1))}
                      className="w-full h-10 border border-orange-500/40 hover:border-orange-500 text-orange-400 hover:text-orange-300 hover:bg-orange-500/10 rounded-xl transition-all shadow-sm active:scale-95 flex items-center justify-center gap-2 font-semibold text-sm"
                    >
                      <RotateCcw size={16} className="rotate-90" />
                      Undo Last Photo
                    </motion.button>
                  )}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      setCurrentStep(1)
                      setPhotos([])
                    }}
                    className="w-full h-10 border border-border text-foreground rounded-xl hover:bg-muted transition-all shadow-sm active:scale-95 flex items-center justify-center gap-2 font-semibold text-sm"
                  >
                    <RotateCcw size={16} />
                    Restart Session
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: photos.length === config.count ? 1.02 : 1 }}
                    whileTap={{ scale: photos.length === config.count ? 0.98 : 1 }}
                    onClick={downloadPhotos}
                    disabled={photos.length !== config.count}
                    className="w-full h-10 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground rounded-xl hover:from-primary/90 hover:to-primary/70 transition-all shadow-sm hover:shadow-md active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 font-bold text-sm"
                  >
                    <Download size={16} />
                    Download ({photos.length}/{config.count})
                  </motion.button>
                </>
              )}
            </div>

            {photos.length !== config.count && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-xs text-center text-muted-foreground mt-4 font-medium"
              >
                📸 Capture {config.count - photos.length} more photo{config.count - photos.length > 1 ? 's' : ''} to download.
              </motion.p>
            )}
            {photos.length === config.count && (
              <motion.p
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-xs text-center text-green-400/80 mt-4 font-semibold"
              >
                ✨ Ready to download! Click the button above.
              </motion.p>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
