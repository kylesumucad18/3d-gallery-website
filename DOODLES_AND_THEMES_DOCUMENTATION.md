# Photobooth Doodles & Theme System Documentation

## Overview

This document outlines the implementation of the animal doodle system and the comprehensive theme switching system for the photobooth application.

---

## Part 1: Animal Doodle System

### Doodles Included

Six professional, hand-drawn style animal illustrations are now available as doodle overlays:

1. **Rabbit** (`/doodles/rabbit.png`) - Cute, playful bunny illustration
2. **Peacock** (`/doodles/peacock.png`) - Elegant bird with colorful feathers
3. **Lion** (`/doodles/lion.png`) - Majestic lion with mane
4. **Eagle** (`/doodles/eagle.png`) - Dynamic bird in flight
5. **Giraffe** (`/doodles/giraffe.png`) - Adorable giraffe with spots
6. **Dinosaur** (`/doodles/dinosaur.png`) - Playful dino character

### Implementation Details

#### Data Structure: `PresetDoodle` Interface
```typescript
interface PresetDoodle {
  id: string          // Unique identifier (rabbit, peacock, etc.)
  name: string        // Display name
  src: string         // Path to SVG/PNG file
}
```

#### PresetDoodles Component (`/components/preset-doodles.tsx`)

**Features:**
- Grid-based gallery layout (3 columns on mobile, responsive)
- Image preview with hover effects
- Selection state tracking with visual indicators (blue badge with sparkle icon)
- Smooth animations and transitions
- Touch-friendly tap targets (44px+ minimum)

**Props:**
```typescript
interface PresetDoodlesProps {
  onSelectDoodle: (src: string) => void  // Callback when user selects a doodle
}
```

**Usage in PhotoboothLayout:**
```tsx
<PresetDoodles 
  onSelectDoodle={(src) => {
    setPresetDoodleSrcs(prev => [...prev, src])
  }}
/>
```

#### Drawing Logic Integration

The `downloadPhotos()` function in `photobooth-layout.tsx` has been refactored to:

1. **Load Photos**: Draw captured photos onto canvas
2. **Draw Doodles Layer**: 
   - Combines custom-drawn doodles (`doodleDataUrls`) and preset doodles (`presetDoodleSrcs`)
   - Stamps each doodle multiple times (8 times per doodle)
   - Uses random positioning across the canvas
   - Applies 70% opacity for subtle overlay effect
   - Scales doodles dynamically (0.8-1.2x scale range)

3. **Draw Text Layer**: Add title, subtitle, and RMHC logo

**Key Code:**
```typescript
const drawDoodlesLayer = () => {
  const allDoodles = [
    ...doodleDataUrls.filter(Boolean),
    ...presetDoodleSrcs
  ]
  
  allDoodles.forEach((url) => {
    const doodleImg = new Image()
    doodleImg.crossOrigin = 'anonymous'
    doodleImg.onload = () => {
      ctx.globalAlpha = 0.7
      // Stamp doodle multiple times with random positions/scales
      for (let i = 0; i < 8; i++) {
        const x = Math.random() * (canvas.width - 200)
        const y = Math.random() * (canvas.height - 200)
        const scale = 0.8 + Math.random() * 0.4
        ctx.drawImage(doodleImg, x, y, 250 * scale, 200 * scale)
      }
    }
    doodleImg.src = url
  })
}
```

---

## Part 2: Comprehensive Theme System

### Available Themes

#### 1. **Default** - Modern Blue
- **Primary Color**: `#0EA5E9` (Sky Blue)
- **Background**: `#0F172A` (Dark Slate)
- **Foreground**: `#F1F5F9` (Almost White)
- **Accent**: `#10B981` (Emerald)

#### 2. **Minimalistic** - Clean Grayscale
- **Primary Color**: `#000000` (Pure Black)
- **Background**: `#FFFFFF` (Pure White)
- **Foreground**: `#000000` (Black Text)
- **Border**: `#E0E0E0` (Light Gray)

