export type ThemeType = 'default' | 'minimalistic' | 'medtech' | 'coquette'

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

export const THEME_CONFIG: Record<ThemeType, ThemeColors> = {
  default: {
    primary: '#0EA5E9', // Sky blue
    secondary: '#06B6D4', // Cyan
    background: '#0F172A', // Dark slate
    backgroundAlt: '#1E293B', // Lighter slate
    foreground: '#F1F5F9', // Almost white
    border: '#334155', // Border gray
    accent: '#10B981', // Emerald
    cardBg: 'rgba(15, 23, 42, 0.8)',
  },
  minimalistic: {
    primary: '#000000', // Pure black
    secondary: '#666666', // Dark gray
    background: '#FFFFFF', // Pure white
    backgroundAlt: '#F5F5F5', // Light gray
    foreground: '#000000', // Black text
    border: '#E0E0E0', // Light border
    accent: '#333333', // Dark gray accent
    cardBg: 'rgba(255, 255, 255, 0.95)',
  },
  medtech: {
    primary: '#0369A1', // Sky blue 700
    secondary: '#0284C7', // Sky blue 600
    background: '#0C2340', // Deep blue
    backgroundAlt: '#134E7A', // Medical blue
    foreground: '#ECF0F1', // Light text
    border: '#0F6CB6', // Medium blue
    accent: '#06B6D4', // Cyan accent
    cardBg: 'rgba(12, 35, 64, 0.85)',
  },
  coquette: {
    primary: '#EC4899', // Pink 500
    secondary: '#DB2777', // Pink 600
    background: '#FDF2F8', // Very light pink
    backgroundAlt: '#FBECF3', // Light pink
    foreground: '#831843', // Dark rose text
    border: '#FBCFE8', // Light pink border
    accent: '#F472B6', // Light pink accent
    cardBg: 'rgba(253, 242, 248, 0.95)',
  },
}

export const THEME_LABELS: Record<ThemeType, string> = {
  default: 'Default',
  minimalistic: 'Minimalistic',
  medtech: 'Medtech',
  coquette: 'Coquette',
}
