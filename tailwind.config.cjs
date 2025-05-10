module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: 'var(--color-primary)',
          400: 'var(--color-primary-400)',
          500: 'var(--color-primary-500)',
        },
        gray: {
          100: 'var(--color-gray-100)',
          200: 'var(--color-gray-200)',
          300: 'var(--color-gray-300)',
          400: 'var(--color-gray-400)',
        },
        blue: 'var(--color-blue)',
        red: 'var(--color-red)',
        'white-to-black': 'var(--color-white-to-black)',
        'black-to-white': 'var(--color-black-to-white)',
        background: 'var(--color-background)',
      },
      fontFamily: {
        pretendard: ['Pretendard'],
      },
      keyframes: {
        'slide-up': {
          '0%': { transform: 'translateY(100%)' },
          '100%': { transform: 'translateY(0)' },
        },
      },
      animation: {
        'slide-up': 'slide-up 0.3s ease-out',
      },
    },
  },
  plugins: [],
};