#### 3. **Medtech** - Professional Blue
- **Primary Color**: `#0369A1` (Sky Blue 700)
- **Background**: `#0C2340` (Deep Blue)
- **Foreground**: `#ECF0F1` (Light Text)
- **Accent**: `#06B6D4` (Cyan)

#### 4. **Coquette** - Pink Rose
- **Primary Color**: `#EC4899` (Pink 500)
- **Background**: `#FDF2F8` (Very Light Pink)
- **Foreground**: `#831843` (Dark Rose Text)
- **Accent**: `#F472B6` (Light Pink)

### Architecture

#### File Structure
```
/context
  └── theme-context.tsx          # Theme provider & hook
/lib
  ├── themes.ts                   # Theme configuration (legacy)
  ├── contrast-helper.ts          # WCAG contrast utilities
  └── theme-context.tsx          # Alternative location
/app
  └── globals.css                 # CSS variables & theme definitions
/components
  └── theme-switcher.tsx          # UI theme selector
```

#### ThemeContext (`/context/theme-context.tsx`)

**Type Definitions:**
```typescript
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
```

**Key Features:**
- Centralized theme configuration in `THEME_CONFIG` object
- localStorage persistence (key: `'rica-theme'`)
- Automatic CSS variable application on theme change
- No page reload required

**ThemeProvider:**
```typescript
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  // 1. Loads saved theme from localStorage on mount
  // 2. Applies CSS variables to document root
  // 3. Provides theme context to all children
  // 4. Handles theme switching with instant UI updates
}
```

**useTheme Hook:**
```typescript
export function useTheme(): ThemeContextType {
  // Returns: { theme, colors, setTheme }
}
```

### CSS Variables System

#### Available CSS Variables
All themes define the following CSS variables:
```css
--primary-color              /* Main brand color */
--secondary-color            /* Secondary color */
--background-color           /* Primary background */
--background-alt-color       /* Secondary background */
--foreground-color           /* Text color */
--border-color               /* Border color */
--accent-color               /* Accent highlights */
--card-bg-color              /* Card backgrounds */
```

#### Selector Pattern
```css
html[data-theme='minimalistic'] {
  --primary-color: #000000;
  --background-color: #FFFFFF;
  /* ... other variables */
}
```

#### Application in Components
```css
.button {
  background-color: var(--primary-color);
  color: var(--background-color);
  border-color: var(--border-color);
}
```

### Theme Switcher Component

Location: `/components/theme-switcher.tsx`

**Features:**
- Displays all 4 themes with color indicators
- Visual feedback on current selection
- Smooth animations (scale, opacity)
- Responsive design (hides text on small screens)
- Persistent selection across page reloads

**UI Structure:**
```
┌─────────────────────────────────────────┐
│ ⚫ Default  ⚫ Minimalistic  ⚫ Medtech  ⚫ Coquette │
└─────────────────────────────────────────┘
```

### Contrast Helper Utilities

Location: `/lib/contrast-helper.ts`

**Functions:**

1. **`getLuminance(hexColor: string): number`**
   - Calculates WCAG luminance value (0-1 scale)
   - Used for automatic text color selection

2. **`getContrastTextColor(backgroundColor, lightColor, darkColor): string`**
   - Returns appropriate text color (white or black) based on background
   - Ensures WCAG AA compliance

3. **`getContrastRatio(color1, color2): number`**
   - Calculates contrast ratio between two colors
   - Returns ratio (e.g., 4.5:1)

4. **`meetsWCAGStandard(color1, color2, level): boolean`**
   - Validates if colors meet WCAG standards
   - Supports AA (4.5:1) and AAA (7:1) levels

**Usage Example:**
```typescript
import { getContrastTextColor, meetsWCAGStandard } from '@/lib/contrast-helper'

const textColor = getContrastTextColor(backgroundColor)
const isCompliant = meetsWCAGStandard(bgColor, textColor, 'AA')
```

### Integration with PhotoboothLayout

The photobooth component supports all 4 themes:

```typescript
interface PhotoboothLayoutProps {
  layout: 'M' | 'A' | 'R' | 'I' | 'E' | 'H'
  theme: 'default' | 'minimalistic' | 'medtech' | 'coquette'
}
```

