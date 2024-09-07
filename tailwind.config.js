/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      animation: {
        rotate: 'rotate 10s linear infinite',
        out: 'out 2s infinite ease-out',
        opacity: 'opacity 2s infinite',
      },
    },
  },
  plugins: [],
}
