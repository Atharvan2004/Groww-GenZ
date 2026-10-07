/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        groww: {
          green: '#00D09C',
          blue: '#5367F5',
          'light-green': '#B2F0E1',
          'pale-green': '#EBFCF7',
          'light-blue': '#B1D0FB',
          'pale-blue': '#E5F4FD',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['"Inter Tight"', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
