import type { Config } from "tailwindcss";

/**
 * ============================================================================
 * TAILWIND CONFIGURATION
 * ============================================================================
 * 
 * Enhanced design system configuration for Elektroluma
 * 
 * Features:
 * - Consistent color palette (primary, accent, semantic colors)
 * - Typography scale
 * - Spacing scale
 * - Shadow system
 * - Border radius system
 * - Animation utilities
 * - Component-ready tokens
 */

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  
  theme: {
    extend: {
      // ============================================================================
      // COLOR SYSTEM
      // ============================================================================
      colors: {
        // Brand Colors
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',  // Main brand color
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
          950: '#082f49',
        },
        accent: {
          50: '#fef3c7',
          100: '#fef08a',
          200: '#fde047',
          300: '#facc15',
          400: '#eab308',  // Main accent color
          500: '#ca8a04',
          600: '#a16207',
          700: '#854d0e',
          800: '#713f12',
          900: '#422006',
        },
        // Semantic Colors (for UI components)
        success: {
          50: '#f0fdf4',
          100: '#dcfce7',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
        },
        warning: {
          50: '#fffbeb',
          100: '#fef3c7',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
        },
        error: {
          50: '#fef2f2',
          100: '#fee2e2',
          500: '#ef4444',
          600: '#dc2626',
          700: '#b91c1c',
        },
        info: {
          50: '#eff6ff',
          100: '#dbeafe',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
        },
      },

      // ============================================================================
      // TYPOGRAPHY SYSTEM
      // ============================================================================
      fontSize: {
        // Display sizes (for hero sections)
        'display-2xl': ['4.5rem', { lineHeight: '1', letterSpacing: '-0.02em', fontWeight: '700' }],
        'display-xl': ['3.75rem', { lineHeight: '1', letterSpacing: '-0.02em', fontWeight: '700' }],
        'display-lg': ['3rem', { lineHeight: '1.1', letterSpacing: '-0.02em', fontWeight: '700' }],
        'display-md': ['2.25rem', { lineHeight: '1.2', letterSpacing: '-0.01em', fontWeight: '700' }],
        'display-sm': ['1.875rem', { lineHeight: '1.3', letterSpacing: '-0.01em', fontWeight: '600' }],
      },

      // ============================================================================
      // SPACING SYSTEM (for consistent component spacing)
      // ============================================================================
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '100': '25rem',
        '112': '28rem',
        '128': '32rem',
      },

      // ============================================================================
      // SHADOW SYSTEM (elevation levels)
      // ============================================================================
      boxShadow: {
        'sm': '0 1px 2px 0 rgb(0 0 0 / 0.05)',
        'DEFAULT': '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
        'md': '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
        'lg': '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
        'xl': '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
        '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
        '3xl': '0 35px 60px -15px rgba(0, 0, 0, 0.3)',
        // Custom brand shadows
        'primary': '0 10px 40px -10px rgba(2, 132, 199, 0.4)',
        'accent': '0 10px 40px -10px rgba(234, 179, 8, 0.4)',
        'glow': '0 0 30px rgba(14, 165, 233, 0.3)',
        'glow-accent': '0 0 30px rgba(234, 179, 8, 0.3)',
      },

      // ============================================================================
      // BORDER RADIUS SYSTEM
      // ============================================================================
      borderRadius: {
        'sm': '0.25rem',    // 4px
        'DEFAULT': '0.5rem', // 8px
        'md': '0.75rem',     // 12px
        'lg': '1rem',        // 16px
        'xl': '1.25rem',     // 20px
        '2xl': '1.5rem',     // 24px
        '3xl': '2rem',       // 32px
        'button': '9999px',  // Full rounded for buttons
      },

      // ============================================================================
      // ANIMATION SYSTEM
      // ============================================================================
      animation: {
        // Entrance animations
        'fade-in': 'fadeIn 0.6s ease-out',
        'fade-in-up': 'fadeInUp 0.6s ease-out',
        'fade-in-down': 'fadeInDown 0.6s ease-out',
        'slide-in-right': 'slideInRight 0.6s ease-out',
        'slide-in-left': 'slideInLeft 0.6s ease-out',
        'scale-in': 'scaleIn 0.4s ease-out',
        
        // Interactive animations
        'bounce-slow': 'bounce 3s infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow': 'spin 3s linear infinite',
        
        // Component-specific
        'shimmer': 'shimmer 2s linear infinite',
        'gradient-shift': 'gradientShift 3s ease infinite',
      },

      keyframes: {
        // Fade animations
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInDown: {
          '0%': { opacity: '0', transform: 'translateY(-20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        
        // Slide animations
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        
        // Scale animation
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.9)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        
        // Special effects
        shimmer: {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
        gradientShift: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
      },

      // ============================================================================
      // BACKGROUND GRADIENTS
      // ============================================================================
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'gradient-primary': 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)',
        'gradient-accent': 'linear-gradient(135deg, #eab308 0%, #ca8a04 100%)',
        'shimmer': 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.8) 50%, transparent 100%)',
      },

      // ============================================================================
      // Z-INDEX SYSTEM
      // ============================================================================
      zIndex: {
        '1': '1',
        '10': '10',
        '20': '20',
        '30': '30',
        '40': '40',
        '50': '50',
        'dropdown': '1000',
        'modal': '2000',
        'tooltip': '3000',
        'notification': '4000',
      },

      // ============================================================================
      // TRANSITION SYSTEM
      // ============================================================================
      transitionDuration: {
        '400': '400ms',
        '600': '600ms',
        '800': '800ms',
      },
      
      transitionTimingFunction: {
        'bounce-in': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
        'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
    },
  },

  // ============================================================================
  // PLUGINS
  // ============================================================================
  plugins: [
    require('@tailwindcss/typography'),
    // Add more plugins as needed:
    // require('@tailwindcss/forms'),
    // require('@tailwindcss/aspect-ratio'),
  ],
};

export default config;