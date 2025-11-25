/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}", // <- Vite doit scanner tous tes composants React
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
