import path from 'node:path'
import { PrimeVueResolver } from '@primevue/auto-import-resolver'
import vue from '@vitejs/plugin-vue'
import UnoCSS from 'unocss/vite'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { defineConfig } from 'vite'

export default defineConfig({
  base: './',
  plugins: [
    vue(),
    UnoCSS({}),
    AutoImport({
      vueTemplate: true,
      imports: [
        'vue',
        'vue-router',
        '@vueuse/core',
      ],
      dirs: [
        './src/components/**',
        './src/composables/**',
      ],
    }),
    Components({
      dirs: [
        './src/components/**',
      ],
      resolvers: [
        PrimeVueResolver(),
      ],
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    emptyOutDir: true,
  },
})
