'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Sparkles } from 'lucide-react'

interface PresetDoodle {
  id: string
  name: string
  src: string
}

const PRESET_DOODLES: PresetDoodle[] = [
  { id: 'stars', name: 'Stars', src: '/doodles/stars.png' },
  { id: 'hearts', name: 'Hearts', src: '/doodles/hearts.png' },
  { id: 'circles', name: 'Circles', src: '/doodles/circles.png' },
  { id: 'flowers', name: 'Flowers', src: '/doodles/flowers.png' },
  { id: 'geometric', name: 'Geometric', src: '/doodles/geometric.png' },
  { id: 'confetti', name: 'Confetti', src: '/doodles/confetti.png' },
  { id: 'swirls', name: 'Swirls', src: '/doodles/swirls.png' },
]

interface PresetDoodlesProps {
  onSelectDoodle: (src: string) => void
}

export function PresetDoodles({ onSelectDoodle }: PresetDoodlesProps) {
  const [selectedId, setSelectedId] = useState<string | null>(null)

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <Sparkles size={18} className="text-primary" />
        <h4 className="text-sm font-bold text-foreground">Preset Doodles</h4>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        {PRESET_DOODLES.map((doodle) => (
          <button
            key={doodle.id}
            onClick={() => {
              setSelectedId(doodle.id)
              onSelectDoodle(doodle.src)
            }}
            className={`relative group p-3 rounded-lg border-2 transition-all duration-200 overflow-hidden aspect-square flex items-center justify-center ${
              selectedId === doodle.id
                ? 'border-primary bg-primary/10 shadow-lg shadow-primary/20'
                : 'border-border hover:border-primary/50 bg-card/50 hover:bg-card'
            }`}
            title={doodle.name}
          >
            <div className="relative w-full h-full">
              <Image
                src={doodle.src}
                alt={doodle.name}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-200"
                unoptimized
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-end justify-center pb-2">
              <span className="text-xs font-semibold text-white">{doodle.name}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}
