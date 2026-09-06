/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './index.html'],
  theme: {
    extend: {
      colors: {
        eden: {
          primary: '#2d5016',
          light: '#4a7c2c',
          accent: '#d4af37',
          'accent-light': '#f4e4c1',
          dark: '#1a1a1a',
          gray: '#f5f5f5',
          text: '#333333',
        },
      },
      fontFamily: {
        display: ['Playfair Display', 'serif'],
        body: ['Inter', 'sans-serif'],
      },
      spacing: {
        'safe-top': 'env(safe-area-inset-top)',
        'safe-bottom': 'env(safe-area-inset-bottom)',
      },
    },
  },
  plugins: [],
}
