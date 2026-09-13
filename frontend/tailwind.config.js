/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#141E30',
          light: '#1e2d45',
          dark: '#0d1420',
        },
        secondary: {
          DEFAULT: '#355770',
          light: '#4a6d8a',
          dark: '#284158',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};