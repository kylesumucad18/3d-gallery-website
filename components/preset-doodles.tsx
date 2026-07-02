'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Sparkles, Zap } from 'lucide-react'

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
  onSelectDoodle: (src: string) => void
}

export function PresetDoodles({ onSelectDoodle }: PresetDoodlesProps) {
  const [selectedId, setSelectedId] = useState<string | null>(null)

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <Zap size={18} className="text-primary" />
        <div>
          <h4 className="text-sm font-bold text-foreground">Animal Doodles</h4>
          <p className="text-xs text-muted-foreground">Click to add adorable animal overlays</p>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {PRESET_DOODLES.map((doodle) => (
          <button
            key={doodle.id}
            onClick={() => {
              setSelectedId(doodle.id)
              onSelectDoodle(doodle.src)
            }}
            className={`relative group p-3 rounded-xl border-2 transition-all duration-200 overflow-hidden aspect-square flex items-center justify-center ${
              selectedId === doodle.id
                ? 'border-primary bg-primary/10 shadow-lg shadow-primary/20 scale-105'
                : 'border-border/60 hover:border-primary/50 bg-card/40 hover:bg-card/70 hover:shadow-md'
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
                  selectedId === doodle.id ? 'drop-shadow-lg' : 'drop-shadow'
                }`}
                unoptimized
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-end justify-center pb-2 rounded-xl">
              <span className="text-xs font-semibold text-white">{doodle.name}</span>
            </div>
            {selectedId === doodle.id && (
              <div className="absolute top-2 right-2 w-5 h-5 bg-primary rounded-full flex items-center justify-center shadow-lg">
                <Sparkles size={12} className="text-white" />
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  )
}
