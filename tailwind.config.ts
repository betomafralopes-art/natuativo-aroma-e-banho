import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          50:  '#fdfbf0',
          100: '#faf5d8',
          200: '#f5e9a8',
          300: '#edd97a',
          400: '#e2c44f',
          500: '#C9A84C',
          600: '#a8893a',
          700: '#856b2c',
          800: '#614f1f',
          900: '#3d3213',
        },
        cream: {
          50:  '#fefefe',
          100: '#faf8f4',
          200: '#f5f0e8',
          300: '#ede5d5',
          400: '#e0d4bc',
          500: '#cfc0a0',
        },
        olive: {
          50:  '#f4f6f0',
          100: '#e5eadb',
          200: '#c8d4b3',
          300: '#a5b988',
          400: '#7d9a5a',
          500: '#5C7A3E',
          600: '#4a6232',
          700: '#3a4d27',
          800: '#2b391d',
          900: '#1c2513',
        },
        charcoal: {
          50:  '#f5f5f5',
          100: '#e8e8e8',
          200: '#d0d0d0',
          300: '#a8a8a8',
          400: '#787878',
          500: '#525252',
          600: '#3d3d3d',
          700: '#2d2d2d',
          800: '#1e1e1e',
          900: '#141414',
        },
      },
      fontFamily: {
        display: ['var(--font-cormorant)', 'Georgia', 'serif'],
        body: ['var(--font-jost)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-dm-mono)', 'monospace'],
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #C9A84C 0%, #e2c44f 40%, #a8893a 100%)',
        'cream-gradient': 'linear-gradient(180deg, #faf8f4 0%, #f5f0e8 100%)',
        'hero-pattern': "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23C9A84C' fill-opacity='0.04'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'slide-up': 'slideUp 0.5s ease-out forwards',
        'shimmer': 'shimmer 2s infinite',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' },
        },
      },
      boxShadow: {
        'gold': '0 4px 24px rgba(201, 168, 76, 0.25)',
        'gold-lg': '0 8px 40px rgba(201, 168, 76, 0.35)',
        'card': '0 2px 20px rgba(0,0,0,0.06)',
        'card-hover': '0 8px 40px rgba(0,0,0,0.12)',
        'inner-gold': 'inset 0 1px 0 rgba(201, 168, 76, 0.3)',
      },
    },
  },
  plugins: [],
}

export default config
