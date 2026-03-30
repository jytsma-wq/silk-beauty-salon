import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans:    ['var(--font-dm-sans)', 'system-ui', 'sans-serif'],
        display: ['var(--font-cormorant)', 'Georgia', 'serif'],
        accent:  ['var(--font-cinzel)', 'serif'],
        body:    ['var(--font-dm-sans)', 'system-ui', 'sans-serif'],
      },
      colors: {
        gold: {
          100: '#fdf8f0',
          200: '#f5e6d0',
          300: '#e8c98a',
          400: '#C9A96E',
          500: '#a07840',
          600: '#7a5a2e',
        },
        silk: {
          50:  '#FEFBF9',
          100: '#FDF6F2',
          200: '#FAEBE0',
          300: '#F5DBCC',
          500: '#E6A98D',
          700: '#C66B4A',
          900: '#854836',
        },
        surface: {
          0: '#ffffff', // Changed to pure white for the Galderma aesthetic
          1: '#fafafa',
          2: '#f5f5f5',
          3: '#e5e5e5',
        },
      },
      fontSize: {
        // Refined Hero sizes for French elegance
        'hero-lg': ['clamp(2.5rem, 5vw, 4.5rem)', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'hero-md': ['clamp(2rem, 4vw, 3.5rem)', { lineHeight: '1.15', letterSpacing: '-0.01em' }],
        'hero-sm': ['clamp(1.75rem, 3.5vw, 2.75rem)', { lineHeight: '1.2', letterSpacing: '-0.01em' }],
        
        // Refined Display sizes
        'display-1': ['clamp(1.875rem, 3vw, 2.5rem)', { lineHeight: '1.2', letterSpacing: '-0.01em' }],
        'display-2': ['clamp(1.5rem, 2.5vw, 2rem)', { lineHeight: '1.3', letterSpacing: '0' }],
        'display-3': ['clamp(1.25rem, 2vw, 1.5rem)', { lineHeight: '1.4', letterSpacing: '0' }],
        
        // Body sizes with increased line-height for breathability
        'body-xl': ['1.125rem', { lineHeight: '1.8' }],
        'body-lg': ['1.0625rem', { lineHeight: '1.8' }],
        'body-md': ['1rem', { lineHeight: '1.75' }],
        'body-sm': ['0.875rem', { lineHeight: '1.7' }],
        'body-xs': ['0.75rem', { lineHeight: '1.6' }],
        
        // UI sizes
        'button': ['0.8125rem', { lineHeight: '1', letterSpacing: '0.05em' }],
        'label': ['0.75rem', { lineHeight: '1', letterSpacing: '0.08em' }],
        'caption': ['0.6875rem', { lineHeight: '1.4', letterSpacing: '0.04em' }],
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '30': '7.5rem',
        'section': 'clamp(4rem, 8vw, 8rem)', // Added standard section spacing
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      boxShadow: {
        'gold': '0 4px 20px rgba(201, 169, 110, 0.08)',
        'soft': '0 2px 15px rgba(0, 0, 0, 0.04)',
        'elegant': '0 10px 40px rgba(0, 0, 0, 0.06)',
        'glow': '0 0 20px rgba(201, 169, 110, 0.1)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 3s ease-in-out infinite',
        'fade-in': 'fadeIn 0.8s ease-out',
        'slide-up': 'slideUp 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 10px rgba(201,169,110,0.1)' },
          '50%': { boxShadow: '0 0 25px rgba(201,169,110,0.2)' },
        },
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        slideUp: {
          from: { opacity: '0', transform: 'translateY(30px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
      transitionTimingFunction: {
        'elegant': 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [],
};

export default config;