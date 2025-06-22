/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Ensure all JSX files are included
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('daisyui'),
  ],
}

