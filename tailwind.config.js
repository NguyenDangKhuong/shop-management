module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#00e5ff',
          light: '#33edff',
          dark: '#00b8cc',
        },
        secondary: {
          DEFAULT: '#b927fc',
          light: '#c752fd',
          dark: '#9a0ee0',
        },
        glass: {
          border: 'rgba(255, 255, 255, 0.08)',
          bg: 'rgba(255, 255, 255, 0.03)',
          'bg-hover': 'rgba(255, 255, 255, 0.05)',
          'bg-light': 'rgba(255, 255, 255, 0.02)',
        }
      }
    }
  },
  plugins: [
    {
      tailwindcss: {},
      autoprefixer: {},
      ...(process.env.NODE_ENV === 'production' ? { cssnano: {} } : {})
    }
  ]
}
