import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    redirect: '/color-transform',
  },
  {
    path: '/color-transform',
    name: 'ColorTransform',
    component: () => import('@/pages/ColorTransform.vue'),
  },
  {
    path: '/color-match',
    name: 'ColorMatch',
    component: () => import('@/pages/ColorMatch.vue'),
  },
  {
    path: '/color-themes',
    name: 'ColorThemes',
    component: () => import('@/pages/ColorThemes.vue'),
  },
  {
    path: '/preset-themes',
    name: 'PresetThemes',
    component: () => import('@/pages/PresetThemes.vue'),
  },
  {
    path: '/export-themes',
    name: 'ExportThemes',
    component: () => import('@/pages/ExportThemes.vue'),
  },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
