import type { Config } from 'tailwindcss'

export default {
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './app.vue',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: 'var(--color-primary)',
        secondary: 'var(--color-secondary)',
        textClr: 'var(--color-text)',
        danger: 'var(--color-danger)',
        dangerAct: 'var(--color-dangerAct)',
        bgClr: 'var(--color-background)',
        WtB: 'var(--color-WtB)',        
        WtBAct: 'var(--color-WtBAct)',
        BtW: 'var(--color-BtW)',
        BtWAct: 'var(--color-BtWAct)',
        ash: 'var(--color-ash)',
        ashAct: 'var(--color-ashAct)',
        hsa: 'var(--color-hsa)',
        hsaAct: 'var(--color-hsaAct)',
      },

      fontFamily: {
        body: ['"Nunito Sans"', 'sans-serif'],
        sans: ['Inter var', 'sans-serif'],
        heading: ['Poppins', 'sans-serif']
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
  ],
} satisfies Config