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
        background: "#f7f3ea",
        surface: "#fffaf0",
        panel: "#fffaf0",
        border: "#e4dccf",
        text: "#1f2933",
        muted: "#5f6c72",
        accent: "#0f766e",
        "accent-warm": "#d97706",
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(15,118,110,0.08), 0 16px 48px rgba(31,41,51,0.06)",
        card: "0 1px 3px rgba(31,41,51,0.06), 0 8px 24px rgba(31,41,51,0.04)",
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
