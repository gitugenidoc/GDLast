// frontend/tailwind.config.js - Tailwind design system with GeniDoc Hayat tokens

export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Primary - Deep Medical Blue
        primary: {
          50: "#DAE2FF",
          100: "#B1C5FF",
          500: "#0047AB",
          600: "#00327D",
          700: "#1B5BC0",
          900: "#00327D",
        },
        // Secondary - Medical Turquoise
        secondary: {
          50: "#8EF4E9",
          600: "#006A63",
          700: "#48A9A0",
          800: "#006A63",
        },
        // Success Green
        success: {
          50: "#C2E5C8",
          600: "#2D8C3D",
          700: "#71D7A1",
        },
        // Error Red
        error: {
          50: "#FFDAD6",
          600: "#BA1A1A",
        },
        // Warning Orange
        warning: {
          50: "#FFE6CC",
          600: "#E89836",
        },
        // Surface System
        surface: {
          DEFAULT: "#FFFFFF",
          low: "#F2F4F6",
          container: "#ECEEF0",
          high: "#E6E8EA",
          highest: "#E0E3E5",
        },
        // Background
        background: "#F7F9FB",

        // Text
        text: {
          primary: "#191C1E",
          secondary: "#434653",
          muted: "#737784",
        },

        // Outline
        outline: {
          DEFAULT: "#737784",
          variant: "#C3C6D5",
        },
      },
      fontFamily: {
        sans: [
          '"Plus Jakarta Sans"',
          "Inter",
          "Manrope",
          "system-ui",
          "sans-serif",
        ],
      },
      fontSize: {
        display: ["48px", { lineHeight: "56px", fontWeight: "700" }],
        "headline-l": ["32px", { lineHeight: "40px", fontWeight: "700" }],
        "headline-m": ["28px", { lineHeight: "36px", fontWeight: "600" }],
        "headline-s": ["24px", { lineHeight: "32px", fontWeight: "600" }],
        "title-l": ["20px", { lineHeight: "28px", fontWeight: "600" }],
        "title-m": ["16px", { lineHeight: "24px", fontWeight: "600" }],
        "body-l": ["18px", { lineHeight: "28px", fontWeight: "400" }],
        body: ["16px", { lineHeight: "24px", fontWeight: "400" }],
        "body-s": ["14px", { lineHeight: "20px", fontWeight: "400" }],
        label: ["13px", { lineHeight: "16px", fontWeight: "600" }],
        caption: ["12px", { lineHeight: "16px", fontWeight: "500" }],
      },
      spacing: {
        xs: "2px",
        sm: "4px",
        md: "8px",
        lg: "12px",
        xl: "16px",
        "2xl": "24px",
        "3xl": "32px",
        "4xl": "40px",
        "5xl": "48px",
        "6xl": "64px",
      },
      borderRadius: {
        xs: "2px",
        sm: "4px",
        md: "8px",
        lg: "12px",
        xl: "16px",
        "2xl": "24px",
      },
      boxShadow: {
        soft1: "0 1px 2px rgba(0, 0, 0, 0.05)",
        soft2: "0 2px 8px rgba(0, 0, 0, 0.08)",
        soft3: "0 4px 12px rgba(0, 0, 0, 0.1)",
        soft4: "0 8px 24px rgba(0, 0, 0, 0.12)",
        soft5: "0 12px 32px rgba(0, 0, 0, 0.15)",
      },
      backdropBlur: {
        xl: "blur(12px)",
      },
      maxWidth: {
        "7xl": "1280px",
      },
      animation: {
        "pulse-soft": "pulse-soft 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        shimmer: "shimmer 1.5s infinite",
      },
      keyframes: {
        "pulse-soft": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.8" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-1000px 0" },
          "100%": { backgroundPosition: "1000px 0" },
        },
      },
    },
  },
  plugins: [],
};
