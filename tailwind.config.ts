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
        primary: {
          DEFAULT: "#3b82f6",
          foreground: "#ffffff",
        },
        accent: {
          DEFAULT: "#8b5cf6",
          foreground: "#ffffff",
        },
      },
    },
  },
  safelist: [
    "bg-blue-500/10", "border-blue-500/20", "text-blue-400",
    "bg-purple-500/10", "border-purple-500/20", "text-purple-400",
    "bg-pink-500/10", "border-pink-500/20", "text-pink-400",
  ],
  plugins: [],
};
export default config;
