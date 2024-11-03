/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],

  theme: {
    extend: {
      fontSize: {
        "9xl": ["400px"],
      },
      colors: {
        background: "#272739",
        compbg: "#7F1A5D",
        textone: "#910C50",
        texttwo: "#69316D",
        textthree: "#A04F83",
      },
      fontFamily: {
        neuebit: ["Neue Bit", "sans-serif"],
        terminal: ["Terminal", "monospace"],
      },

      borderRadius: {
        "3xl": "2.2rem",
      },
    },

    plugins: [],
  },
};
