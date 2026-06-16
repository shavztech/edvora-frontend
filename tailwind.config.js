/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "rgb(var(--edvora-primary))",
        secondary: "rgb(var(--edvora-secondary))",
        navy: "rgb(var(--edvora-navy))",
      },
    },
  },
  plugins: [],
};
