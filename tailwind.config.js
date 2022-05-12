module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "snippet-white": { 0: "#ededed", 1: "#d4d4d4" },
        "snippet-dark": { 0: "#212121", 1: "#383737" },
        "snippet-emerald": "#1a605f",
        "snippet-emerald-light": "098A88",
      },
      fontFamily: {
        roboto: ["Roboto", "sans-serif"],
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
