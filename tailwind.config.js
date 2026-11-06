/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      colors: {
        sidebar: {
          DEFAULT: '#2E4356',
          light: '#3B5469',
          dark: '#243645',
        },
        canvas: '#D8E2E8',
        accent: {
          50: '#EEF4F6',
          100: '#DCE8EC',
          300: '#9FBEC8',
          500: '#5A8A9A',
          700: '#3F6B7A',
          900: '#2A4C58',
        },
      },
      boxShadow: {
        soft: '0 1px 2px rgba(46, 67, 86, 0.06), 0 8px 24px -8px rgba(46, 67, 86, 0.16)',
      },
    },
  },
  plugins: [],
};
