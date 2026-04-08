/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./index.html"],
  theme: {
    extend: {
      colors: {
        brand: {
          bg: "var(--brand-bg)",
          card: "var(--brand-card)",
          "card-alt": "var(--brand-card-alt)",
          border: "var(--brand-border)",
          "border-ui": "var(--brand-border-ui)",
          borderGlow: "#2563EB",
          primary: "var(--brand-primary)",
          primaryEnd: "#EF4444",
          accent: "var(--brand-accent)",
          textPrimary: "var(--brand-text-primary)",
          textSecondary: "var(--brand-text-secondary)",
          inputBg: "var(--brand-input-bg)",
          inputBorder: "var(--brand-input-border)",
          hover: "var(--brand-hover)",
          scrollbarThumb: "var(--brand-scrollbar-thumb)",
          scrollbarThumbHover: "var(--brand-scrollbar-thumb-hover)",
        },
      },
      backgroundImage: {
        "login-gradient":
          "radial-gradient(ellipse at 18% 55%, rgba(20,60,160,0.55) 0%, transparent 55%), radial-gradient(ellipse at 82% 50%, rgba(160,40,20,0.38) 0%, transparent 55%)",
        "btn-gradient": "linear-gradient(135deg, #F05A2B 0%, #EF4444 100%)",
        "card-border-gradient":
          "linear-gradient(160deg, #2563EB 0%, #9333EA 50%, #F05A2B 100%)",
      },
      fontFamily: {
        sans: ["'Work Sans'"],
      },
      boxShadow: {
        card: "0 0 60px rgba(0,0,0,0.6), inset 0 0 0 1px rgba(37,99,235,0.25)",
        "card-glow": "0 0 40px rgba(37,99,235,0.15)",
        input: "none",
        "input-focus": "0 0 0 2px rgba(59,130,246,0.45)",
        btn: "0 6px 26px rgba(240,90,43,0.55)",
      },
    },
  },
  plugins: [],
};
