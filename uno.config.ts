import { defineConfig, presetAttributify, presetIcons, presetWind3 } from 'unocss'

export default defineConfig({
  presets: [
    presetWind3({
      dark: 'class',
    }),
    presetAttributify(),
    presetIcons({
      scale: 1.2,
      warn: true,
    }),
  ],
  theme: {
    colors: {
      primary: {
        50: 'rgb(var(--p-primary-50, 239 246 255))',
        100: 'rgb(var(--p-primary-100, 219 234 254))',
        200: 'rgb(var(--p-primary-200, 191 219 254))',
        300: 'rgb(var(--p-primary-300, 147 197 253))',
        400: 'rgb(var(--p-primary-400, 96 165 250))',
        500: 'rgb(var(--p-primary-500, 59 130 246))',
        600: 'rgb(var(--p-primary-600, 37 99 235))',
        700: 'rgb(var(--p-primary-700, 29 78 216))',
        800: 'rgb(var(--p-primary-800, 30 64 175))',
        900: 'rgb(var(--p-primary-900, 30 58 138))',
        950: 'rgb(var(--p-primary-950, 23 37 84))',
      },
    },
  },
  shortcuts: {
    'bg-base': 'bg-[--p-content-background]',
    'fcc': 'flex items-center justify-center',
    'fc': 'flex items-center',
    'fc-col': 'flex flex-col items-center justify-center',
    'activeBg': '!bg-[--p-zinc-200] !dark:bg-[--p-surface-800]',
    'hbg': 'hover:bg-[--p-zinc-100] hover:bg-[--p-button-text-secondary-hover-background]',
    'text-base': 'text-[color:var(--p-text-color)]',
    'transition-theme': 'transition-colors duration-200 ease-in-out',
  },
})
