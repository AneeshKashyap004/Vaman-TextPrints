/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: '#0B1F3A',
        charcoal: '#121212',
        surface: '#F8F9FB',
        slate: '#6B7280',
        gold: '#C9A14A',
        copper: '#B87333',
        line: 'rgba(11, 31, 58, 0.12)',
      },
      fontFamily: {
        serif: ['Playfair Display', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 18px 50px rgba(11, 31, 58, 0.10)',
        card: '0 16px 40px rgba(11, 31, 58, 0.10)',
      },
      borderRadius: {
        xl: '1rem',
        '2xl': '1.25rem',
      },
    },
  },
  plugins: [],
}
