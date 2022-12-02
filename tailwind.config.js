/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "custom-gold": "#E7D27C",
        "custom-gray-100": "#FAFAFA",
        "custom-gray-200": "#737373",
        "custom-gray-300": "#777777",
        "custom-gray-400": "#4C4C4C",
        "custom-gray-400": "#B3B3B3",
      },
      borderColor: {
        primary:"rgba(179, 179, 179, 0.25)"

      }
    },
  },
  plugins: [],
}
