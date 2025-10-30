/**
 * ============================================================================
 * OG IMAGE DESIGN SYSTEM
 * ============================================================================
 * 
 * Centralized design tokens for Open Graph images that match
 * Tailwind config and globals.css
 * 
 * These values are used in opengraph-image.tsx files across the app.
 */

/**
 * Brand Colors (from tailwind.config.ts)
 */
export const COLORS = {
  // Primary brand colors
  primary: {
    50: '#f0f9ff',
    100: '#e0f2fe',
    500: '#0ea5e9',
    600: '#0284c7', // Main brand color
    700: '#0369a1',
    900: '#0c4a6e',
  },
  
  // Accent colors
  accent: {
    100: '#fef08a',
    400: '#eab308', // Main accent
    500: '#ca8a04',
  },
  
  // Semantic colors
  success: '#22c55e',
  warning: '#f59e0b',
  error: '#ef4444',
  
  // Grayscale
  white: '#ffffff',
  black: '#000000',
  gray: {
    50: '#f9fafb',
    100: '#f3f4f6',
    200: '#e5e7eb',
    300: '#d1d5db',
    400: '#9ca3af',
    500: '#6b7280',
    600: '#4b5563',
    700: '#374151',
    800: '#1f2937',
    900: '#111827',
  },
} as const;

/**
 * Brand Gradients (from tailwind.config.ts)
 */
export const GRADIENTS = {
  // Primary gradient (cool blue)
  primary: 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)',
  
  // Primary with purple accent (for variety)
  primaryPurple: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  
  // Accent gradient (warm yellow)
  accent: 'linear-gradient(135deg, #eab308 0%, #ca8a04 100%)',
  
  // Success gradient
  success: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
  
  // Subtle gradients for backgrounds
  subtleBlue: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)',
  subtleGray: 'linear-gradient(135deg, #f9fafb 0%, #f3f4f6 100%)',
} as const;

/**
 * Typography Scale (matches display sizes from tailwind)
 */
export const TYPOGRAPHY = {
  // Display sizes (hero text)
  display2xl: { size: 72, lineHeight: 1, weight: 'bold' as const },
  displayXl: { size: 60, lineHeight: 1, weight: 'bold' as const },
  displayLg: { size: 48, lineHeight: 1.1, weight: 'bold' as const },
  displayMd: { size: 36, lineHeight: 1.2, weight: 'bold' as const },
  displaySm: { size: 30, lineHeight: 1.3, weight: '600' as const },
  
  // Body text
  xl: { size: 24, lineHeight: 1.4, weight: '600' as const },
  lg: { size: 20, lineHeight: 1.5, weight: 'normal' as const },
  base: { size: 18, lineHeight: 1.5, weight: 'normal' as const },
  sm: { size: 16, lineHeight: 1.5, weight: 'normal' as const },
} as const;

/**
 * OG Image Dimensions (standard sizes)
 */
export const DIMENSIONS = {
  og: { width: 1200, height: 630 },
  twitter: { width: 1200, height: 630 },
  square: { width: 1200, height: 1200 },
} as const;

/**
 * Spacing System (from tailwind)
 */
export const SPACING = {
  xs: 8,
  sm: 12,
  md: 16,
  lg: 24,
  xl: 32,
  '2xl': 40,
  '3xl': 48,
  '4xl': 60,
  '5xl': 80,
  '6xl': 100,
} as const;

/**
 * Border Radius (from tailwind)
 */
export const RADIUS = {
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  '2xl': 20,
  '3xl': 24,
  full: 9999,
} as const;

/**
 * Brand Assets
 */
export const BRAND = {
  name: 'Elektroluma',
  emoji: '⚡',
  tagline: 'AI-Powered Invoice Automation for UK Small Businesses',
  url: 'elektroluma.com',
} as const;

/**
 * Common Style Presets
 */
export const STYLE_PRESETS = {
  // Text shadow for readability on gradients
  textShadow: {
    subtle: '0 2px 8px rgba(0, 0, 0, 0.1)',
    medium: '0 4px 12px rgba(0, 0, 0, 0.2)',
    strong: '0 6px 16px rgba(0, 0, 0, 0.3)',
  },
  
  // Box shadows (elevation)
  boxShadow: {
    sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    md: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
    lg: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
    xl: '0 20px 25px -5px rgb(0 0 0 / 0.1)',
  },
  
  // Glass effect (backdrop blur)
  glass: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    backdropFilter: 'blur(10px)',
  },
  
  // Opacity values
  opacity: {
    light: 0.9,
    medium: 0.8,
    subtle: 0.6,
  },
} as const;

/**
 * Layout Presets for different OG image types
 */
export const LAYOUTS = {
  // Hero layout: Large text, gradient background
  hero: {
    padding: SPACING['5xl'],
    contentMaxWidth: 1000,
    alignment: 'center' as const,
  },
  
  // Feature layout: Icon + text, clean background
  feature: {
    padding: SPACING['4xl'],
    contentMaxWidth: 900,
    alignment: 'flex-start' as const,
  },
  
  // Article layout: Title focused, minimal decoration
  article: {
    padding: SPACING['5xl'],
    contentMaxWidth: 1000,
    alignment: 'flex-start' as const,
  },
  
  // Comparison layout: Split screen design
  comparison: {
    padding: SPACING['4xl'],
    contentMaxWidth: 1100,
    alignment: 'space-between' as const,
  },
} as const;

/**
 * Icon Presets (emoji icons matching Lucide alternatives)
 */
export const ICONS = {
  // Features
  zap: '⚡',
  sparkles: '✨',
  check: '✓',
  star: '⭐',
  
  // Actions
  arrow: '→',
  download: '⬇',
  upload: '⬆',
  
  // Content
  document: '📄',
  invoice: '🧾',
  chart: '📊',
  money: '💰',
  
  // Business
  building: '🏢',
  users: '👥',
  globe: '🌍',
  
  // Time
  clock: '⏰',
  calendar: '📅',
  
  // Communication
  mail: '✉️',
  phone: '📱',
  message: '💬',
} as const;