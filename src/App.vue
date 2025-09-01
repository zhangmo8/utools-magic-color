<script setup lang="ts">
import ColorInput from './components/ColorInput.vue'

const menuItems: Array<{ label: string, icon: string, route: string, separator?: boolean }> = [
  { label: '颜色转换', icon: 'i-carbon-color-palette', route: '/color-transform' },
  { label: '对比度', icon: 'i-carbon-brightness-contrast', route: '/color-match' },
  { label: '衍生颜色', icon: 'i-carbon-stacked-scrolling-2', route: '/color-themes' },
  { label: '预设色卡', icon: 'i-carbon-window-preset', route: '/preset-themes' },
]

const { themeColor } = useThemeColor()
</script>

<template>
  <main class="size-screen bg-base transition-theme">
    <div class="size-full flex">
      <div class="w-70 h-full flex flex-col">
        <ScrollPanel class="flex-1 h-0">
          <div class="flex items-center justify-between p-4">
            <h3 class="text-lg font-bold m-0 text-[color:var(--p-text-color)]">
              MagicColor uTools
            </h3>
            <ThemeToggle text />
          </div>
          <Divider class="!m-0" />
          <ul class="list-none m-0 p-2">
            <li v-for="item in menuItems" :key="item.label" class="[&+li]:mt-2">
              <RouterLink
                :to="item.route"
                class="no-underline w-full text-base fc p-4 gap-3 hbg rounded cursor-pointer"
                :class="[{ activeBg: item.route === $route.path }]"
              >
                <i :class="item.icon" />
                <div class="font-bold">
                  {{ item.label }}
                </div>
              </RouterLink>
            </li>
          </ul>
        </ScrollPanel>
        <ColorInput v-model="themeColor" class="p-4 " />
        <a
          v-ripple
          target="_blank"
          href="https://github.com/zyyv/magic-color"
          class="no-underline w-full text-base fc p-4 gap-2 hbg rounded-none cursor-pointer"
        >
          <i class="pi pi-github !text-7" />
          <div class="font-bold">Github</div>
        </a>
        <a
          v-ripple
          target="_blank"
          href="https://github.com/zyyv/magic-color"
          class="mt-2 no-underline w-full text-base fc p-4 gap-2 hbg rounded-none cursor-pointer"
        >
          <Avatar image="https://raw.githubusercontent.com/zyyv/magic-color/main/public/logo.svg" shape="circle" />
          <div class="font-bold">MagicColor</div>
        </a>
      </div>

      <Divider class="!mx-0" layout="vertical" />

      <ScrollPanel class="flex-1 h-full">
        <div class="px-6 pb-6">
          <router-view />
        </div>
      </ScrollPanel>
    </div>
  </main>
</template>
