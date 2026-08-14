import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        deep: "#1f1830",
        plum: "#3a2954",
        cream: "#f0e6d2",
        paper: "#f7eed9",
        ink: "#1b1626",
        inkSoft: "#5f5266",
        sage: "#7a8b6f",
        rose: "#c4978a",
        warm: "#2d1f3f",
        rule: "rgba(31, 24, 48, 0.18)",
      },
      fontFamily: {
        display: ["var(--font-italiana)", "var(--font-cormorant)", "serif"],
        serif: ["var(--font-cormorant)", "serif"],
        sans: ["var(--font-work-sans)", "sans-serif"],
        mono: ["var(--font-jetbrains-mono)", "monospace"],
      },
      borderRadius: {
        card: "18px",
        pill: "999px",
      },
    },
  },
  plugins: [],
};

export default config;
