/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#080810',
        bg2: '#0d0d1a',
        ego: '#d946ef',
        mod: '#22d3ee',
        'border-dark': '#1a1a2e',
        'text-dim': '#4a4a6a',
        'text-mid': '#8888aa',
        'user-clr': '#e2e8f0',
        'red-accent': '#f87171',
      },
      fontFamily: {
        syne: ['Syne', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      animation: {
        'spin-slow': 'spin 3s linear infinite',
        'spin-reverse': 'spin-reverse 2s linear infinite',
        'pulse-ego': 'pulse-ego 3s ease-in-out infinite',
        'pulse-dot': 'pulse-dot 1.5s ease-in-out infinite',
        'screen-enter': 'screen-enter 0.4s ease forwards',
        'forge-ring-outer': 'spin 2s linear infinite',
        'forge-ring-inner': 'spin-reverse 1.5s linear infinite',
        'forge-pulse': 'forge-pulse 2s ease-in-out infinite',
        'progress-fill': 'progress-fill 0.5s ease forwards',
      },
      keyframes: {
        'spin-reverse': {
          from: { transform: 'rotate(360deg)' },
          to: { transform: 'rotate(0deg)' },
        },
        'pulse-ego': {
          '0%, 100%': {
            boxShadow: '0 0 8px #d946ef, 0 0 20px #d946ef40',
          },
          '50%': {
            boxShadow: '0 0 25px #d946ef, 0 0 50px #d946ef60, 0 0 80px #d946ef20',
          },
        },
        'pulse-dot': {
          '0%, 100%': { opacity: '0.3', transform: 'scale(0.8)' },
          '50%': { opacity: '1', transform: 'scale(1.2)' },
        },
        'screen-enter': {
          from: { opacity: '0', transform: 'translateY(16px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'forge-pulse': {
          '0%, 100%': { transform: 'scale(1)', opacity: '0.8' },
          '50%': { transform: 'scale(1.15)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
