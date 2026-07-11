'use client'

import { useTheme, type Theme } from '@/context/theme-context'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'

const THEME_COLORS: Record<Theme, { bg: string; text: string; description: string; label: string }> = {
  default: { bg: '#0EA5E9', text: '#FFFFFF', description: 'Modern Blue', label: 'Classic' },
  minimalistic: { bg: '#000000', text: '#FFFFFF', description: 'Grayscale', label: 'Minimal' },
  medtech: { bg: '#0369A1', text: '#FFFFFF', description: 'Medical Blue', label: 'Elegant' },
  coquette: { bg: '#EC4899', text: '#FFFFFF', description: 'Pink Rose', label: 'Romantic' },
}

function ThemeSwitcherInner() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const themeEntries: Array<[Theme, { bg: string; text: string; description: string; label: string }]> = Object.entries(
    THEME_COLORS
  ) as any

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center gap-1.5 p-1.5 bg-card/50 backdrop-blur-md border border-border/50 rounded-full shadow-lg hover:shadow-xl transition-shadow"
    >
      {themeEntries.map(([themeKey, { bg, text, description, label }]) => (
        <motion.button
          key={themeKey}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setTheme(themeKey)}
          className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 ${
            theme === themeKey
              ? 'text-white shadow-md ring-2 ring-offset-1'
              : 'text-muted-foreground hover:text-foreground'
          }`}
          style={{
            backgroundColor: theme === themeKey ? bg : 'transparent',
            '--tw-ring-color': theme === themeKey ? bg : 'transparent',
          } as any}
          title={description}
        >
          {label}
        </motion.button>
      ))}
    </motion.div>
  )
}

export const ThemeSwitcher = dynamic(() => Promise.resolve(ThemeSwitcherInner), {
  ssr: false,
})
