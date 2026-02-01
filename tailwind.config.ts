import type { Config } from "tailwindcss"

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "crimson": "#8B1538",
        "deep-red": "#6B1133",
        "muted-gold": "#C9A961",
        "creamy": "#F5F1E8",
      },
      fontFamily: {
        "playfair": "var(--font-playfair)",
        "vietnam": "var(--font-be-vietnam)",
      },
      keyframes: {
        shake: {
          '0%, 100%': { transform: 'rotate(0deg) translateY(0px)' },
          '25%': { transform: 'rotate(-8deg) translateY(-15px)' },
          '50%': { transform: 'rotate(8deg) translateY(-20px)' },
          '75%': { transform: 'rotate(-8deg) translateY(-15px)' },
        },
        fadeInScale: {
          '0%': { opacity: '0', transform: 'scale(0.8)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        particle: {
          '0%': { opacity: '1', transform: 'translateY(0) rotate(0deg)' },
          '100%': { opacity: '0', transform: 'translateY(-100px) rotate(360deg)' },
        },
      },
      animation: {
        shake: 'shake 0.8s ease-in-out',
        "fade-in-scale": "fadeInScale 0.6s ease-out",
        float: "float 3s ease-in-out infinite",
        particle: "particle 2s ease-out forwards",
      },
      backdropFilter: {
        glass: "blur(10px)",
      },
    },
  },
  plugins: [],
}
export default config
