import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      // fontSize: {
      //   '4xl': '3rem',  // Adjust this value to match your "LATIMER" text size
      //   'nav': '0.75rem', // Size for navigation text
      // },
      // maxWidth: {
      //   'screen-2xl': '1536px',  // This ensures content doesn't get too wide on large screens
      // },
    },
  },
  plugins: [],
} satisfies Config;