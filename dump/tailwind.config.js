/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'night': {
          'deep': '#0b0220',
          'purple': '#24123a',
        },
        'sky': {
          'blue': '#5aa6ff',
        },
        'star': {
          'yellow': '#ffd86b',
        },
        'text': {
          'light': '#e6e9ff',
          'muted': '#9aa0c6',
          'dark': '#06102a',
        },
        'panel': 'rgba(20,10,30,0.6)',
      },
      fontFamily: {
        sans: 'var(--font-geist-sans)',
        mono: 'var(--font-geist-mono)',
      },
      backgroundImage: {
        'night-gradient': 'linear-gradient(180deg, #0b0220 0%, #15062b 60%, #0b0220 100%)',
        'panel-gradient': 'linear-gradient(180deg, rgba(36,18,58,0.6), rgba(16,8,40,0.6))',
        'cta-gradient': 'linear-gradient(90deg, #3b6cff, #6ad1ff)',
        'sky-gradient': 'radial-gradient(ellipse at top left, rgba(90,166,255,0.04), transparent 20%), #0b0220',
      },
    },
  },
  plugins: [],
};
