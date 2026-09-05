/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        ivory: {
          DEFAULT: "#FAF8F4",
          50: "#FEFCF9",
          100: "#FAF8F4",
          200: "#F5F0E8",
          300: "#EDE6D8",
        },
        charcoal: {
          DEFAULT: "#1A1816",
          light: "#2D2926",
          muted: "#8A857D",
        },
        champagne: {
          DEFAULT: "#B8975F",
          light: "#D4BC8A",
          muted: "#C8AB74",
          dark: "#9A7D4A",
          50: "#FAF6EF",
          100: "#F0E8D6",
        },
        "text-secondary": "#8A857D",
        "text-muted": "#B5AFA6",
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', "Georgia", "serif"],
        cormorant: ['"Cormorant Garamond"', "Georgia", "serif"],
        body: ['"Plus Jakarta Sans"', "system-ui", "-apple-system", "sans-serif"],
        serif: ['"Cormorant Garamond"', "Georgia", "serif"],
        sans: ['"Plus Jakarta Sans"', "system-ui", "sans-serif"],
      },
      fontSize: {
        "display-xl": ["clamp(3.5rem, 8vw, 7rem)", { lineHeight: "1.05", letterSpacing: "-0.02em" }],
        "display-lg": ["clamp(2.75rem, 6vw, 5rem)", { lineHeight: "1.05", letterSpacing: "-0.02em" }],
        "display-md": ["clamp(2.25rem, 5vw, 3.5rem)", { lineHeight: "1.1", letterSpacing: "-0.02em" }],
        "display-sm": ["clamp(1.75rem, 4vw, 2.5rem)", { lineHeight: "1.15", letterSpacing: "-0.01em" }],
        "eyebrow": ["0.625rem", { lineHeight: "1.4", letterSpacing: "0.35em" }],
        "body-lg": ["0.9375rem", { lineHeight: "1.7" }],
        "body-sm": ["0.8125rem", { lineHeight: "1.6" }],
        "caption": ["0.6875rem", { lineHeight: "1.5", letterSpacing: "0.15em" }],
      },
      spacing: {
        "section": "clamp(5rem, 10vw, 9rem)",
        "section-sm": "clamp(3rem, 6vw, 5rem)",
      },
      transitionTimingFunction: {
        luxury: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        smooth: "cubic-bezier(0.4, 0, 0.2, 1)",
      },
      transitionDuration: {
        slow: "800ms",
        medium: "500ms",
      },
      boxShadow: {
        subtle: "0 2px 20px rgba(0, 0, 0, 0.04)",
        elevated: "0 8px 40px rgba(0, 0, 0, 0.08)",
        drawer: "-20px 0 60px rgba(0, 0, 0, 0.1)",
      },
      animation: {
        "marquee": "marquee-scroll 35s linear infinite",
      },
      keyframes: {
        "marquee-scroll": {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
      },
      screens: {
        xs: "475px",
        "3xl": "1920px",
      },
    },
  },
  plugins: [],
};
