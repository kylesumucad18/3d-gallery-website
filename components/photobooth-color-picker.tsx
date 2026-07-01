'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ThermometerSun, ThermometerSnowflake } from 'lucide-react'

interface ColorPickerProps {
  color: string
  onChange: (hex: string) => void
}

function hexToRgb(hex: string) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : { r: 0, g: 0, b: 0 }
}

function rgbToHex(r: number, g: number, b: number) {
  return "#" + (1 << 24 | r << 16 | g << 8 | b).toString(16).slice(1).toUpperCase()
}

function rgbToHsl(r: number, g: number, b: number) {
  r /= 255; g /= 255; b /= 255;
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
  return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) }
}

function hslToRgb(h: number, s: number, l: number) {
  s /= 100; l /= 100;
  const k = (n: number) => (n + h / 30) % 12
  const a = s * Math.min(l, 1 - l)
  const f = (n: number) => l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)))
  return { r: Math.round(255 * f(0)), g: Math.round(255 * f(8)), b: Math.round(255 * f(4)) }
}

function rgbToCmyk(r: number, g: number, b: number) {
  let c = 1 - (r / 255)
  let m = 1 - (g / 255)
  let y = 1 - (b / 255)
  let k = Math.min(c, Math.min(m, y))
  if (k === 1) return { c: 0, m: 0, y: 0, k: 100 }
  c = Math.round(((c - k) / (1 - k)) * 100)
  m = Math.round(((m - k) / (1 - k)) * 100)
  y = Math.round(((y - k) / (1 - k)) * 100)
  k = Math.round(k * 100)
  return { c, m, y, k }
}

function cmykToRgb(c: number, m: number, y: number, k: number) {
  c /= 100; m /= 100; y /= 100; k /= 100;
  const r = Math.round(255 * (1 - c) * (1 - k))
  const g = Math.round(255 * (1 - m) * (1 - k))
  const b = Math.round(255 * (1 - y) * (1 - k))
  return { r, g, b }
}

const ROYGBIV = [
  { name: 'Red', hex: '#FF0000' },
  { name: 'Orange', hex: '#FF7F00' },
  { name: 'Yellow', hex: '#FFFF00' },
  { name: 'Green', hex: '#00FF00' },
  { name: 'Blue', hex: '#0000FF' },
  { name: 'Indigo', hex: '#4B0082' },
  { name: 'Violet', hex: '#9400D3' },
]

