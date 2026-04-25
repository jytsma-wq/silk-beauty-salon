import type { Config } from 'tailwindcss'
import tailwindcssAnimate from 'tailwindcss-animate'

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          bg: '#FFFFFF',
          'bg-alt': '#F8F8F8',
          text: '#000000',
          'text-nav': '#21251F',
          'text-muted': '#5B6B7D',
          'text-on-dark': '#FFFFFF',
          accent: '#2E86C1',
          'btn-solid': '#0F0F10',
        },
      },
      fontFamily: {
        heading: ['Playfair Display', 'Georgia', 'serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
      },
      maxWidth: {
        'container': '1265px',
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '26': '6.5rem',
        '30': '7.5rem',
      },
      fontSize: {
        'cta': ['0.6875rem', { letterSpacing: '0.103125rem', lineHeight: '1.4' }],
        'nav-utility': ['0.625rem', { letterSpacing: '0.09375rem', lineHeight: '1.4' }],
        'nav-main': ['0.9375rem', { letterSpacing: '0.009375rem', lineHeight: '1.4' }],
      },
      keyframes: {
        'fade-in': { '0%': { opacity: '0' }, '100%': { opacity: '1' } },
        'slide-up': { '0%': { opacity: '0', transform: 'translateY(20px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
      },
      animation: {
        'fade-in': 'fade-in 0.6s ease-out forwards',
        'slide-up': 'slide-up 0.6s ease-out forwards',
      },
    },
  },
  plugins: [tailwindcssAnimate],
}
export default config
