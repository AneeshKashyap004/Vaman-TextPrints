/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: '#0B1F3A',
        charcoal: '#121212',
        gold: '#C9A14A',
        snow: '#F8F9FB',
        slate: '#6B7280',
        ink: '#0B1F3A',
        surface: '#F8F9FB',
        line: 'rgba(11, 31, 58, 0.12)',
        lineDark: 'rgba(248, 249, 251, 0.08)',
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        card: '0 16px 40px rgba(11, 31, 58, 0.10)',
        soft: '0 22px 60px rgba(11, 31, 58, 0.12)',
        lift: '0 28px 70px rgba(11, 31, 58, 0.14)',
        gold: '0 0 0 1px rgba(201, 161, 74, 0.18), 0 18px 50px rgba(201, 161, 74, 0.08)',
        innerGlow: 'inset 0 1px 0 rgba(255,255,255,0.06)',
      },
      backgroundImage: {
        'mesh-navy':
          'radial-gradient(ellipse 80% 60% at 20% 20%, rgba(201,161,74,0.12), transparent 55%), radial-gradient(ellipse 60% 50% at 85% 10%, rgba(248,249,251,0.06), transparent 50%)',
        'mesh-dark':
          'radial-gradient(ellipse 70% 50% at 15% 30%, rgba(201,161,74,0.14), transparent 55%), radial-gradient(ellipse 50% 40% at 90% 80%, rgba(11,31,58,0.5), transparent 45%)',
      },
      spacing: {
        section: '7rem',
        'section-lg': '10rem',
      },
      transitionTimingFunction: {
        luxury: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '200% 0' },
          '100%': { backgroundPosition: '-200% 0' },
        },
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        shimmer: 'shimmer 2.2s linear infinite',
        'fade-up': 'fade-up 0.7s luxury both',
      },
    },
  },
  plugins: [],
};
