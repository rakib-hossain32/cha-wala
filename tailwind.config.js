/** @type {import('tailwindcss').Config} */
const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "var(--color-border)" /* tan */,
        input: "var(--color-input)" /* beige */,
        ring: "var(--color-ring)" /* saddle brown */,
        background: "var(--color-background)" /* cornsilk */,
        foreground: "var(--color-foreground)" /* dark brown */,
        primary: {
          DEFAULT: "var(--color-primary)" /* saddle brown */,
          foreground: "var(--color-primary-foreground)" /* white */,
        },
        secondary: {
          DEFAULT: "var(--color-secondary)" /* chocolate */,
          foreground: "var(--color-secondary-foreground)" /* white */,
        },
        destructive: {
          DEFAULT: "var(--color-destructive)" /* indian red */,
          foreground: "var(--color-destructive-foreground)" /* white */,
        },
        muted: {
          DEFAULT: "var(--color-muted)" /* beige */,
          foreground: "var(--color-muted-foreground)" /* brown */,
        },
        accent: {
          DEFAULT: "var(--color-accent)" /* forest green */,
          foreground: "var(--color-accent-foreground)" /* white */,
        },
        popover: {
          DEFAULT: "var(--color-popover)" /* white */,
          foreground: "var(--color-popover-foreground)" /* dark brown */,
        },
        card: {
          DEFAULT: "var(--color-card)" /* beige */,
          foreground: "var(--color-card-foreground)" /* dark brown */,
        },
        success: {
          DEFAULT: "var(--color-success)" /* lime green */,
          foreground: "var(--color-success-foreground)" /* white */,
        },
        warning: {
          DEFAULT: "var(--color-warning)" /* dark orange */,
          foreground: "var(--color-warning-foreground)" /* white */,
        },
        error: {
          DEFAULT: "var(--color-error)" /* indian red */,
          foreground: "var(--color-error-foreground)" /* white */,
        },
        conversion: {
          DEFAULT: "var(--color-conversion)" /* orange red */,
          foreground: "var(--color-conversion-foreground)" /* white */,
        },
        trust: {
          DEFAULT: "var(--color-trust)" /* dark olive green */,
          foreground: "var(--color-trust-foreground)" /* white */,
        },
        brandTan: {
          DEFAULT: "var(--color-brand-tan)" /* tan */,
          foreground: "var(--color-brand-tan-foreground)" /* dark brown */,
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        bengali: ["Noto Serif Bengali", "serif"],
        sans: ["Inter", "sans-serif"],
        heading: ["Poppins", "sans-serif"],
        accent: ["Kalam", "cursive"],
      },
      spacing: {
        13: "3.25rem",
        21: "5.25rem",
        34: "8.5rem",
        55: "13.75rem",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "steam-rise": {
          "0%": {
            transform: "translateY(0) scale(1)",
            opacity: "0.3",
          },
          "50%": {
            opacity: "0.8",
          },
          "100%": {
            transform: "translateY(-20px) scale(1.1)",
            opacity: "0",
          },
        },
        "pattern-morph": {
          "0%, 100%": {
            clipPath: "circle(50% at 50% 50%)",
          },
          "50%": {
            clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        steam: "steam-rise 4s ease-in-out infinite",
        "pattern-morph": "pattern-morph 6s ease-in-out infinite",
      },
      boxShadow: {
        warm: "0 4px 20px rgba(139, 69, 19, 0.15)",
        "warm-sm": "0 2px 8px rgba(139, 69, 19, 0.1)",
      },
    },
  },
  plugins: [],
};

export default config;
