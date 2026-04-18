/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary": "#ffb596",
        "primary-container": "#ff6600",
        "background": "#131315",
        "surface": "#131315",
        "surface-container": "#201f22",
        "surface-container-low": "#1c1b1d",
        "surface-container-high": "#2a2a2c",
        "surface-container-highest": "#353437",
        "on-background": "#e5e1e4",
        "outline": "#aa8a7d",
        "outline-variant": "#5a4136",
      },
      fontFamily: {
        headline: ["Space Grotesk", "sans-serif"],
        body: ["Inter", "sans-serif"],
        mono: ["Roboto Mono", "monospace"],
      },
      borderRadius: {
        'none': '0',
        'sm': '0px',
        'md': '0px',
        'lg': '0px',
        'xl': '0px',
        'full': '9999px',
      }
    },
  },
  plugins: [],
}
