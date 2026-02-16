/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: '#1a5276',    // Deep dental blue
          secondary: '#2e86c1',  // Lighter blue
          accent: '#f39c12',     // Gold/orange accent (matches Duda site)
          dark: '#0d2137',
          light: '#eaf2f8',
        },
      },
      fontFamily: {
        sans: ['system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
