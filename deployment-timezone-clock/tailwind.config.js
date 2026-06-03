/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'business-hours': '#10b981',
        'non-business-hours': '#ef4444',
        'ibm-blue': '#0f62fe',
      },
    },
  },
  plugins: [],
}

// Made with Bob
