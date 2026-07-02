'use client'

import { useRef, useState, useEffect } from 'react'

interface DrawingCanvasProps {
  onDataUrlChange: (dataUrl: string | null) => void
  brushColor: string
  isErasing: boolean
  clearTrigger: number
}

export function DrawingCanvas({ onDataUrlChange, brushColor, isErasing, clearTrigger }: DrawingCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isDrawing, setIsDrawing] = useState(false)
  const [hasDrawn, setHasDrawn] = useState(false)

  useEffect(() => {
    if (clearTrigger > 0) {
      const canvas = canvasRef.current
      if (!canvas) return
      const ctx = canvas.getContext('2d')
      if (!ctx) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      setHasDrawn(false)
      onDataUrlChange(null)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clearTrigger])

  // Helper function to get correct mouse position accounting for canvas resolution vs CSS display size
  const getMousePos = (e: React.MouseEvent | React.TouchEvent): { x: number; y: number } | null => {
    const canvas = canvasRef.current
    if (!canvas) return null

    const rect = canvas.getBoundingClientRect()
    let clientX: number, clientY: number

    if ('touches' in e) {
      clientX = e.touches[0].clientX
      clientY = e.touches[0].clientY
    } else {
      clientX = e.clientX
      clientY = e.clientY
    }

    // Map CSS display coordinates to internal canvas resolution (400x225)
    const scaleX = canvas.width / rect.width
    const scaleY = canvas.height / rect.height

    const x = (clientX - rect.left) * scaleX
    const y = (clientY - rect.top) * scaleY

    return { x, y }
  }

  const startDrawing = (e: React.MouseEvent | React.TouchEvent) => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const pos = getMousePos(e)
    if (!pos) return

    ctx.beginPath()
    ctx.moveTo(pos.x, pos.y)
    setIsDrawing(true)
  }

  const draw = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing) return
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const pos = getMousePos(e)
    if (!pos) return

    ctx.lineTo(pos.x, pos.y)

    if (isErasing) {
      ctx.globalCompositeOperation = 'destination-out'
      ctx.lineWidth = 15
      ctx.strokeStyle = 'rgba(0,0,0,1)'
    } else {
      ctx.globalCompositeOperation = 'source-over'
      ctx.lineWidth = 5
      ctx.strokeStyle = brushColor
    }

    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'
    ctx.stroke()
    setHasDrawn(true)
  }

  const stopDrawing = () => {
    if (!isDrawing) return
    setIsDrawing(false)
    const canvas = canvasRef.current
    if (canvas && hasDrawn) {
      onDataUrlChange(canvas.toDataURL('image/png'))
    }
  }

  return (
    <div className="relative rounded-xl overflow-hidden bg-gradient-to-br from-gray-900 to-black w-full aspect-video shadow-2xl border border-white/10">
      <canvas
        ref={canvasRef}
        width={400}
        height={225}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
        onTouchStart={startDrawing}
        onTouchMove={draw}
        onTouchEnd={stopDrawing}
        className="cursor-crosshair touch-none w-full h-full object-contain block"
      />
      {!hasDrawn && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <span className="text-white/60 text-sm font-semibold bg-black/40 px-4 py-2 rounded-full backdrop-blur-md border border-white/10">
            Draw your doodle here
          </span>
        </div>
      )}
    </div>
  )
}