export function PhotoboothColorPicker({ color, onChange }: ColorPickerProps) {
  const [activeTab, setActiveTab] = useState<'hex' | 'rgb' | 'hsl' | 'cmyk' | 'roygbiv'>('hex')
  const [tempShift, setTempShift] = useState(0)

  const handleHexChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value
    if (/^#[0-9A-Fa-f]{0,6}$/.test(val)) {
      if (val.length === 7) onChange(val.toUpperCase())
      else onChange(val)
    }
  }

  const handleRgbChange = (type: 'r' | 'g' | 'b', val: string) => {
    let num = parseInt(val)
    if (isNaN(num)) num = 0
    num = Math.min(255, Math.max(0, num))
    const current = hexToRgb(color)
    const next = { ...current, [type]: num }
    onChange(rgbToHex(next.r, next.g, next.b))
  }

  const handleHslChange = (type: 'h' | 's' | 'l', val: string) => {
    let num = parseInt(val)
    if (isNaN(num)) num = 0
    const max = type === 'h' ? 360 : 100
    num = Math.min(max, Math.max(0, num))
    const current = rgbToHsl(hexToRgb(color).r, hexToRgb(color).g, hexToRgb(color).b)
    const next = { ...current, [type]: num }
    const rgb = hslToRgb(next.h, next.s, next.l)
    onChange(rgbToHex(rgb.r, rgb.g, rgb.b))
  }

  const handleCmykChange = (type: 'c' | 'm' | 'y' | 'k', val: string) => {
    let num = parseInt(val)
    if (isNaN(num)) num = 0
    num = Math.min(100, Math.max(0, num))
    const current = rgbToCmyk(hexToRgb(color).r, hexToRgb(color).g, hexToRgb(color).b)
    const next = { ...current, [type]: num }
    const rgb = cmykToRgb(next.c, next.m, next.y, next.k)
    onChange(rgbToHex(rgb.r, rgb.g, rgb.b))
  }

  const applyTemperature = (shift: number) => {
    setTempShift(shift)
    const rgb = hexToRgb(color)
    const r = Math.min(255, Math.max(0, rgb.r + shift))
    const b = Math.min(255, Math.max(0, rgb.b - shift))
    onChange(rgbToHex(r, rgb.g, b))
    setTimeout(() => setTempShift(0), 200)
  }

  const rgb = hexToRgb(color)
  const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b)
  const cmyk = rgbToCmyk(rgb.r, rgb.g, rgb.b)

  return (
    <div className="bg-card border border-border rounded-xl p-6 shadow-lg">
      <div className="flex flex-col md:flex-row gap-6">
        
        {/* Color Preview */}
        <div className="flex flex-col items-center gap-4">
          <div 
            className="w-32 h-32 rounded-full border-4 border-border shadow-inner"
            style={{ backgroundColor: color.length === 7 ? color : '#FFFFFF' }}
          />
          <div className="text-center font-mono font-bold text-lg">{color.length === 7 ? color : '#---'}</div>
        </div>

        <div className="flex-1 space-y-6">
          {/* Tabs */}
          <div className="flex flex-wrap gap-2 border-b border-border pb-2">
            {(['hex', 'rgb', 'hsl', 'cmyk', 'roygbiv'] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-t-lg font-semibold text-sm transition-colors ${
                  activeTab === tab ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:bg-muted'
                }`}
              >
                {tab.toUpperCase()}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="min-h-[120px]">
            {activeTab === 'hex' && (
              <div className="flex items-center gap-4">
                <span className="text-muted-foreground font-semibold">HEX Color:</span>
                <input
                  type="text"
                  value={color}
                  onChange={handleHexChange}
                  className="px-4 py-2 bg-background border border-border rounded-lg text-foreground font-mono focus:border-primary focus:outline-none"
                  placeholder="#000000"
                />
              </div>
            )}

            {activeTab === 'rgb' && (
              <div className="flex gap-4">
                {[
                  { label: 'R', val: rgb.r, key: 'r' },
                  { label: 'G', val: rgb.g, key: 'g' },
                  { label: 'B', val: rgb.b, key: 'b' }
                ].map(c => (
                  <div key={c.key} className="flex flex-col gap-1">
                    <label className="text-xs text-muted-foreground font-bold">{c.label}</label>
                    <input
                      type="number"
                      value={c.val}
                      onChange={(e) => handleRgbChange(c.key as any, e.target.value)}
                      className="w-20 px-3 py-2 bg-background border border-border rounded-lg text-foreground font-mono"
                      min="0" max="255"
                    />
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'hsl' && (
              <div className="flex gap-4">
                {[
                  { label: 'H°', val: hsl.h, key: 'h', max: 360 },
                  { label: 'S%', val: hsl.s, key: 's', max: 100 },
                  { label: 'L%', val: hsl.l, key: 'l', max: 100 }
                ].map(c => (
                  <div key={c.key} className="flex flex-col gap-1">
                    <label className="text-xs text-muted-foreground font-bold">{c.label}</label>
                    <input
                      type="number"
                      value={c.val}
                      onChange={(e) => handleHslChange(c.key as any, e.target.value)}
                      className="w-20 px-3 py-2 bg-background border border-border rounded-lg text-foreground font-mono"
                      min="0" max={c.max}
                    />
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'cmyk' && (
              <div className="flex gap-4">
                {[
                  { label: 'C%', val: cmyk.c, key: 'c' },
                  { label: 'M%', val: cmyk.m, key: 'm' },
                  { label: 'Y%', val: cmyk.y, key: 'y' },
                  { label: 'K%', val: cmyk.k, key: 'k' }
                ].map(c => (
                  <div key={c.key} className="flex flex-col gap-1">
                    <label className="text-xs text-muted-foreground font-bold">{c.label}</label>
                    <input
                      type="number"
                      value={c.val}
                      onChange={(e) => handleCmykChange(c.key as any, e.target.value)}
                      className="w-20 px-3 py-2 bg-background border border-border rounded-lg text-foreground font-mono"
                      min="0" max="100"
                    />
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'roygbiv' && (
              <div className="flex flex-wrap gap-3">
                {ROYGBIV.map(c => (
                  <button
                    key={c.name}
                    onClick={() => onChange(c.hex)}
                    className="w-12 h-12 rounded-full border-2 border-border hover:scale-110 transition-transform shadow-md"
                    style={{ backgroundColor: c.hex }}
                    title={c.name}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Temperature Slider */}
          <div className="pt-4 border-t border-border">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-semibold text-muted-foreground flex items-center gap-2">
                <ThermometerSnowflake size={16} className="text-blue-400" />
                Color Temperature
                <ThermometerSun size={16} className="text-orange-400" />
              </span>
            </div>
            <input
              type="range"
              min="-50"
              max="50"
              value={tempShift}
              onChange={(e) => applyTemperature(parseInt(e.target.value))}
              className="w-full h-2 bg-gradient-to-r from-blue-500 via-gray-400 to-orange-500 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-xs text-muted-foreground mt-1 px-1">
              <span>Cooler</span>
              <span>Warmer</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
