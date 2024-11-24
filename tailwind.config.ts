/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#4c6ef5', // Light blue
          DEFAULT: '#1e3a8a', // Dark blue
          dark: '#1a237e', // Deeper dark blue
        },
        secondary: '#ffb74d', // Amber for accent
        background: '#121212', // Dark background
        surface: '#1d1d1d', // Slightly lighter surface
        error: '#f44336', // Error red
      },
    },
  },
  plugins: [],
};
