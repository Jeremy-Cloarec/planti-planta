import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        dark: "var(--dark)",
        green: "var(--green)",
        greenHover:"var(--green-hover)",
        red: "var(--red)",
        white: "var(--white)",
      },
      fontFamily: {
        display: "var(--display)",
        sans: "var(--inter)",
      }
    },
  },
  plugins: [],
} satisfies Config;
