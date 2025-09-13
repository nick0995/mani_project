/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/components/adminDashboard.jsx", 
    "./src/components/userdashboard/HeroPage.jsx",
    "./src/components/userdashboard/AboutPage.jsx",
    "./src/components/userdashboard/LatestPage.jsx",
    "./src/components/userdashboard/CourseSection.jsx",
    "./src/components/userdashboard/Footer.jsx", 
    "./src/components/userdashboard/Navbar.jsx",// Directly target the specific file
    "./src/**/*.{js,jsx,ts,tsx}", // Keep broader scope for other files
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};