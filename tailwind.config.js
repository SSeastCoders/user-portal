module.exports = {
  prefix: 'tw-',
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors : {
      linkhover: '#0a4386' 
    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
