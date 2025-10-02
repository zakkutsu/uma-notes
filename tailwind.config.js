/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'xs': '480px',
      },
      colors: {
        'uma-blue': '#667eea',
        'uma-purple': '#764ba2',
        'aptitude-s': '#ff6b6b',
        'aptitude-a': '#4ecdc4',
        'aptitude-b': '#45b7d1',
        'aptitude-c': '#96c93d',
        'aptitude-d': '#feca57',
        'aptitude-e': '#ff9ff3',
        'aptitude-f': '#ff7675',
        'aptitude-g': '#ddd',
      },
      gridTemplateColumns: {
        'aptitude-5': 'repeat(5, 1fr)',
        'aptitude-4': 'repeat(4, 1fr)',
        'aptitude-3': 'repeat(3, 1fr)',
      }
    },
  },
  plugins: [],
}