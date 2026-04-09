import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Brand Teal System (Primary)
        primary: {
          50: "#E8F4F5",   // pale wash
          100: "#D1E9EB",
          200: "#A3D3D7",
          300: "#75BDC3",
          400: "#47A7AF",
          500: "#0F8A8F",  // teal light
          600: "#0D7377",  // teal primary (brand)
          700: "#0B6165",
          800: "#094F53",
          900: "#073D41",
          DEFAULT: "#0D7377",
          foreground: "#FFFFFF",
        },
        // Neutral System
        slate: {
          50: "#F5F5F5",
          100: "#EEEEEE",
          200: "#CCCCCC",
          300: "#AAAAAA",
          400: "#888888",  // caption / hint
          500: "#666666",
          600: "#444444",  // body text
          700: "#333333",
          800: "#222222",
          900: "#111111",  // headline text
        },
        // Legacy support (mapped to slate)
        gray: {
          50: "#F5F5F5",
          100: "#EEEEEE",
          200: "#CCCCCC",
          300: "#AAAAAA",
          400: "#888888",
          500: "#666666",
          600: "#444444",
          700: "#333333",
          800: "#222222",
          900: "#111111",
        },
        // Semantic colors
        background: "#F5F5F5",
        foreground: "#111111",
        secondary: {
          DEFAULT: "#EEEEEE",
          foreground: "#111111",
        },
        accent: {
          DEFAULT: "#EEEEEE",
          foreground: "#111111",
        },
        muted: {
          DEFAULT: "#EEEEEE",
          foreground: "#888888",
        },
        border: "#E0E0E0",
        input: "#E0E0E0",
        ring: "#0D7377",
        destructive: {
          DEFAULT: "#DC2626",
          foreground: "#FFFFFF",
        },
        card: {
          DEFAULT: "#FFFFFF",
          foreground: "#111111",
        },
        // Semantic accent tokens
        whatsapp: "#25D366",
        heart: "#DC2626",
      },
      borderRadius: {
        none: "0",
        sm: "0.25rem",     // 4px
        DEFAULT: "0.375rem", // 6px
        md: "0.5rem",      // 8px
        lg: "0.625rem",    // 10px
        xl: "0.75rem",     // 12px — cards / controls
        "2xl": "0.75rem",  // 12px — cards (same as xl for flat look)
        "3xl": "1.375rem", // 22px — pill buttons
        full: "9999px",    // circles
      },
      boxShadow: {
        sm: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
        DEFAULT: "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
        md: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
        lg: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
        xl: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
        "2xl": "0 25px 50px -12px rgb(0 0 0 / 0.25)",
        inner: "inset 0 2px 4px 0 rgb(0 0 0 / 0.05)",
        soft: "0 2px 8px 0 rgb(0 0 0 / 0.06), 0 1px 2px 0 rgb(0 0 0 / 0.04)",
        "soft-md": "0 4px 12px 0 rgb(0 0 0 / 0.06), 0 2px 4px 0 rgb(0 0 0 / 0.04)",
        "soft-lg": "0 8px 24px 0 rgb(0 0 0 / 0.06), 0 4px 8px 0 rgb(0 0 0 / 0.04)",
        "soft-xl": "0 12px 32px 0 rgb(0 0 0 / 0.08), 0 6px 12px 0 rgb(0 0 0 / 0.06)",
        none: "none",
      },
      fontFamily: {
        sans: [
          "var(--font-noto-sans-arabic)",
          "Noto Sans Arabic",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "sans-serif",
        ],
        display: [
          "var(--font-noto-sans-arabic)",
          "Noto Sans Arabic",
          "sans-serif",
        ],
      },
      fontSize: {
        xs: ["0.75rem", { lineHeight: "1rem", letterSpacing: "0.05em" }],
        sm: ["0.875rem", { lineHeight: "1.25rem", letterSpacing: "0.025em" }],
        base: ["1rem", { lineHeight: "1.5rem", letterSpacing: "0" }],
        lg: ["1.125rem", { lineHeight: "1.75rem", letterSpacing: "-0.01em" }],
        xl: ["1.25rem", { lineHeight: "1.75rem", letterSpacing: "-0.02em" }],
        "2xl": ["1.5rem", { lineHeight: "2rem", letterSpacing: "-0.02em" }],
        "3xl": ["1.875rem", { lineHeight: "2.25rem", letterSpacing: "-0.02em" }],
        "4xl": ["2.25rem", { lineHeight: "2.5rem", letterSpacing: "-0.03em" }],
        "5xl": ["3rem", { lineHeight: "1", letterSpacing: "-0.03em" }],
        "6xl": ["3.75rem", { lineHeight: "1", letterSpacing: "-0.04em" }],
      },
      fontWeight: {
        light: "300",
        normal: "400",
        medium: "500",
        semibold: "600",
        bold: "700",
        extrabold: "800",
        black: "900",
      },
      letterSpacing: {
        tighter: "-0.05em",
        tight: "-0.025em",
        normal: "0",
        wide: "0.025em",
        wider: "0.05em",
        widest: "0.1em",
      },
      lineHeight: {
        none: "1",
        tight: "1.25",
        snug: "1.375",
        normal: "1.5",
        relaxed: "1.625",
        loose: "2",
      },
      transitionDuration: {
        "150": "140ms", // map 150ms → ~0.14s (within 0.12–0.16s range)
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
