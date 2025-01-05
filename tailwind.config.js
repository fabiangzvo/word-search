import { nextui } from "@nextui-org/theme";
import colors from "tailwindcss/colors";

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)"],
        mono: ["var(--font-mono)"],
        kanit: ["var(--font-kanit)"],
      },
      gridTemplateColumns: {
        cards: "repeat(auto-fit, minmax(290px, 1fr))",
      },
    },
  },
  darkMode: "class",
  plugins: [
    nextui({
      themes: {
        light: {
          colors: {
            primary: { ...colors.lime, DEFAULT: colors.lime[500] },
            default: { ...colors.lime, DEFAULT: colors.lime[500] },
          },
        },
        dark: {
          colors: {
            primary: { ...colors.fuchsia, DEFAULT: colors.fuchsia[500] },
            default: { ...colors.fuchsia, DEFAULT: colors.fuchsia[500] },
          },
        },
      },
    }),
  ],
};
