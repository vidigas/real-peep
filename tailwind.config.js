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
        display: ['var(--font-inter)', 'Inter', 'sans-serif'],
        body: ['var(--font-inter)', 'Inter', 'sans-serif'],
      },
      fontSize: {
        'display-2xl': ['72px', { lineHeight: '90px', letterSpacing: '-0.02em' }],
        'display-xl': ['60px', { lineHeight: '72px', letterSpacing: '-0.02em' }],
        'display-lg': ['48px', { lineHeight: '60px', letterSpacing: '-0.02em' }],
        'display-md': ['36px', { lineHeight: '44px', letterSpacing: '-0.02em' }],
        'display-sm': ['30px', { lineHeight: '38px', letterSpacing: '-0.02em' }],
        'display-xs': ['24px', { lineHeight: '32px', letterSpacing: '-0.02em' }],
        'body-xl': ['20px', { lineHeight: '30px' }],
        'body-lg': ['18px', { lineHeight: '28px' }],
        'body-md': ['16px', { lineHeight: '24px' }],
        'body-sm': ['14px', { lineHeight: '20px' }],
        'body-xs': ['12px', { lineHeight: '18px' }],
      },
      colors: {
        // Brand — **700 is the main**
        primary: {
          50: '#f0f9f0',
          75: '#e8f5e8',
          100: '#dcf2dc',
          200: '#bce5bc',
          300: '#8dd18d',
          400: '#56b856',
          500: '#2E7D32',      // legacy / alt
          600: '#256b28',
          700: '#00875A',      // 🔶 brand main
          800: '#006E48',      // hover on dark / pressed alt
          900: '#00563A',
        },

        secondary: { 50:'#eff6ff',75:'#dbeafe',100:'#dbeafe',200:'#bfdbfe',300:'#93c5fd',400:'#60a5fa',500:'#227AC6',600:'#1d68a3',700:'#185680',800:'#13445d',900:'#0e323a' },
        accent:    { 50:'#faf5ff',100:'#f3e8ff',200:'#e9d5ff',300:'#d8b4fe',400:'#c084fc',500:'#9333EA',600:'#7c2d9a',700:'#65277a',800:'#4e215a',900:'#371b3a' },

        // Neutrals / text / surfaces
        white: '#FFFFFF',
        'bg-light': '#F9FAFB',
        'surface': '#FFFFFF',
        'surface-dark': '#1E1E1E',
        'surface-dark-2': '#292929',
        'heading-text': '#111827',
        'body-text': '#1A1A1A',
        'muted-text': '#6E6E6E',
        'placeholder-text': '#D1D5DB',
        'disabled-text': '#D1D5DB',

        gray: { 50:'#F9FAFB',75:'#E5E7EB',100:'#F3F4F6',200:'#E5E7EB',300:'#D1D5DB',400:'#9CA3AF',500:'#6B7280',600:'#4B5563',700:'#374151',800:'#1F2937',900:'#111827' },

        // Semantics (with text/bg helpers from your sheet)
        success: { 500:'#22C55E',600:'#16A34A',700:'#15803D', text:'#00875A', bg:'#EBFFF8' },
        warning: { 500:'#F59E0B',600:'#D97706',700:'#B45309', text:'#F5A623', bg:'#FEF7EB' },
        error:   { 500:'#EF4444',600:'#DC2626',700:'#B91C1C', text:'#D32F2F', bg:'#FBEEEE' },
        info:    { 500:'#06B6D4',600:'#0891B2',700:'#0E7490', text:'#227AC6', bg:'#EEF5FC' },

        // Misc from screenshot
        'icon-light': '#555555',
        'alert-card-bg': '#F4F4F4',
        'text-body': '#A5ACC2',
        'text-body-light': '#1A1A1A',
        'text-body-dark': '#E0E0E0',
      },

      // Spacing / radii / layout (kept as you sent)
      spacing: {
        'spacing-none':'0rem','spacing-xxs':'0.125rem','spacing-xs':'0.25rem','spacing-sm':'0.375rem','spacing-md':'0.5rem','spacing-lg':'0.75rem','spacing-xl':'1rem','spacing-2xl':'1.25rem','spacing-3xl':'1.5rem','spacing-4xl':'2rem','spacing-5xl':'2.5rem','spacing-6xl':'3rem','spacing-7xl':'4rem','spacing-8xl':'5rem','spacing-9xl':'6rem','spacing-10xl':'8rem','spacing-11xl':'10rem',
        '0':'0px','0.5':'2px','1':'4px','1.5':'6px','2':'8px','3':'12px','4':'16px','5':'20px','6':'24px','8':'32px','10':'40px','12':'48px','16':'64px','20':'80px','24':'96px','32':'128px','40':'160px','48':'192px','56':'224px','64':'256px','80':'320px','96':'384px','120':'480px','140':'560px','160':'640px','180':'720px','192':'768px','256':'1024px','320':'1280px','360':'1440px','400':'1600px','480':'1920px','18':'4.5rem','88':'22rem',
      },
      borderRadius: { none:'0px', xxs:'2px', xs:'4px', sm:'6px', md:'8px', lg:'10px', xl:'12px', '2xl':'16px', '3xl':'20px', '4xl':'24px', full:'9999px' },
      screens: { tablet:'768px', desktop:'1280px' },
      maxWidth: {
        'width-xxs':'20rem','width-xs':'24rem','width-sm':'30rem','width-md':'35rem','width-lg':'40rem','width-xl':'48rem','width-2xl':'64rem','width-3xl':'80rem','width-4xl':'90rem','width-5xl':'100rem','width-6xl':'120rem',
        'container-padding-mobile':'1rem','container-padding-desktop':'2rem','container-max-width-desktop':'80rem',
        'paragraph-max-width':'45rem','tablet':'704px','desktop':'1216px',
      },
      boxShadow: { modal: '0 25px 50px -12px rgba(0,0,0,0.25)' },
    },
  },
  plugins: [],
}
