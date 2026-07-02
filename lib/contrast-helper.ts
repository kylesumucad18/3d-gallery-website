/**
 * Calculate luminance of a color using WCAG formula
 * https://www.w3.org/TR/WCAG20/#relativeluminancedef
 */
export function getLuminance(hexColor: string): number {
  const hex = hexColor.replace('#', '')
  const r = parseInt(hex.substring(0, 2), 16) / 255
  const g = parseInt(hex.substring(2, 4), 16) / 255
  const b = parseInt(hex.substring(4, 6), 16) / 255

  const luminance =
    0.2126 * (r <= 0.03928 ? r / 12.92 : Math.pow((r + 0.055) / 1.055, 2.4)) +
    0.7152 * (g <= 0.03928 ? g / 12.92 : Math.pow((g + 0.055) / 1.055, 2.4)) +
    0.0722 * (b <= 0.03928 ? b / 12.92 : Math.pow((b + 0.055) / 1.055, 2.4))

  return luminance
}

/**
 * Get appropriate text color (white or black) based on background color luminance
 * Ensures WCAG AA contrast compliance
 */
export function getContrastTextColor(
  backgroundColor: string,
  lightColor: string = '#FFFFFF',
  darkColor: string = '#000000'
): string {
  const luminance = getLuminance(backgroundColor)
  // If luminance is high (light background), use dark text; otherwise use light text
  return luminance > 0.5 ? darkColor : lightColor
}

/**
 * Calculate contrast ratio between two colors
 * https://www.w3.org/TR/WCAG20/#contrast-ratiodef
 */
export function getContrastRatio(
  color1: string,
  color2: string
): number {
  const lum1 = getLuminance(color1)
  const lum2 = getLuminance(color2)

  const lighter = Math.max(lum1, lum2)
  const darker = Math.min(lum1, lum2)

  return (lighter + 0.05) / (darker + 0.05)
}

/**
 * Check if contrast ratio meets WCAG standards
 * level: 'AA' (4.5:1) or 'AAA' (7:1)
 */
export function meetsWCAGStandard(
  color1: string,
  color2: string,
  level: 'AA' | 'AAA' = 'AA'
): boolean {
  const ratio = getContrastRatio(color1, color2)
  return level === 'AA' ? ratio >= 4.5 : ratio >= 7
}
