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
    // Layout shortcuts
    'bg-base': 'bg-[--p-content-background]',
    'fcc': 'flex items-center justify-center',
    'fc': 'flex items-center',
    'border-base': 'border-[--p-border]',
    'fc-col': 'flex flex-col items-center justify-center',
    'activeBg': '!bg-[--p-zinc-200] !dark:bg-[--p-surface-800]',
    'hbg': 'hover:bg-[--p-zinc-100] hover:bg-[--p-button-text-secondary-hover-background]',
    'text-base': 'text-[color:var(--p-text-color)]',
    'transition-theme': 'transition-colors duration-200 ease-in-out',

    // Card shortcuts with better contrast
    'card-base': 'border-2 rounded-lg p-4 relative group transition-all duration-300 cursor-pointer bg-[rgb(var(--p-surface-0))] border-[rgb(var(--p-surface-200))] dark:bg-[rgb(var(--p-surface-900))] dark:border-[rgb(var(--p-surface-700))]',
    'card-hover': 'hover:scale-105 hover:border-[rgb(var(--p-surface-400))] hover:bg-[rgb(var(--p-surface-50))] dark:hover:bg-[rgb(var(--p-surface-800))] dark:hover:border-[rgb(var(--p-surface-500))]',
    'card-interactive': 'card-base card-hover',

    // Enhanced card with primary accent
    'card-primary-hover': 'hover:scale-105 hover:border-[rgb(var(--p-primary-300))] hover:bg-[rgb(var(--p-primary-50))] dark:hover:bg-[rgb(var(--p-surface-800))] dark:hover:border-[rgb(var(--p-primary-400))]',
    'card-primary': 'card-base card-primary-hover',

    // Error state
    'card-error': 'border-2 rounded-lg p-4 relative group transition-all duration-300 cursor-pointer border-[rgb(var(--p-red-400))] bg-[rgb(var(--p-red-50))] dark:bg-[rgb(var(--p-red-950))] dark:border-[rgb(var(--p-red-400))]',

    // Button variations for cards
    'card-button': 'opacity-0 group-hover:opacity-100 transition-all duration-300 p-2 rounded-lg hover:bg-[rgb(var(--p-surface-100))] dark:hover:bg-[rgb(var(--p-surface-700))] text-[rgb(var(--p-surface-600))] hover:text-[rgb(var(--p-primary-500))] hover:scale-110',

    // 流水边框效果
    'border-flowing': 'relative overflow-hidden',
  },
  preflights: [
    {
      getCSS: () => `
        @keyframes border-flow {
          0% { 
            background-position: 0% 50%; 
          }
          50% { 
            background-position: 100% 50%; 
          }
          100% { 
            background-position: 0% 50%; 
          }
        }
        
        .border-flowing::before {
          content: '';
          width: 100%;
          height: 100%;
          z-index: 1;
          top: 0;
          left: 0;
          padding: 1px;
          position: absolute;
          border-radius: 0.5rem;
          background: linear-gradient(45deg, 
            transparent 0%, 
            rgba(0, 0, 0, 0.06) 15%, 
            rgba(0, 0, 0, 0.12) 25%, 
            rgba(0, 0, 0, 0.06) 35%, 
            transparent 50%, 
            rgba(0, 0, 0, 0.04) 65%, 
            rgba(0, 0, 0, 0.08) 75%, 
            rgba(0, 0, 0, 0.04) 85%, 
            transparent 100%
          );
          background-size: 400% 400%;
          animation: border-flow 2.5s linear infinite;
          opacity: 0;
          transition: opacity 0.3s ease;
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          mask-composite: exclude;
        }
        
        .border-flowing:hover::before {
          opacity: 1;
        }
        
        .dark .border-flowing:hover::before {
          background: linear-gradient(45deg, 
            transparent 0%, 
            rgba(255, 255, 255, 0.16) 15%, 
            rgba(255, 255, 255, 0.12) 25%, 
            rgba(255, 255, 255, 0.35) 35%, 
            transparent 50%, 
            rgba(255, 255, 255, 0.25) 65%, 
            rgba(255, 255, 255, 0.4) 75%, 
            rgba(255, 255, 255, 0.25) 85%, 
            transparent 100%
          );
          background-size: 400% 400%;
          animation: border-flow 2.5s linear infinite;
        }
      `,
    },
  ],
})
