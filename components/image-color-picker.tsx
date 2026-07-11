'use client'

import { useState, useRef, useEffect, useCallback } from 'react'

interface ImageColorPickerProps {
  color: string
  onChange: (hex: string) => void
}

function hexToHsl(hex: string) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  if (!result) return { h: 0, s: 0, l: 50 }
  let r = parseInt(result[1], 16) / 255
  let g = parseInt(result[2], 16) / 255
  let b = parseInt(result[3], 16) / 255

  const max = Math.max(r, g, b), min = Math.min(r, g, b)
  let h = 0, s = 0, l = (max + min) / 2
  if (max !== min) {
    const d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break
      case g: h = (b - r) / d + 2; break
      case b: h = (r - g) / d + 4; break
    }
    h /= 6
  }
  return { h: h * 360, s: s * 100, l: l * 100 }
}

function hslToHex(h: number, s: number, l: number) {
  l /= 100;
  const a = s * Math.min(l, 1 - l) / 100;
  const f = (n: number) => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color).toString(16).padStart(2, '0');
  };
  return `#${f(0)}${f(8)}${f(4)}`.toUpperCase();
}

function hexToRgbObj(hex: string) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : { r: 0, g: 0, b: 0 }
}

export function ImageColorPicker({ color, onChange }: ImageColorPickerProps) {
  const wheelRef = useRef<HTMLDivElement>(null)
  const [hsl, setHsl] = useState(() => hexToHsl(color))
  const [isDragging, setIsDragging] = useState(false)
  const [colorMode, setColorMode] = useState<'RGB' | 'HSL'>('RGB')

  const [hexInput, setHexInput] = useState(color)
  const [rgbInput, setRgbInput] = useState(() => {
    const r = hexToRgbObj(color)
    return { r: String(r.r), g: String(r.g), b: String(r.b) }
  })
  const [hslInput, setHslInput] = useState(() => {
    const h = hexToHsl(color)
    return { h: String(Math.round(h.h)), s: String(Math.round(h.s)), l: String(Math.round(h.l)) }
  })

  useEffect(() => {
    if (!isDragging) {
      const newHsl = hexToHsl(color)
      setHsl(newHsl)
      if (document.activeElement?.tagName !== 'INPUT') {
        setHexInput(color)
        const r = hexToRgbObj(color)
        setRgbInput({ r: String(r.r), g: String(r.g), b: String(r.b) })
        setHslInput({ h: String(Math.round(newHsl.h)), s: String(Math.round(newHsl.s)), l: String(Math.round(newHsl.l)) })
      }
    }
  }, [color, isDragging])

  const handleWheelPointerDown = (e: React.PointerEvent) => {
    setIsDragging(true)
    handleWheelPointerMove(e)
  }

  const handleWheelPointerMove = useCallback((e: React.PointerEvent | PointerEvent) => {
    if (!wheelRef.current || !isDragging) return
    const rect = wheelRef.current.getBoundingClientRect()
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    
    let x = e.clientX - rect.left - centerX
    let y = e.clientY - rect.top - centerY

    let angleDeg = Math.atan2(y, x) * (180 / Math.PI)
    let hue = angleDeg + 90
    if (hue < 0) hue += 360

    const distance = Math.sqrt(x * x + y * y)
    const radius = rect.width / 2
    let saturation = (distance / radius) * 100
    if (saturation > 100) saturation = 100

    const currentHsl = hexToHsl(color)
    let nextL = currentHsl.l
    if (nextL < 5 || nextL > 95) nextL = 50
    const nextHsl = { ...currentHsl, h: hue, s: saturation, l: nextL }
    setHsl(nextHsl)
    onChange(hslToHex(nextHsl.h, nextHsl.s, nextHsl.l))
  }, [isDragging, color, onChange])

  const handleWheelPointerUp = useCallback(() => {
    setIsDragging(false)
  }, [])

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('pointermove', handleWheelPointerMove)
      window.addEventListener('pointerup', handleWheelPointerUp)
    }
    return () => {
      window.removeEventListener('pointermove', handleWheelPointerMove)
      window.removeEventListener('pointerup', handleWheelPointerUp)
    }
  }, [isDragging, handleWheelPointerMove, handleWheelPointerUp])

  const handleLightnessChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const l = parseFloat(e.target.value)
    const currentHsl = hexToHsl(color)
    const nextHsl = { ...currentHsl, l }
    setHsl(nextHsl)
    onChange(hslToHex(nextHsl.h, nextHsl.s, nextHsl.l))
  }

  const handleRgbChange = (component: 'r'|'g'|'b', val: string) => {
    setRgbInput(prev => ({ ...prev, [component]: val }))
    if (val === '') return
    let num = parseInt(val)
    if (isNaN(num)) return
    num = Math.max(0, Math.min(255, num))
    setRgbInput(prev => ({ ...prev, [component]: String(num) }))
    
    const rgb = hexToRgbObj(color)
    const nextRgb = { ...rgb, [component]: num }
    const hex = `#${nextRgb.r.toString(16).padStart(2,'0')}${nextRgb.g.toString(16).padStart(2,'0')}${nextRgb.b.toString(16).padStart(2,'0')}`.toUpperCase()
    onChange(hex)
  }

  const handleHslInputChange = (component: 'h'|'s'|'l', val: string) => {
    setHslInput(prev => ({ ...prev, [component]: val }))
    if (val === '') return
    let num = parseFloat(val)
    if (isNaN(num)) return
    if (component === 'h') num = Math.max(0, Math.min(360, num))
    else num = Math.max(0, Math.min(100, num))
    setHslInput(prev => ({ ...prev, [component]: String(num) }))
    
    const currentHsl = hexToHsl(color)
    const nextHsl = { ...currentHsl, [component]: num }
    onChange(hslToHex(nextHsl.h, nextHsl.s, nextHsl.l))
  }

  const handleHexChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value
    setHexInput(val)
    if (/^#[0-9A-Fa-f]{6}$/.test(val)) {
      onChange(val.toUpperCase())
    }
  }

  const baseColorHex = hslToHex(hsl.h, hsl.s, 50) 
  const angleRad = (hsl.h - 90) * (Math.PI / 180)
  const left = 50 + Math.cos(angleRad) * (hsl.s / 100) * 50
  const top = 50 + Math.sin(angleRad) * (hsl.s / 100) * 50

  return (
    <div className="bg-[#fafafa] p-6 rounded-2xl w-full max-w-sm mx-auto shadow-sm border border-gray-100 flex flex-col font-sans">
      
      {/* Top Section: Wheel & Swatch */}
      <div className="flex items-start justify-between gap-6 mb-8 px-2">
        {/* Color Wheel */}
        <div 
          ref={wheelRef}
          onPointerDown={handleWheelPointerDown}
          className="relative w-48 h-48 rounded-full shadow-sm cursor-crosshair shrink-0"
          style={{
            background: 'conic-gradient(red, yellow, lime, aqua, blue, magenta, red)',
            touchAction: 'none'
          }}
        >
          {/* Saturation gradient */}
          <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_closest-side,#fff,transparent)] pointer-events-none" />
          
          {/* Picker Thumb */}
          <div 
            className="absolute w-4 h-4 rounded-full border-2 border-black shadow-sm pointer-events-none -ml-2 -mt-2 bg-transparent"
            style={{ left: `${left}%`, top: `${top}%` }}
          />
        </div>

        {/* Tall Color Swatch */}
        <div 
          className="w-12 h-48 rounded-md shadow-sm border border-gray-200"
          style={{ backgroundColor: color }}
        />
      </div>

      {/* Lightness Slider */}
      <div className="w-full mb-8 relative px-2">
        <input
          type="range"
          min="0"
          max="100"
          value={hsl.l}
          onChange={handleLightnessChange}
          className="w-full h-3 rounded-full appearance-none outline-none"
          style={{
            background: `linear-gradient(to right, #000000, ${baseColorHex}, #ffffff)`
          }}
        />
        <style dangerouslySetInnerHTML={{__html: `
          input[type='range']::-webkit-slider-thumb {
            appearance: none;
            width: 16px;
            height: 16px;
            border-radius: 50%;
            background: white;
            border: 4px solid black;
            cursor: pointer;
            box-shadow: 0 1px 3px rgba(0,0,0,0.3);
          }
        `}} />
      </div>

      {/* Inputs Section */}
      <div className="w-full grid grid-cols-2 gap-4 text-sm text-gray-700 px-2">
        <div className="space-y-3">
          <div className="relative">
            <select 
              value={colorMode} 
              onChange={(e) => setColorMode(e.target.value as 'RGB' | 'HSL')}
              className="w-full appearance-none bg-white border border-gray-200 rounded-md py-2 px-3 pr-8 focus:outline-none focus:ring-1 focus:ring-gray-300 cursor-pointer"
            >
              <option value="RGB">RGB</option>
              <option value="HSL">HSL</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
            </div>
          </div>
          
          {colorMode === 'RGB' ? (
            <>
              <div className="flex items-center gap-3">
                <input type="text" value={rgbInput.r} onChange={e => handleRgbChange('r', e.target.value)} className="w-16 bg-white border border-gray-200 rounded-md py-1.5 px-2 focus:outline-none focus:ring-1 focus:ring-gray-300 text-center" />
                <span>Red</span>
              </div>
              <div className="flex items-center gap-3">
                <input type="text" value={rgbInput.g} onChange={e => handleRgbChange('g', e.target.value)} className="w-16 bg-white border border-gray-200 rounded-md py-1.5 px-2 focus:outline-none focus:ring-1 focus:ring-gray-300 text-center" />
                <span>Green</span>
              </div>
              <div className="flex items-center gap-3">
                <input type="text" value={rgbInput.b} onChange={e => handleRgbChange('b', e.target.value)} className="w-16 bg-white border border-gray-200 rounded-md py-1.5 px-2 focus:outline-none focus:ring-1 focus:ring-gray-300 text-center" />
                <span>Blue</span>
              </div>
            </>
          ) : (
            <>
              <div className="flex items-center gap-3">
                <input type="text" value={hslInput.h} onChange={e => handleHslInputChange('h', e.target.value)} className="w-16 bg-white border border-gray-200 rounded-md py-1.5 px-2 focus:outline-none focus:ring-1 focus:ring-gray-300 text-center" />
                <span>Hue</span>
              </div>
              <div className="flex items-center gap-3">
                <input type="text" value={hslInput.s} onChange={e => handleHslInputChange('s', e.target.value)} className="w-16 bg-white border border-gray-200 rounded-md py-1.5 px-2 focus:outline-none focus:ring-1 focus:ring-gray-300 text-center" />
                <span>Sat</span>
              </div>
              <div className="flex items-center gap-3">
                <input type="text" value={hslInput.l} onChange={e => handleHslInputChange('l', e.target.value)} className="w-16 bg-white border border-gray-200 rounded-md py-1.5 px-2 focus:outline-none focus:ring-1 focus:ring-gray-300 text-center" />
                <span>Light</span>
              </div>
            </>
          )}
        </div>

        <div className="flex flex-col items-end">
          <input 
            type="text" 
            value={hexInput} 
            onChange={handleHexChange}
            onBlur={() => setHexInput(color)}
            className="w-full bg-white border border-gray-200 rounded-md py-2 px-3 text-center font-mono focus:outline-none focus:ring-1 focus:ring-gray-300" 
          />
        </div>
      </div>
    </div>
  )
}
