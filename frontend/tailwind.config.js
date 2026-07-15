/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#eef2ff',
          500: '#5b5ce2',
          600: '#4b4cc9',
          700: '#3f40aa'
        }
      },
      boxShadow: {
        soft: '0 18px 50px rgba(15, 23, 42, 0.10)'
      }
    }
  },
  plugins: []
};
