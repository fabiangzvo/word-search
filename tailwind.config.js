import { heroui } from '@heroui/theme'
import colors from 'tailwindcss/colors'

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-sans)'],
        mono: ['var(--font-mono)'],
        kanit: ['var(--font-kanit)'],
      },
      gridTemplateColumns: {
        cards: 'repeat(auto-fit, minmax(290px, 1fr))',
      },
    },
  },
  darkMode: 'class',
  plugins: [
    heroui({
      themes: {
        light: {
          colors: {
            primary: { ...colors.cyan, DEFAULT: colors.cyan[400] },
            default: { ...colors.cyan, DEFAULT: colors.cyan[400] },
            background: colors.white,
          },
        },
        dark: {
          colors: {
            primary: { ...colors.fuchsia, DEFAULT: colors.fuchsia[500] },
            default: { ...colors.fuchsia, DEFAULT: colors.fuchsia[500] },
            background: colors.zinc[950],
          },
        },
      },
    }),
  ],
}
