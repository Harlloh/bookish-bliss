import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        cream: "hsl(45, 30%, 96%)",
        parchment: "hsl(42, 35%, 75%)",
        earth: "hsl(25, 35%, 35%)",
        burgundy: "hsl(355, 45%, 35%)",
        forest: "hsl(150, 30%, 30%)",
        gold: "hsl(42, 65%, 55%)",
        ink: "hsl(220, 15%, 20%)",
        muted: "hsl(25, 10%, 50%)",
      },
      fontFamily: {
        serif: ["Merriweather", "serif"],
        sans: ["Source Sans Pro", "sans-serif"],
      },
    },
  },
  plugins: [],
} satisfies Config;
