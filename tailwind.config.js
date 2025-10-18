/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)', 'Inter', 'sans-serif'],
        display: ['Inter', 'sans-serif'], // For display sizes
        body: ['Inter', 'sans-serif'], // For text sizes
      },
      fontSize: {
        // Display sizes (Satoshi equivalent)
        'display-2xl': ['72px', { lineHeight: '90px', letterSpacing: '-0.02em' }],
        'display-xl': ['60px', { lineHeight: '72px', letterSpacing: '-0.02em' }],
        'display-lg': ['48px', { lineHeight: '60px', letterSpacing: '-0.02em' }],
        'display-md': ['36px', { lineHeight: '44px', letterSpacing: '-0.02em' }],
        'display-sm': ['30px', { lineHeight: '38px', letterSpacing: '-0.02em' }],
        'display-xs': ['24px', { lineHeight: '32px', letterSpacing: '-0.02em' }],
        
        // Text sizes (Inter) - using different naming to avoid conflicts
        'body-xl': ['20px', { lineHeight: '30px' }],
        'body-lg': ['18px', { lineHeight: '28px' }],
        'body-md': ['16px', { lineHeight: '24px' }],
        'body-sm': ['14px', { lineHeight: '20px' }],
        'body-xs': ['12px', { lineHeight: '18px' }],
      },
      fontWeight: {
        normal: '400',
        medium: '500',
        semibold: '600',
        bold: '700',
      },
      colors: {
        // Primary Colors (Green)
        primary: {
          50: '#f0f9f0',
          75: '#e8f5e8',
          100: '#dcf2dc',
          200: '#bce5bc',
          300: '#8dd18d',
          400: '#56b856',
          500: '#2E7D32', // Base (B)
          600: '#256b28', // Hover (H)
          700: '#00875A', // Active (A)
          800: '#1c4a1e',
          900: '#173d1a',
        },
        
        // Secondary Colors (Blue)
        secondary: {
          50: '#eff6ff',
          75: '#dbeafe',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#227AC6', // Base (B)
          600: '#1d68a3', // Hover (H)
          700: '#185680', // Active (A)
          800: '#13445d',
          900: '#0e323a',
        },
        
        // Accent Colors (Purple)
        accent: {
          50: '#faf5ff',
          100: '#f3e8ff',
          200: '#e9d5ff',
          300: '#d8b4fe',
          400: '#c084fc',
          500: '#9333EA', // Base (B)
          600: '#7c2d9a', // Hover (H)
          700: '#65277a', // Active (A)
          800: '#4e215a',
          900: '#371b3a',
        },
        
        // Gray Colors
        gray: {
          50: '#f9fafb',
          75: '#e5e7eb',
          100: '#f3f4f6',
          200: '#e5e7eb',
          300: '#d1d5db',
          400: '#9ca3af',
          500: '#6b7280', // Base (B)
          600: '#4b5563', // Hover (H)
          700: '#374151', // Active (A)
          800: '#1f2937',
          900: '#111827',
        },
        
        // Success Colors (Green)
        success: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e', // Base (B)
          600: '#16a34a', // Hover (H)
          700: '#15803d', // Active (A)
          800: '#166534',
          900: '#14532d',
          text: '#00875A',
          bg: '#EBFFF8',
        },
        
        // Error Colors (Red)
        error: {
          50: '#fef2f2',
          100: '#fee2e2',
          200: '#fecaca',
          300: '#fca5a5',
          400: '#f87171',
          500: '#ef4444', // Base (B)
          600: '#dc2626', // Hover (H)
          700: '#b91c1c', // Active (A)
          800: '#991b1b',
          900: '#7f1d1d',
          text: '#D32F2F',
          bg: '#FBEEEE',
        },
        
        // Warning Colors (Yellow/Orange)
        warning: {
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b', // Base (B)
          600: '#d97706', // Hover (H)
          700: '#b45309', // Active (A)
          800: '#92400e',
          900: '#78350f',
          text: '#F5A623',
          bg: '#FEF7EB',
        },
        
        // Info Colors (Cyan)
        info: {
          50: '#ecfeff',
          100: '#cffafe',
          200: '#a5f3fc',
          300: '#67e8f9',
          400: '#22d3ee',
          500: '#06b6d4', // Base (B)
          600: '#0891b2', // Hover (H)
          700: '#0e7490', // Active (A)
          800: '#155e75',
          900: '#164e63',
          text: '#227AC6',
          bg: '#EEF5FC',
        },
        
        // Typography Colors
        'heading-text': '#111827', // Gray 900
        'body-text': '#1f2937', // Gray 800
        'muted-text': '#9ca3af', // Gray 400
        'placeholder-text': '#d1d5db', // Gray 300
        'disabled-text': '#d1d5db', // Gray 300
        
        // Special Colors
        white: '#FFFFFF',
        'text-body': '#A5ACC2',
        'text-supporting': '#6E6E6E',
        'icon-light': '#555555',
        'alert-card-bg': '#F4F4F4',
        'bg-light': '#F9FAFB',
        'text-body-light': '#1A1A1A',
        'text-body-dark': '#E0E0E0',
        'surface-dark': '#252525',
        'surface-dark-2': '#292929',
      },
      spacing: {
        // Design System Spacing Variables (16px base)
        'spacing-none': '0rem',     // 0px
        'spacing-xxs': '0.125rem',  // 2px
        'spacing-xs': '0.25rem',    // 4px
        'spacing-sm': '0.375rem',   // 6px
        'spacing-md': '0.5rem',     // 8px
        'spacing-lg': '0.75rem',    // 12px
        'spacing-xl': '1rem',       // 16px
        'spacing-2xl': '1.25rem',   // 20px
        'spacing-3xl': '1.5rem',    // 24px
        'spacing-4xl': '2rem',      // 32px
        'spacing-5xl': '2.5rem',    // 40px
        'spacing-6xl': '3rem',      // 48px
        'spacing-7xl': '4rem',      // 64px
        'spacing-8xl': '5rem',      // 80px
        'spacing-9xl': '6rem',      // 96px
        'spacing-10xl': '8rem',     // 128px
        'spacing-11xl': '10rem',    // 160px
        
        // Legacy spacing (keeping for compatibility)
        '0': '0px',      // 0rem
        '0.5': '2px',    // 0.125rem
        '1': '4px',      // 0.25rem
        '1.5': '6px',    // 0.375rem
        '2': '8px',      // 0.5rem
        '3': '12px',     // 0.75rem
        '4': '16px',     // 1rem
        '5': '20px',     // 1.25rem
        '6': '24px',     // 1.5rem
        '8': '32px',     // 2rem
        '10': '40px',    // 2.5rem
        '12': '48px',    // 3rem
        '16': '64px',    // 4rem
        '20': '80px',    // 5rem
        '24': '96px',    // 6rem
        '32': '128px',   // 8rem
        '40': '160px',   // 10rem
        '48': '192px',   // 12rem
        '56': '224px',   // 14rem
        '64': '256px',   // 16rem
        '80': '320px',   // 20rem
        '96': '384px',   // 24rem
        '120': '480px',  // 30rem
        '140': '560px',  // 35rem
        '160': '640px',  // 40rem
        '180': '720px',  // 45rem
        '192': '768px',  // 48rem
        '256': '1024px', // 64rem
        '320': '1280px', // 80rem
        '360': '1440px', // 90rem
        '400': '1600px', // 100rem
        '480': '1920px', // 120rem
        '18': '4.5rem',
        '88': '22rem',
      },
      borderRadius: {
        // Radius System from Figma
        'none': '0px',
        'xxs': '2px',    // 0.125rem
        'xs': '4px',     // 0.25rem
        'sm': '6px',     // 0.375rem
        'md': '8px',     // 0.5rem
        'lg': '10px',    // 0.625rem
        'xl': '12px',    // 0.75rem
        '2xl': '16px',   // 1rem
        '3xl': '20px',   // 1.25rem
        '4xl': '24px',   // 1.5rem
        'full': '9999px', // Full pill shape
      },
      screens: {
        // Grid Layouts from Figma
        'tablet': '768px',   // Tablet breakpoint
        'desktop': '1280px', // Desktop breakpoint
      },
      maxWidth: {
        // Design System Width Variables (16px base)
        'width-xxs': '20rem',   // 320px
        'width-xs': '24rem',    // 384px
        'width-sm': '30rem',    // 480px
        'width-md': '35rem',    // 560px
        'width-lg': '40rem',    // 640px
        'width-xl': '48rem',    // 768px
        'width-2xl': '64rem',   // 1024px
        'width-3xl': '80rem',   // 1280px
        'width-4xl': '90rem',   // 1440px
        'width-5xl': '100rem',  // 1600px
        'width-6xl': '120rem',  // 1920px
        
        // Container Variables
        'container-padding-mobile': '1rem',      // 16px
        'container-padding-desktop': '2rem',     // 32px
        'container-max-width-desktop': '80rem',  // 1280px
        
        // Paragraph Variables
        'paragraph-max-width': '45rem',         // 720px
        
        // Legacy container widths (keeping for compatibility)
        'tablet': '704px',   // Tablet content width (768px - 64px padding)
        'desktop': '1216px', // Desktop content width (1280px - 64px padding)
      },
      boxShadow: {
        'modal': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
      },
    },
  },
  plugins: [],
}
