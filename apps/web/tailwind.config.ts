import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    // This line ensures Tailwind scans your shared UI components.. tailwind configured for [packages/ui/src]
    "../../packages/ui/src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          light: "#FFFFFF", 
          main: "#2B2BCF", // Blue
          darkPurple: "#2A1D52",
          violet: "#C96FFF", // violet
          black: "#000000", // Darker blue for hover
          deepBlue: "#2B2BCF",
        },
        gray: {
          base: "#6B7280", // Medium gray for disabled text
          100: "#EBECEE",
        },

        neutral: {
          black: "#070D17",
        },

        white: {
          base: "#F3F4F6", // Light gray for disabled background
          80: "#F9F9F9",
          90: "#EBECEE",
        },
        green: {
          900: "#0F2501",
        },

        purple: {
          base: "#6E48E3",
          10: "#6E48E312",
        },

        red: {
          base: "#DD524D",
          10: "#FBEAE9",
        },
      },

      backgroundImage: {
        "gradient-primary": "linear-gradient(to bottom,  #C96FFF, #2B2BCF)",
        gradientText: "linear-gradient(to bottom, #C96FFF, #2B2BCF)",
      },
    },
  },
  plugins: [],
};
export default config;
