/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        prestige: {
          gold: '#D4AF37',
          navy: '#0A1128',
          cream: '#F9F7F2',
          dark: '#121212',
          accent: '#B08D57',
          'gold-alt': '#C4843B',
          'gold-soft': '#E8C97A',
          'wood-light': 'rgba(245, 225, 185, 0.85)',
          'wood-dark': '#3D1A0A',
          'wood-darkest': '#1A0800',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        playfair: ['var(--font-playfair)', 'serif'],
        display: ['var(--font-playfair)', 'serif'],
        cormorant: ['var(--font-cormorant)', 'serif'],
        'cormorant-garamond': ['var(--font-cormorant-garamond)', 'serif'],
        bebas: ['var(--font-bebas)', 'cursive'],
        outfit: ['var(--font-outfit)', 'sans-serif'],
        'dm-serif': ['var(--font-dm-serif)', 'serif'],
        'open-sans': ['var(--font-open-sans)', 'sans-serif'],
        merriweather: ['var(--font-merriweather)', 'serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-in-out',
        'slide-up': 'slideUp 0.6s ease-out',
        'scale-in': 'scaleIn 0.4s ease-out',
        'slow-zoom': 'slowZoom 14s ease-out forwards',
        'scan-line': 'scanLine 2s ease infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        slowZoom: {
          '0%': { transform: 'scale(1)' },
          '100%': { transform: 'scale(1.15)' },
        },
        scanLine: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' },
        },
      },
      boxShadow: {
        'hero-primary': '0 10px 30px rgba(232, 201, 122, 0.3)',
        'hero-primary-hover': '0 15px 45px rgba(232, 201, 122, 0.5)',
        'search-card': '0 20px 60px rgba(0, 0, 0, 0.5)',
        'tab-active': '0 4px 20px rgba(232, 201, 122, 0.4)',
      },
    },
  },
  plugins: [],
}






