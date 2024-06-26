/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'btn-primary': '#FE5454',
        'floating-background': 'rgba(255, 255, 255, 0.4)',
        'secondary-text': '#666',
        'red': '#a80000'
      }
    },
  },
  plugins: [],
}