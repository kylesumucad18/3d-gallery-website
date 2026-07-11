'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Palette, X } from 'lucide-react'

interface ClipArtDoodle {
  id: string
  name: string
  src: string
}

// Pattern-based doodles that serve as decorative clipart overlays
const CLIPART_DOODLES: ClipArtDoodle[] = [
  { id: 'stars', name: 'Stars', src: 'https://api.dicebear.com/7.x/shapes/svg?seed=stars' },
  { id: 'hearts', name: 'Hearts', src: 'https://api.dicebear.com/7.x/shapes/svg?seed=hearts' },
  { id: 'circles', name: 'Circles', src: 'https://api.dicebear.com/7.x/shapes/svg?seed=circles' },
  { id: 'flowers', name: 'Flowers', src: 'https://api.dicebear.com/7.x/shapes/svg?seed=flowers' },
  { id: 'geometric', name: 'Geometric', src: 'https://api.dicebear.com/7.x/shapes/svg?seed=geometric' },
  { id: 'confetti', name: 'Confetti', src: 'https://api.dicebear.com/7.x/shapes/svg?seed=confetti' },
  { id: 'swirls', name: 'Swirls', src: 'https://api.dicebear.com/7.x/shapes/svg?seed=swirls' },
]

interface ClipArtDoodlesProps {
  onSelectClipArt: (src: string | null) => void
  selectedSrc: string | null
}

export function ClipArtDoodles({ onSelectClipArt, selectedSrc }: ClipArtDoodlesProps) {
  // Single-select functionality: user can choose ONE pattern doodle style as additional overlay
  const selectedId = CLIPART_DOODLES.find(d => d.src === selectedSrc)?.id || null

  const handleSelectClipArt = (src: string) => {
    // Allow toggling: if already selected, deselect it; otherwise select it
    const isAlreadySelected = selectedId === src
    onSelectClipArt(isAlreadySelected ? null : src)
  }

  return (
    <div className="space-y-4">
      <div className="mb-4">
        {/* User can select ONE pattern-based doodle for additional decorative overlay */}
        <p className="text-xs text-muted-foreground">Select 1 pattern style for decorative overlay</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {CLIPART_DOODLES.map((clipart) => {
          const isSelected = selectedId === clipart.id
          return (
          <button
            key={clipart.id}
            onClick={() => handleSelectClipArt(clipart.src)}
            className={`relative group p-3 rounded-xl border-2 transition-all duration-200 overflow-hidden aspect-square flex items-center justify-center ${
              isSelected
                ? 'border-primary bg-primary/10 shadow-[0_0_15px_rgba(217,160,91,0.3)] scale-105'
                : 'border-border/60 hover:border-primary/50 bg-card/40 hover:bg-card/70 hover:shadow-md'
            }`}
            title={clipart.name}
          >
            <div className="relative w-full h-full flex items-center justify-center">
              <Image
                src={clipart.src}
                alt={clipart.name}
                width={80}
                height={80}
                className={`object-contain group-hover:scale-110 transition-transform duration-200 ${
                  isSelected ? 'drop-shadow-lg' : 'drop-shadow'
                }`}
                unoptimized
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-end justify-center pb-2 rounded-xl">
              <span className="text-xs font-semibold text-white">{clipart.name}</span>
            </div>
            {/* Show checkmark badge when selected */}
            {isSelected && (
              <div className="absolute top-2 right-2 w-6 h-6 bg-primary rounded-full flex items-center justify-center shadow-lg border-2 border-background">
                <span className="text-xs font-bold text-white">✓</span>
              </div>
            )}
          </button>
          )
        })}
      </div>

      {/* Display feedback when pattern is selected */}
      {selectedId && (
        <div className="bg-primary/10 border border-primary/30 rounded-lg p-3 mt-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-foreground">
              Selected: {CLIPART_DOODLES.find(d => d.id === selectedId)?.name}
            </span>
            <button
              onClick={() => onSelectClipArt(null)}
              className="text-xs text-primary hover:text-destructive transition-colors flex items-center gap-1"
            >
              <X size={14} /> Clear
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
