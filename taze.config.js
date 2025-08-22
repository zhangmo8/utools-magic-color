import { defineConfig } from 'taze'

export default defineConfig({
  force: true,
  write: true,
  install: true,
  ignorePaths: [
    '**/node_modules/**',
    '**/test/**',
  ],
  ignoreOtherWorkspaces: true,
  packageMode: {
    typescript: 'major',
    unocss: 'latest',
    vue: 'latest',
  },
})
