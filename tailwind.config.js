/** @type {import('tailwindcss').Config} */
const config = {
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}', './components/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      container: {
        center: true,
        padding: '2rem',
        screens: {
          '2xl': '1440px',
        },
      },
      colors: {
        'bg-gray': {
          DEFAULT: '#F3F5F8',
        },
        primary: {
          DEFAULT: '#5A57CB',
        },
        muted: {
          100: '#728096',
          200: '#6A7988',
          300: '#919CAD',
          400: '#95A6B7',
        },
        'border-card': {
          DEFAULT: '#DFDFDF',
        },
      },
      boxShadow: {
        card: '0px 0px 4px 0px #0000001A',
      },
    },
  },
  plugins: [],
};

export default config;
