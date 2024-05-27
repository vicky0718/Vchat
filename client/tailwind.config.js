/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        primary: "#003d80",
        secondary: "#003269",
        button: "#0855a8"
      }
    },
  },
  plugins: [],
}

