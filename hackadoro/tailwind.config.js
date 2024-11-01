/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],

  theme: {
    extend: {
      colors: {
        background: "#272739",
        compbg: "#7F1A5D",
        textone: "#910C50",
        texttwo: "#69316D",
        textthree: "#A04F83",
      },
      fontFamily: {
        customFont: ['"Custom Font"', "sans-serif"],
      },
    },

    plugins: [],
  },
};
