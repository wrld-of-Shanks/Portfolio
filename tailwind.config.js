/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        base: '#0A0A0A',
        surface: '#111111',
        'surface-light': '#1A1A1A',
        white: '#FFFFFF',
        'off-white': '#F2F2F2',
        muted: '#8C8C8C',
        accent: '#C40000',
        'accent-bright': '#E8342E',
      },
      fontFamily: {
        display: ['"Bebas Neue"', '"Space Grotesk"', 'system-ui', 'sans-serif'],
        body: ['"Inter"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      letterSpacing: {
        tighter: '-0.04em',
        tight: '-0.02em',
        normal: '0',
        wide: '0.05em',
        wider: '0.1em',
      },
    },
  },
  plugins: [],
}