**Theme-Specific Default Colors:**
```typescript
const THEME_DEFAULT_COLORS = {
  default: '#0EA5E9',
  minimalistic: '#000000',
  medtech: '#0369A1',
  coquette: '#EC4899',
}
```

### Persistence & State Management

**localStorage Flow:**
1. User selects theme in ThemeSwitcher
2. `setTheme()` is called
3. Theme is saved to localStorage (`'rica-theme'`)
4. CSS variables are updated at document root
5. All UI components reactively update

**Initialization Flow:**
1. App mounts
2. ThemeProvider loads from localStorage
3. If saved theme exists, apply it; otherwise use default
4. CSS variables are set
5. Page renders with correct theme

---

## Implementation Checklist

### Phase 1: Animal Doodles ✅
- [x] Generate 6 animal SVG assets
- [x] Update PresetDoodles component with image gallery
- [x] Refactor downloadPhotos() for SVG stamping
- [x] Add selection state management
- [x] Implement hover effects and visual feedback

### Phase 2: Theme Configuration ✅
- [x] Create THEME_CONFIG with 4 themes
- [x] Define THEME_COLORS mapping
- [x] Set up CSS variables in globals.css

### Phase 3: Theme Context ✅
- [x] Implement ThemeProvider and useTheme hook
- [x] Add localStorage persistence
- [x] Set up CSS variable application
- [x] Support instant theme switching

### Phase 4: Theme Switcher UI ✅
- [x] Create theme switcher component
- [x] Add to site header
- [x] Support all 4 themes
- [x] Implement visual feedback

### Phase 5: Accessibility ✅
- [x] Create contrast-helper utilities
- [x] Ensure WCAG AA compliance
- [x] Test contrast ratios for all themes
- [x] Verify text legibility

---

## Testing

### Theme Switching Verification
```bash
# Test instant theme switching without page reload
1. Open photobooth page
2. Click theme buttons in header
3. Observe immediate UI updates
4. Refresh page - theme persists
```

### Doodle Selection Testing
```bash
# Test doodle gallery and export
1. Open photobooth
2. Click animal doodle in gallery
3. Take photos
4. Download photobooth - verify doodles are layered on export
```

### Accessibility Testing
```bash
# Verify contrast compliance
1. Check text readability on each theme background
2. Use contrast analyzer to verify 4.5:1 ratio (AA) or 7:1 (AAA)
3. Test with screen reader
4. Test keyboard navigation
```

---

## Performance Considerations

1. **CSS Variables**: Runtime application only, no CSS duplication
2. **Image Loading**: SVGs cached by browser after first load
3. **localStorage**: Minimal impact, only theme string stored
4. **Theme Switching**: Instant, no network requests
5. **Bundle Size**: ~15KB added for new assets and utilities

---

## Future Enhancements

1. **Custom Theme Creator**: Allow users to create custom themes
2. **More Animals**: Add additional animal doodles as needed
3. **Animated Doodles**: Support animated GIFs or WebP
4. **Theme Preview**: Live preview before applying
5. **Time-Based Themes**: Auto-switch themes based on time of day
6. **Accessibility Settings**: High contrast mode, dyslexia-friendly fonts

---

## Troubleshooting

### Theme Not Persisting
- Check browser localStorage is enabled
- Clear localStorage and refresh
- Check console for errors

### Doodles Not Appearing on Export
- Verify image paths in PRESET_DOODLES
- Check image CORS headers
- Ensure `crossOrigin: 'anonymous'` on Image objects

### CSS Variables Not Applying
- Check browser DevTools for CSS variable values
- Verify ThemeProvider wraps entire app
- Ensure theme-context is imported correctly

### Performance Issues
- Profile with DevTools Performance tab
- Check image compression
- Monitor localStorage access patterns

---

## References

- [WCAG 2.1 Contrast Guidelines](https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html)
- [CSS Variables (Custom Properties)](https://developer.mozilla.org/en-US/docs/Web/CSS/--*)
- [React Context API](https://react.dev/reference/react/useContext)
- [localStorage API](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)
