/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        first: "#F70776",
        second: "#C3195D",
        third: "#680747",
        fourth: "#141010",
        solana_first: "#9945FF",
        solana_second: "#14F195",
      },
    },
  },
  plugins: [],
};
