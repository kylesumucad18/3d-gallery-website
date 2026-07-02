'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'

export type Theme = 'default' | 'minimalistic' | 'medtech' | 'coquette'

export interface ThemeColors {
  primary: string
  secondary: string
  background: string
  backgroundAlt: string
  foreground: string
  border: string
  accent: string
  cardBg: string
}

const THEME_CONFIG: Record<Theme, ThemeColors> = {
  default: {
    primary: '#0EA5E9',
    secondary: '#06B6D4',
    background: '#0F172A',
    backgroundAlt: '#1E293B',
    foreground: '#F1F5F9',
    border: '#334155',
    accent: '#10B981',
    cardBg: 'rgba(15, 23, 42, 0.8)',
  },
  minimalistic: {
    primary: '#000000',
    secondary: '#666666',
    background: '#FFFFFF',
    backgroundAlt: '#F5F5F5',
    foreground: '#000000',
    border: '#E0E0E0',
    accent: '#333333',
    cardBg: 'rgba(255, 255, 255, 0.95)',
  },
  medtech: {
    primary: '#0369A1',
    secondary: '#0284C7',
    background: '#0C2340',
    backgroundAlt: '#134E7A',
    foreground: '#ECF0F1',
    border: '#0F6CB6',
    accent: '#06B6D4',
    cardBg: 'rgba(12, 35, 64, 0.85)',
  },
  coquette: {
    primary: '#EC4899',
    secondary: '#DB2777',
    background: '#FDF2F8',
    backgroundAlt: '#FBECF3',
    foreground: '#831843',
    border: '#FBCFE8',
    accent: '#F472B6',
    cardBg: 'rgba(253, 242, 248, 0.95)',
  },
}

interface ThemeContextType {
  theme: Theme
  colors: ThemeColors
  setTheme: (theme: Theme) => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>('default')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const savedTheme = localStorage.getItem('rica-theme') as Theme | null
    const initialTheme = (savedTheme && THEME_CONFIG[savedTheme]) ? savedTheme : 'default'
    
    setThemeState(initialTheme)
    applyThemeColors(initialTheme)
    document.documentElement.setAttribute('data-theme', initialTheme)
    setMounted(true)
  }, [])

  const applyThemeColors = (selectedTheme: Theme) => {
    const colors = THEME_CONFIG[selectedTheme]
    const root = document.documentElement

    root.style.setProperty('--primary-color', colors.primary)
    root.style.setProperty('--secondary-color', colors.secondary)
    root.style.setProperty('--background-color', colors.background)
    root.style.setProperty('--background-alt-color', colors.backgroundAlt)
    root.style.setProperty('--foreground-color', colors.foreground)
    root.style.setProperty('--border-color', colors.border)
    root.style.setProperty('--accent-color', colors.accent)
    root.style.setProperty('--card-bg-color', colors.cardBg)
  }

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme)
    localStorage.setItem('rica-theme', newTheme)
    document.documentElement.setAttribute('data-theme', newTheme)
    applyThemeColors(newTheme)
  }

  if (!mounted) {
    return <>{children}</>
  }

  return (
    <ThemeContext.Provider value={{ theme, colors: THEME_CONFIG[theme], setTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}
