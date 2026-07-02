'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'
import { ThemeType, THEME_CONFIG, ThemeColors } from './themes'

interface ThemeContextType {
  currentTheme: ThemeType
  colors: ThemeColors
  setTheme: (theme: ThemeType) => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [currentTheme, setCurrentTheme] = useState<ThemeType>('default')
  const [mounted, setMounted] = useState(false)

  // Load theme from localStorage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('photobooth-theme') as ThemeType
    if (savedTheme && THEME_CONFIG[savedTheme]) {
      setCurrentTheme(savedTheme)
    }
    setMounted(true)
  }, [])

  // Save theme to localStorage and update CSS variables
  useEffect(() => {
    if (!mounted) return

    localStorage.setItem('photobooth-theme', currentTheme)

    const colors = THEME_CONFIG[currentTheme]
    const root = document.documentElement

    // Set CSS variables
    root.style.setProperty('--primary-color', colors.primary)
    root.style.setProperty('--secondary-color', colors.secondary)
    root.style.setProperty('--background-color', colors.background)
    root.style.setProperty('--background-alt-color', colors.backgroundAlt)
    root.style.setProperty('--foreground-color', colors.foreground)
    root.style.setProperty('--border-color', colors.border)
    root.style.setProperty('--accent-color', colors.accent)
    root.style.setProperty('--card-bg-color', colors.cardBg)
  }, [currentTheme, mounted])

  const handleSetTheme = (theme: ThemeType) => {
    setCurrentTheme(theme)
  }

  if (!mounted) {
    return <>{children}</>
  }

  return (
    <ThemeContext.Provider
      value={{
        currentTheme,
        colors: THEME_CONFIG[currentTheme],
        setTheme: handleSetTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme(): ThemeContextType {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}
