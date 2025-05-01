module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'skure-blue': '#1E3A8A',
        'skure-green': '#22C55E',
      },
      spacing:{
        'smallScreen': '0.25rem',
        'mediumScreen': '0.5rem',
        'largeScreen': '0.75rem',
      }
    },
  },
  plugins: [],
};