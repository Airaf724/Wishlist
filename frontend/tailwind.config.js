/** @type {import('tailwindcss').Config} */
export default {
  mode: "jit", // newly added
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        segoe: ['"Segoe UI Semibold"', '"Segoe UI"', "sans-serif"],
      },
    },
  },
  plugins: [],
};
