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
        // New dark theme tokens
        bg:       '#050810',
        surface:  '#0d1117',
        surface2: '#131922',
        surface3: '#1a2235',
        cyan:     '#00D4FF',
        amber:    '#F59E0B',
        muted:    '#94A3B8',
        // Legacy (keep for other pages)
        primary:  '#00D4FF',
        accent:   '#F59E0B',
        bgLight:  '#050810',
        bgDark:   '#050810',
        textLight:'#FFFFFF',
        textDark: '#FFFFFF',
      },
      fontFamily: {
        sans:       ['var(--font-dm-sans)', 'DM Sans', 'system-ui', 'sans-serif'],
        syne:       ['var(--font-syne)', 'Syne', 'sans-serif'],
        display:    ['var(--font-syne)', 'Syne', 'sans-serif'],
        'dm-sans':  ['var(--font-dm-sans)', 'DM Sans', 'system-ui', 'sans-serif'],
      },
      keyframes: {
        fadeUp: {
          '0%':   { opacity: '0', transform: 'translateY(28px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':       { transform: 'translateY(-14px)' },
        },
        waveform: {
          '0%, 100%': { transform: 'scaleY(0.3)' },
          '50%':       { transform: 'scaleY(1)' },
        },
        pulse2: {
          '0%, 100%': { opacity: '1' },
          '50%':       { opacity: '0.4' },
        },
      },
      animation: {
        fadeUp:   'fadeUp 0.65s cubic-bezier(0.22, 1, 0.36, 1) both',
        float:    'float 4s ease-in-out infinite',
        waveform: 'waveform 0.9s ease-in-out infinite',
        pulse2:   'pulse2 2s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};

export default config;
