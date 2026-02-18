/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: "#a855f7",
        secondary: "#ec4899",
        accent: "#f59e0b",
        success: "#10b981",
        "background-light": "#f8f9fc",
        "background-dark": "#0f172a",
        "surface-light": "#ffffff",
        "surface-dark": "#1e293b",
        "border-light": "#e2e8f0",
        "border-dark": "#334155",
        "text-main-light": "#1e293b",
        "text-main-dark": "#f1f5f9",
        "text-muted-light": "#64748b",
        "text-muted-dark": "#94a3b8",
      },
      fontFamily: {
        display: ["'Plus Jakarta Sans'", "sans-serif"],
      },
      borderRadius: {
        DEFAULT: "12px",
        'xl': "16px",
        '2xl': "20px",
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(0, 0, 0, 0.05)',
      },
    },
  },
  plugins: [],
}
