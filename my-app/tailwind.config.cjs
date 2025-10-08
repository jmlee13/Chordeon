/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/*",
    "./index.html",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        rushblade: ['RushbladeDemoFont', 'sans-serif'],
      }
    },
  },
  plugins: [],
};
