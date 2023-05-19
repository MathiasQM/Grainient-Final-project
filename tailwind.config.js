/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["index.html", "./src/**/*.vue"],
  theme: {
    extend: {
      colors: {
        "main-bg": "var(--main-bg-color)",
        "mobile-nav-color": "var(--mobile-nav-color)",
        "grey-accent-color": "var(--grey-accent-color)",
        "blue-ca-color": "var(--blue-accent-color)",
        "red-ca-color": "var(--red-selection-color)",
      },
    },
  },
  plugins: [],
};
