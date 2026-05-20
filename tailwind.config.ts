import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#5B21B6',
        accent: '#F97316',
        bgLight: '#FAFAFA',
        bgDark: '#0A0A0A',
        textLight: '#111111',
        textDark: '#F5F5F5',
      },
      fontFamily: {
        sans: ['Geist', 'system-ui', 'sans-serif'],
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        pulse2: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        },
        waveform: {
          '0%, 100%': { scaleY: '0.4' },
          '50%': { scaleY: '1' },
        },
        slideIn: {
          '0%': { opacity: '0', transform: 'translateX(-16px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
      },
      animation: {
        fadeUp: 'fadeUp 0.6s ease both',
        float: 'float 3s ease-in-out infinite',
        pulse2: 'pulse2 2s ease-in-out infinite',
        waveform: 'waveform 0.8s ease-in-out infinite',
        slideIn: 'slideIn 0.4s ease both',
      },
    },
  },
  plugins: [],
};

export default config;
