'use client'

import { useTheme } from '@/context/theme-context'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'

function ThemeSwitcherInner() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center gap-2 p-1 bg-background/50 backdrop-blur-md border border-border rounded-full"
    >
      <button
        onClick={() => setTheme('minimalistic')}
        className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-all ${
          theme === 'minimalistic'
            ? 'bg-yellow-600 text-white shadow-md'
            : 'text-muted-foreground hover:text-foreground'
        }`}
        title="Minimalistic Default Theme"
      >
        Minimalistic
      </button>
      <button
        onClick={() => setTheme('medtech')}
        className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-all ${
          theme === 'medtech'
            ? 'bg-blue-500 text-white shadow-md'
            : 'text-muted-foreground hover:text-foreground'
        }`}
        title="Professional Blue Theme"
      >
        MedTech
      </button>
      <button
        onClick={() => setTheme('coquette')}
        className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-all ${
          theme === 'coquette'
            ? 'bg-pink-500 text-white shadow-md'
            : 'text-muted-foreground hover:text-foreground'
        }`}
        title="Pink Coquette Theme"
      >
        Coquette
      </button>
    </motion.div>
  )
}

export const ThemeSwitcher = dynamic(() => Promise.resolve(ThemeSwitcherInner), {
  ssr: false,
})
