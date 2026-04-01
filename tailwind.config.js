/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        emerald: {
          soft: '#10B981',
          light: '#F0FDF4',
          dark: '#059669',
        },
        slate: {
          'broken-white': '#F9FAFB',
        }
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'sans-serif'],
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
        '5xl': '3.25rem',
      },
      boxShadow: {
        'premium': '0 20px 50px -12px rgba(16, 185, 129, 0.1)',
        'glass': '0 8px 32px 0 rgba(16, 185, 129, 0.05)',
      }
    },
  },
  plugins: [],
}