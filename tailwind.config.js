/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        purple: {
          400: '#a78bfa',
          500: '#8b5cf6',
          600: '#7c3aed',
          700: '#6d28d9',
        },
        pink: {
          400: '#f472b6',
          500: '#ec4899',
        },
        gray: {
          300: '#d1d5db',
          400: '#9ca3af',
          700: '#374151',
          800: '#1f2937',
          900: '#111827',
        }
      },
      backdropBlur: {
        sm: '4px',
      },
    },
  },
  plugins: [],
  darkMode: 'class',
}