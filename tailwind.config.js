const colors = require('tailwindcss/colors')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          700: "#0C666E",
          600: "#1C7A88",
          500: "#208da0",
          400: "#25A1BA",
          300: "#2DC2E0",
          200: "#3ACCE6",
          100: "#86E2F2",
          50: "#E1F8FC"
        },
        secondary: '#ecc94b',
        warn: colors.red,
      }
    }
  },
  plugins: [],
}

