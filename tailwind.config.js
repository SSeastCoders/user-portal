module.exports = {
  prefix: 'tw-',
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        linkhover: '#0a4386',
        primary: '#007bff',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
