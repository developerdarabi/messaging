/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    screens: {
      'mobile': '350px',
      'tablet': '800px',
      'laptop': '1300px',
      'desktop': '1600px',
    },
  },
  plugins: [],
}