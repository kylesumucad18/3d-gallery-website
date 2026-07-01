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
    <div className="fixed top-6 right-6 z-50">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-2 p-2 bg-background/80 backdrop-blur-md border border-border rounded-full"
      >
        <button
          onClick={() => setTheme('minimalistic')}
          className={`px-4 py-2 rounded-full font-semibold transition-all ${
            theme === 'minimalistic'
              ? 'bg-blue-500 text-white shadow-lg'
              : 'text-muted-foreground hover:text-foreground'
          }`}
          title="Professional Blue Theme"
        >
          Minimalistic
        </button>
        <button
          onClick={() => setTheme('coquette')}
          className={`px-4 py-2 rounded-full font-semibold transition-all ${
            theme === 'coquette'
              ? 'bg-pink-500 text-white shadow-lg'
              : 'text-muted-foreground hover:text-foreground'
          }`}
          title="Pink Coquette Theme"
        >
          Coquette
        </button>
      </motion.div>
    </div>
  )
}

export const ThemeSwitcher = dynamic(() => Promise.resolve(ThemeSwitcherInner), {
  ssr: false,
})
