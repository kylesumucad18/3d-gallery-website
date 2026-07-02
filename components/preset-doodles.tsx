'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Sparkles, Zap, X } from 'lucide-react'

interface PresetDoodle {
  id: string
  name: string
  src: string
}

const PRESET_DOODLES: PresetDoodle[] = [
  { id: 'rabbit', name: 'Rabbit', src: '/doodles/rabbit.png' },
  { id: 'peacock', name: 'Peacock', src: '/doodles/peacock.png' },
  { id: 'lion', name: 'Lion', src: '/doodles/lion.png' },
  { id: 'eagle', name: 'Eagle', src: '/doodles/eagle.png' },
  { id: 'giraffe', name: 'Giraffe', src: '/doodles/giraffe.png' },
  { id: 'dinosaur', name: 'Dinosaur', src: '/doodles/dinosaur.png' },
]

interface PresetDoodlesProps {
  onSelectDoodles: (srcs: string[]) => void
  selectedSrcs: string[]
}

export function PresetDoodles({ onSelectDoodles, selectedSrcs }: PresetDoodlesProps) {
  // Multi-select functionality: user can choose up to 3 animal doodles for side decorations
  const handleSelectDoodle = (src: string) => {
    const isSelected = selectedSrcs.includes(src)
    
    if (isSelected) {
      // If already selected, remove it from the array
      onSelectDoodles(selectedSrcs.filter(s => s !== src))
    } else if (selectedSrcs.length < 3) {
      // Only add if less than 3 selections already made
      onSelectDoodles([...selectedSrcs, src])
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <Zap size={18} className="text-primary" />
        <div>
          <h4 className="text-sm font-bold text-foreground">Animal Doodles</h4>
          {/* User can select UP TO 3 animal doodles to apply as background decorations */}
          <p className="text-xs text-muted-foreground">Select up to 3 animals for side backgrounds ({selectedSrcs.length}/3)</p>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {PRESET_DOODLES.map((doodle) => {
          const isSelected = selectedSrcs.includes(doodle.src)
          return (
          <button
            key={doodle.id}
            onClick={() => handleSelectDoodle(doodle.src)}
            disabled={!isSelected && selectedSrcs.length >= 3}
            className={`relative group p-3 rounded-xl border-2 transition-all duration-200 overflow-hidden aspect-square flex items-center justify-center ${
              isSelected
                ? 'border-primary bg-primary/10 shadow-lg shadow-primary/20 scale-105'
                : 'border-border/60 hover:border-primary/50 bg-card/40 hover:bg-card/70 hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed'
            }`}
            title={doodle.name}
          >
            <div className="relative w-full h-full flex items-center justify-center">
              <Image
                src={doodle.src}
                alt={doodle.name}
                width={80}
                height={80}
                className={`object-contain group-hover:scale-110 transition-transform duration-200 ${
                  isSelected ? 'drop-shadow-lg' : 'drop-shadow'
                }`}
                unoptimized
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-end justify-center pb-2 rounded-xl">
              <span className="text-xs font-semibold text-white">{doodle.name}</span>
            </div>
            {/* Show checkmark badge for each selected animal */}
            {isSelected && (
              <div className="absolute top-2 right-2 w-5 h-5 bg-primary rounded-full flex items-center justify-center shadow-lg">
                <Sparkles size={12} className="text-white" />
              </div>
            )}
          </button>
          )
        })}
      </div>

      {/* Display feedback when animals are selected - show count and allow clearing all */}
      {selectedSrcs.length > 0 && (
        <div className="bg-primary/10 border border-primary/30 rounded-lg p-3 mt-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-foreground">
              Selected: {selectedSrcs.length} animal{selectedSrcs.length !== 1 ? 's' : ''}
            </span>
            <button
              onClick={() => onSelectDoodles([])}
              className="text-xs text-primary hover:text-destructive transition-colors flex items-center gap-1"
            >
              <X size={14} /> Clear All
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
