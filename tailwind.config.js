/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./dist/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        "dark-grey": "var(--dark-grey)",
        "secondary-color": "var(--secondary-color)",
      },
    },
  },
  plugins: [],
};
