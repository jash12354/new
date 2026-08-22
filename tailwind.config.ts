import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        mehndi: {
          50: '#FDF8F5',
          100: '#F7ECE5',
          200: '#EBD2C2',
          300: '#D9AD93',
          400: '#C28263',
          500: '#A45B38',
          600: '#864326',
          700: '#6B311B',
          800: '#4A2111',
          900: '#2F140A',
          950: '#1D0B05',
        },
        emerald: {
          50: '#f0fdf4',
          800: '#064e3b',
          900: '#0B291D',
          950: '#061710',
        },
        cream: {
          50: '#FFFFFF',
          100: '#FAF9F5',
          200: '#F3EFE6',
          300: '#E8E1D2',
        },
        gold: {
          100: '#FAF0CD',
          200: '#F3DD94',
          300: '#E5C45B',
          400: '#D4AF37',
          500: '#B8860B',
          600: '#8B6508',
        },
      },
      fontFamily: {
        serif: ['var(--font-playfair)', 'Georgia', 'serif'],
        sans: ['var(--font-jakarta)', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'henna-pattern': "url('/henna-pattern.svg')",
      },
    },
  },
  plugins: [],
} satisfies Config;
