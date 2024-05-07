/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      boxShadow: {
        gray: '0px 2px 0px 0px rgba(155,154,154,0.68)',
        redStrong: '0px 2px 0px 0px rgba(239,68,68,0.67)',
        redLight: '0px 4px 0px 0px rgba(232, 125, 125, 0.67)',
        greenPrimary: '0px 4px 0px 0px rgba(136,216,172,0.67)',
        greenSecondry: '0px 2px 0px 0px rgba(136,216,172,0.67)',
      },
    },
  },
  plugins: [],
}
