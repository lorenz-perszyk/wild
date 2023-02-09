/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    backgroundSize: {
      large: "120% 300%",
    },
    extend: {
      fontFamily: {
        tungsten: ["Tungsten", "sans-serif"],
      },
    },
  },
  plugins: [
    require("tailwindcss-text-fill-stroke"), // no options to configure
  ],
};
