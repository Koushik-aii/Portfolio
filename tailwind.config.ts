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
        background: "#050505",
        secondary: "#0D0D0D",
        surface: "#0D0D0D",
        elevated: "#111111",
        panel: "#0D0D0D",
        border: "rgba(255,255,255,0.08)",
        text: "#FFFFFF",
        muted: "#A1A1AA",
        "muted-dark": "#71717A",
        lime: "#C6FF00",
        "lime-dim": "rgba(198,255,0,0.15)",
        purple: "#8B5CF6",
        "purple-dim": "rgba(139,92,246,0.15)",
        // Legacy aliases
        accent: "#C6FF00",
        "accent-strong": "#8B5CF6",
        "accent-soft": "#A78BFA",
        "accent-warm": "#d97706",
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(198,255,0,0.08), 0 16px 48px rgba(0,0,0,0.8)",
        "glow-lime": "0 0 24px rgba(198,255,0,0.25), 0 0 60px rgba(198,255,0,0.08)",
        "glow-purple": "0 0 24px rgba(139,92,246,0.25), 0 0 60px rgba(139,92,246,0.08)",
        card: "0 1px 2px rgba(0,0,0,0.5), 0 4px 12px rgba(0,0,0,0.4)",
        "card-hover": "0 0 0 1px rgba(198,255,0,0.12), 0 20px 60px rgba(0,0,0,0.8), 0 0 40px rgba(198,255,0,0.06)",
      },
      fontFamily: {
        heading: ["var(--font-sora)", "sans-serif"],
        body: ["var(--font-manrope)", "sans-serif"],
        mono: ["var(--font-ibm-plex-mono)", "monospace"],
      },
      maxWidth: {
        container: "1160px",
      },
      animation: {
        "fade-up": "fadeUp 0.6s ease forwards",
        "float": "float 6s ease-in-out infinite",
        "float-slow": "float 10s ease-in-out infinite",
        "pulse-glow": "pulseGlow 2.5s ease-in-out infinite",
        "border-spin": "borderSpin 4s linear infinite",
        "slide-right": "slideRight 0.3s ease forwards",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        pulseGlow: {
          "0%, 100%": { opacity: "0.6" },
          "50%": { opacity: "1" },
        },
        borderSpin: {
          "0%": { backgroundPosition: "0% 50%" },
          "100%": { backgroundPosition: "200% 50%" },
        },
        slideRight: {
          "0%": { transform: "translateX(-6px)", opacity: "0" },
          "100%": { transform: "translateX(0)", opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
