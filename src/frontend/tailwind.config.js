import typography from "@tailwindcss/typography";
import containerQueries from "@tailwindcss/container-queries";
import animate from "tailwindcss-animate";

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["index.html", "src/**/*.{js,ts,jsx,tsx,html,css}"],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        display: ['"Cabinet Grotesk"', "sans-serif"],
        body: ['"General Sans"', "sans-serif"],
        sans: ['"General Sans"', "sans-serif"],
      },
      colors: {
        border: "oklch(var(--border))",
        input: "oklch(var(--input))",
        ring: "oklch(var(--ring) / <alpha-value>)",
        background: "oklch(var(--background))",
        foreground: "oklch(var(--foreground))",
        primary: {
          DEFAULT: "oklch(var(--primary) / <alpha-value>)",
          foreground: "oklch(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "oklch(var(--secondary) / <alpha-value>)",
          foreground: "oklch(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "oklch(var(--destructive) / <alpha-value>)",
          foreground: "oklch(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "oklch(var(--muted) / <alpha-value>)",
          foreground: "oklch(var(--muted-foreground) / <alpha-value>)",
        },
        accent: {
          DEFAULT: "oklch(var(--accent) / <alpha-value>)",
          foreground: "oklch(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "oklch(var(--popover))",
          foreground: "oklch(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "oklch(var(--card))",
          foreground: "oklch(var(--card-foreground))",
        },
        chart: {
          1: "oklch(var(--chart-1))",
          2: "oklch(var(--chart-2))",
          3: "oklch(var(--chart-3))",
          4: "oklch(var(--chart-4))",
          5: "oklch(var(--chart-5))",
        },
        sidebar: {
          DEFAULT: "oklch(var(--sidebar))",
          foreground: "oklch(var(--sidebar-foreground))",
          primary: "oklch(var(--sidebar-primary))",
          "primary-foreground": "oklch(var(--sidebar-primary-foreground))",
          accent: "oklch(var(--sidebar-accent))",
          "accent-foreground": "oklch(var(--sidebar-accent-foreground))",
          border: "oklch(var(--sidebar-border))",
          ring: "oklch(var(--sidebar-ring))",
        },
        saffron: {
          DEFAULT: "oklch(var(--saffron))",
          light: "oklch(var(--saffron-light))",
        },
        gold: {
          DEFAULT: "oklch(var(--gold))",
          deep: "oklch(var(--gold-deep))",
        },
        earth: {
          DEFAULT: "oklch(var(--earth))",
          light: "oklch(var(--earth-light))",
        },
        cream: "oklch(var(--cream))",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        xl: "1.25rem",
        "2xl": "1.5rem",
      },
      boxShadow: {
        xs: "0 1px 2px 0 rgba(0,0,0,0.05)",
        warm: "0 4px 24px -4px oklch(0.62 0.18 50 / 0.25)",
        "warm-lg": "0 8px 40px -8px oklch(0.62 0.18 50 / 0.3)",
        card: "0 2px 12px oklch(0.18 0.04 45 / 0.08), 0 1px 3px oklch(0.18 0.04 45 / 0.05)",
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
        "slide-in-right": {
          from: { transform: "translateX(100%)", opacity: "0" },
          to: { transform: "translateX(0)", opacity: "1" },
        },
        "shimmer": {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "slide-in-right": "slide-in-right 0.35s cubic-bezier(0.32, 0.72, 0, 1)",
        "shimmer": "shimmer 2s linear infinite",
      },
      backgroundImage: {
        "hero-warm": "linear-gradient(135deg, oklch(0.18 0.06 45 / 0.85) 0%, oklch(0.25 0.08 50 / 0.7) 50%, oklch(0.18 0.06 45 / 0.88) 100%)",
        "saffron-gradient": "linear-gradient(135deg, oklch(0.65 0.19 48) 0%, oklch(0.72 0.18 58) 100%)",
        "golden-strip": "linear-gradient(90deg, oklch(0.55 0.15 48), oklch(0.65 0.19 48), oklch(0.72 0.17 58))",
      },
    },
  },
  plugins: [typography, containerQueries, animate],
};
