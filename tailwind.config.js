module.exports = {
  important: true,
  content: ["./pages/**/*.{js,ts,jsx,tsx}", "./component/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      xs: "480",
      sm: "576px",
      md: "768px",
      lg: "992px",
      xl: "1200px",
      xxl: "1600px",
    },
    extend: {
      colors: {},
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  },
};
