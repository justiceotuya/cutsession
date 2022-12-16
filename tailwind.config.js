/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "custom-gold": "#E7D27C",
        "custom-gold-light": "#fdfbf2",
        "custom-gray-100": "#FAFAFA",
        "custom-gray-200": "#737373",
        "custom-gray-300": "#777777",
        "custom-gray-400": "#4C4C4C",
        "custom-gray-500": "#B3B3B3",
        "custom-gray-600": "#443C4D",
        "custom-gray-700": "#72687B",
        "custom-gray-800": "#F7F8F9",
        "gray-text-200": "#0A1F44",
        "gray-text-100": "#4E5D78",
      },
      borderColor: {
        primary: "rgba(179, 179, 179, 0.25)",
        secondary: "#d0bd70",
        card: "#EEEDEF",
      },
      boxShadow: {
        s01: "0px 2px 4px -2px rgba(68, 60, 77, 0.12), 0px 4px 4px -2px rgba(68, 60, 77, 0.08)",
        so2: '0px 8px 16px -6px rgba(10, 31, 68, 0.08)'
      },
      height: {
        "45px":"45px"
      }
    },
  },
  plugins: [],
}
