/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      animation: {
        pulse: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      boxShadow: {
        glass: '0 8px 32px rgba(0, 0, 0, 0.25)',
        lift: '0 20px 40px rgba(0, 0, 0, 0.35)',
      },
    },
  },
  plugins: [],
};
