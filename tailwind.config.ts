import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        dark: "var(--dark)",
        dark2: "var(--dark2)",
        green: "var(--green)",
        greenHover: "var(--green-hover)",
        greenLight: "var(--green-light)",
        greenLightOpacity: "var(--green-light-opacity)",
        greenGradient: "var(--green-gradient)",
        red: "var(--red)",
        redOpacity: "var(--red-opacity)",
        white: "var(--white)",
      },
      fontFamily: {
        cabinBold: ['var(--cabinBold)'],
      }
    },
  },
  plugins: [],
} satisfies Config;
