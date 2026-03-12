/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./index.html"],
  theme: {
    extend: {
      colors: {
        brand: {
          bg: "#07111F",
          card: "#0B1828",
          border: "#1B3A5C",
          borderGlow: "#2563EB",
          primary: "#F05A2B",
          primaryEnd: "#EF4444",
          accent: "#3B82F6",
          textPrimary: "#FFFFFF",
          textSecondary: "#7A9ABF",
          inputBg: "#081421",
          inputBorder: "#082656",
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
        sans: ["'Work Sans'", "'DM Sans'", "sans-serif"],
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
