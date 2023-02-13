/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");
module.exports = withMT({
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      
        "colors": {
          "myblue": {
            "100": "#BDD1F4",
            "50": "#DCE6F9",
            "200": "#7CA2E9",
            "300": "#3A74DE",
            "400": "#1D50AF",
            "500": "#12316C",
            "600": "#0F2857",
            "700": "#0B1E42",
            "800": "#07142C",
            "900": "#040A16"
          }
        }
      
    },
  },
  plugins: [],
});
