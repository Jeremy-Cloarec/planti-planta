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
        greenHover: "var(--green-hover)",
        greenLight:"var(--green-light)",
        greenLightOpacity: "var(--green-light-opacity)",
        red: "var(--red)",
        white: "var(--white)",
      },
      fontFamily: {
        sofia: ["Sofia", "serif"],
        jaldiBold: ["Jaldi bold", "sans-serif"],
        jaldiRegular: ["Jaldi regular", "sans-serif"],
      }
    },
  },
  plugins: [],
} satisfies Config;
