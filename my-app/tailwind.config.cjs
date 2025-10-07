/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/*",
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
