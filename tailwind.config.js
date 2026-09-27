/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./context/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          950: "#0f1115",
          900: "#13161d",
          850: "#15171d",
          800: "#1a1d24",
          700: "#1f242d",
          600: "#2a2f3a",
        },
        lime: {
          DEFAULT: "#ccff00",
          soft: "#c2f800",
        },
        muted: {
          DEFAULT: "#9ca3af",
          light: "#d1d5db",
          dark: "#6b7280",
        },
      },
      fontFamily: {
        display: ["var(--font-oswald)", "sans-serif"],
        sans: ["var(--font-inter)", "sans-serif"],
      },
    },
  },
  plugins: [],
};
