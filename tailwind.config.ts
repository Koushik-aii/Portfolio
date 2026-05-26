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
        background: "#050507",
        secondary: "#101014",
        surface: "#101014",
        elevated: "#15121f",
        panel: "#101014",
        border: "rgba(255,255,255,0.10)",
        text: "#f8fafc",
        muted: "#c7c7d1",
        "muted-dark": "#8b8b99",
        accent: "#c4b5fd",
        "accent-strong": "#7c3aed",
        "accent-soft": "#a78bfa",
        "accent-warm": "#d97706",
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(179,157,219,0.05), 0 16px 48px rgba(0,0,0,0.8)",
        card: "0 1px 2px rgba(0,0,0,0.5), 0 4px 12px rgba(0,0,0,0.4)",
      },
      fontFamily: {
        heading: ["var(--font-sora)", "sans-serif"],
        body: ["var(--font-manrope)", "sans-serif"],
        mono: ["var(--font-ibm-plex-mono)", "monospace"],
      },
      maxWidth: {
        container: "1160px",
      },
    },
  },
  plugins: [],
};

export default config;
