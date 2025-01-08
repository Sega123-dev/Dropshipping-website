/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./dist/*.{html,js}"],
  theme: {
    extend: {
      fontFamily: {
        fredoka: ['"Fredoka One"', "sans-serif"], // Ensure the font is loaded
      },
      fontSize: {
        "sm-plus": "0.9rem", // Customize the value as needed
        "xl-plus": "1.35rem",
      },
      colors: {
        "dark-grey": "var(--dark-grey)",
        "secondary-color": "var(--secondary-color)",
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities(
        {
          ".fredoka-bold": {
            fontWeight: "bold",
            fontFamily: '"Fredoka One", sans-serif',
          },
        },
        ["responsive"]
      );
    },
  ],
};
