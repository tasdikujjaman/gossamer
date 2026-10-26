import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['var(--font-display)', 'system-ui', 'sans-serif'],
        sans: ['var(--font-body)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'monospace'],
      },
      colors: {
        midnight: '#061A20',
        'deep-teal': '#0B2C33',
        'surface-teal': '#123B42',
        aqua: '#42E6C4',
        'sky-cyan': '#80D9F2',
        'warm-white': '#F4F8F6',
        'muted-slate': '#A1B7BA',
        'fine-border': '#24444A',
        ink: {
          900: '#061A20',
          800: '#0B2C33',
          700: '#123B42',
          600: '#1a4a52',
          500: '#24444A',
        },
        aqua2: {
          400: '#5ef0d0',
          500: '#42E6C4',
          600: '#2bc7a8',
        },
        cyan2: {
          400: '#9ee4f5',
          500: '#80D9F2',
          600: '#5fc4e6',
        },
      },
      letterSpacing: {
        'mono-wide': '0.18em',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'grid-fine':
          'linear-gradient(to right, rgba(36,68,74,0.35) 1px, transparent 1px), linear-gradient(to bottom, rgba(36,68,74,0.35) 1px, transparent 1px)',
      },
      backgroundSize: {
        'grid-fine': '48px 48px',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        'drift-up': {
          '0%': { transform: 'translateY(0)', opacity: '0' },
          '10%': { opacity: '0.8' },
          '90%': { opacity: '0.6' },
          '100%': { transform: 'translateY(-120px)', opacity: '0' },
        },
        'shimmer': {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'drift-up': 'drift-up 6s linear infinite',
        'shimmer': 'shimmer 3s linear infinite',
      },
      transitionTimingFunction: {
        'smooth-out': 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
export default config;
