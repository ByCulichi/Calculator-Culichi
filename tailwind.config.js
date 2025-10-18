/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'calc-bg': '#F5F5F5',
        'calc-panel': '#000000',
        'calc-button': '#333333',
        'calc-button-hover': '#404040',
        'calc-button-ac': '#A6A6A6',
        'calc-button-ac-hover': '#B8B8B8',
        'calc-button-op': '#FF9500',
        'calc-button-op-hover': '#FFB84D',
        'calc-sidebar': '#1C1C1E',
        'calc-sidebar-border': '#2C2C2E',
      },
    },
  },
  plugins: [],
}
