/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}', // Include if using the App Directory feature in Next.js 13+
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
        cursive: ['Inter', 'cursive'],
      },
    },
    screens: {
      xs: { max: '639px' },
      xsm: { max: '767px' },
      ...defaultTheme.screens,
    },
  },
  plugins: [],
};
