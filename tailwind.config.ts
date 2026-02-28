import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        card: "var(--card)",
        "card-foreground": "var(--card-foreground)",
        muted: "var(--muted)",
        "muted-foreground": "var(--muted-foreground)",
        border: "var(--border)",
        input: "var(--input)",
        primary: {
          DEFAULT: "#115E59",
          foreground: "#ffffff",
        },
        accent: {
          DEFAULT: "#2DD4BF",
          foreground: "#115E59",
        },
      },
      fontFamily: {
        tasa: ["TASA Explorer", "system-ui", "sans-serif"],
        sora: ["Sora", "sans-serif"],
        spectral: ["Spectral", "serif"],
        "science-gothic": ["Science Gothic", "sans-serif"],
      },
    },
  },
  safelist: [
    "bg-teal-100", "bg-teal-200", "bg-teal-700", "bg-teal-800", "bg-teal-900/20", "bg-teal-950/30",
    "text-teal-400", "text-teal-700", "text-teal-800", "text-teal-900",
    "border-teal-200", "border-teal-800", "border-teal-800/50",
  ],
  plugins: [],
};
export default config;
