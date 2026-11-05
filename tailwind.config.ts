import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          50: "#f0f4f9",
          100: "#dbe5f1",
          200: "#b7cae3",
          300: "#86a6cf",
          400: "#547db9",
          500: "#355fa0",
          600: "#274a83",
          700: "#203c6b",
          800: "#1d345a",
          900: "#0F2557",
          950: "#0A192F",
        },
      },
      fontFamily: {
        sans: ["var(--font-tajawal)", "system-ui", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "sans-serif"],
        mono: ["var(--font-inter)", "ui-monospace", "SFMono-Regular", "Menlo", "Monaco", "Consolas", "monospace"],
      },
      boxShadow: {
        subtle: "0 1px 3px 0 rgba(10, 25, 47, 0.04), 0 1px 2px -1px rgba(10, 25, 47, 0.04)",
        card: "0 4px 20px -2px rgba(10, 25, 47, 0.05), 0 2px 6px -1px rgba(10, 25, 47, 0.02)",
        "card-hover": "0 12px 30px -4px rgba(10, 25, 47, 0.10), 0 4px 12px -2px rgba(10, 25, 47, 0.05)",
      },
    },
  },
  plugins: [],
};
export default config;
