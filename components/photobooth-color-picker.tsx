'use client'

import { useRef } from 'react'
import { Plus } from 'lucide-react'

interface ColorPickerProps {
  color: string
  onChange: (hex: string) => void
}

const PRESET_COLORS = [
  '#0EA5E9', // Default (Blue)
  '#000000', // Minimalistic (Black)
  '#0369A1', // Medtech (Dark Blue)
  '#EC4899', // Coquette (Pink)
  '#F59E0B', // Gold/Amber
  '#10B981', // Emerald
  '#FFFFFF', // White
]

export function PhotoboothColorPicker({ color, onChange }: ColorPickerProps) {
  const inputRef = useRef<HTMLInputElement>(null)

  const handleHexChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value
    if (!val.startsWith('#')) val = '#' + val
    if (/^#[0-9A-Fa-f]{0,6}$/.test(val)) {
      if (val.length === 7) onChange(val.toUpperCase())
      else onChange(val)
    }
  }

  return (
    <div className="space-y-3">
      <label className="text-sm font-bold text-foreground">Background Color</label>
      <div className="flex flex-wrap items-center gap-3 bg-card/40 p-3 rounded-2xl border border-border/50">
        {/* Presets */}
        <div className="flex gap-2 items-center flex-wrap">
          {PRESET_COLORS.map(preset => (
            <button
              key={preset}
              onClick={() => onChange(preset)}
              className={`w-8 h-8 rounded-full border-2 shadow-sm transition-transform hover:scale-110 ${
                color.toUpperCase() === preset ? 'border-primary scale-110' : 'border-border/60 hover:border-border'
              }`}
              style={{ backgroundColor: preset }}
              title={preset}
            />
          ))}
        </div>

        <div className="w-px h-8 bg-border/50 mx-1 hidden sm:block" />

        {/* Custom Color Button (hidden input overlay) */}
        <div className="relative group">
          <button
            onClick={() => inputRef.current?.click()}
            className="flex items-center gap-2 px-3 py-1.5 bg-background border border-border rounded-full hover:border-primary/50 transition-colors shadow-sm"
          >
            <div 
              className="w-5 h-5 rounded-full shadow-inner border border-border/50 flex items-center justify-center bg-gradient-to-br from-red-500 via-green-500 to-blue-500"
            >
              <Plus size={12} className="text-white drop-shadow-md" />
            </div>
            <span className="text-xs font-semibold">Custom</span>
          </button>
          <input
            ref={inputRef}
            type="color"
            value={color.length === 7 ? color : '#000000'}
            onChange={(e) => onChange(e.target.value.toUpperCase())}
            className="absolute opacity-0 w-0 h-0 pointer-events-none"
          />
        </div>

        {/* Hex Input */}
        <div className="flex items-center ml-auto bg-background border border-border rounded-lg overflow-hidden focus-within:border-primary transition-colors shadow-sm">
          <span className="px-2 py-1.5 text-xs font-mono text-muted-foreground border-r border-border bg-muted/50">HEX</span>
          <input
            type="text"
            value={color}
            onChange={handleHexChange}
            className="w-20 px-2 py-1.5 text-xs font-mono bg-transparent outline-none uppercase"
            placeholder="#000000"
            maxLength={7}
          />
        </div>
      </div>
    </div>
  )
}
