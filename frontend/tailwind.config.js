/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/components/adminDashboard.jsx", 
    "./src/components/userdashboard/HeroPage.jsx", // Directly target the specific file
    "./src/**/*.{js,jsx,ts,tsx}", // Keep broader scope for other files
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};