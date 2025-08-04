import type { Config } from "tailwindcss";
const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "../../packages/ui/src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          light: "#FFFFFF",
          main: "#2B2BCF",
          darkPurple: "#2A1D52",

          violet: "#C96FFF",
          dark: "#2A1D52",
        },
        blue: {
          400: "#162844",
        },
        green: {
          base: "#30D158",
        },
        // gray: {
        //   base: "#6B7280",
        //   light: "#F3F4F6",
        //   dark: "#667185",
        //   200: "#E4E7EC",
        // },
        // error: {},
        grey: {
          base: "#98A2B3",
        },
        dark: {
          base: "#090A0A",
        },

        neutral: {
          base: "#070D17",
          700: "#F0F2F5",
          100: "#EBECEE",
          300: "#F2F2F2",
          600: "#F9F9F9",

          violet: "#C96FFF", // violet
          black: "#000000", // Darker blue for hover
          deepBlue: "#2B2BCF",
        },
        gray: {
          base: "#6B7280", // Medium gray for disabled text
          light: "#F3F3F3",
          100: "#F2F4F5",
          150: "#EBECEE",
          200: "#F0F2F5",
          400: "#52575C",
          500: "#616161",
          600: "#98A2B3",
          650: "#78788029",
          900: "#101828",
          950: "#070D17",
        },
        // gray: {
        //   base: "#6B7280", // Medium gray for disabled text
        //   100: "#EBECEE",
        // },

        // neutral: {
        //   black: "#070D17",
        // },

        white: {
          base: "#F3F4F6", // Light gray for disabled background
          900: "#F9F9F9",
          800: "#EBECEE",
        },
        black: {
          400: "#52575C",
          100: "#000000",
        },
        error: {
          base: "#DC2626",
          dark: "#940803",
          50: "#DC2626",
          80: "#F9F9F9",
          90: "#EBECEE",
        },
        // green: {
        //   900: "#0F2501",
        // },
        // green: {
        //   900: "#0F2501",
        // },

        purple: {
          base: "#6E48E3",
          10: "#6E48E312",
        },

        red: {
          base: "#DD524D",
          10: "#FBEAE9",
        },
      },
      fontFamily: {
        fractul: ["Fractul", "sans-serif"],
      },
      screens: {
        mdlg: { raw: "(max-width: 1026px)" },
      },
      
      sidebar: "#2A1D52",

      backgroundImage: {
        "gradient-primary": "linear-gradient(to bottom,  #C96FFF, #2B2BCF)",
        gradientText: "linear-gradient(to bottom, #C96FFF, #2B2BCF)",
      },
      borderImage: {
        "gradient-primary": "linear-gradient(to right, #C96FFF, #2B2BCF)",
      },
    },
  },
  plugins: [],
};
export default config;
