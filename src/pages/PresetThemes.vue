<script setup lang="ts">
import { UnoColors } from '@/constant'

const colorMap = Object.entries(UnoColors)
  .filter(([_, v]) => typeof v === 'object')
  .map(([k, v]) => {
    const numberKeyRe = /^\d{2,3}$/
    const keys = Object.keys(v as any).filter(k => numberKeyRe.test(k))
    return { key: k[0]?.toUpperCase() + k.slice(1).toLowerCase(), value: keys.map(k => [k, (v as any)[k]]) as [string, string][] }
  })
</script>

<template>
  <div class="preset-themes-page">
    <Title title="预设主题色" desc="预设色卡" />

    <ContentCard title="UnoCSS 预设主题">
      <div v-if="colorMap.length">
        <div
          v-for="colorPalette in colorMap"
          :key="colorPalette.key"
          class="py-2"
        >
          <h5>{{ colorPalette.key }}</h5>
          <div class="grid grid-cols-2 md:grid-cols-5 lg:grid-cols-11 gap-2">
            <div
              v-for="color in colorPalette.value"
              :key="color[0]"
              class="group relative cursor-pointer transition-transform hover:scale-105"
            >
              <div
                class="aspect-square rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm"
                :style="{ backgroundColor: color[1] }"
                :title="`${color[0]}: ${color[1]}`"
              />
              <div class="mt-2 text-center">
                <div class="text-xs font-medium">
                  {{ color[0] }}
                </div>
                <div class="text-xs opacity-70 font-mono">
                  {{ color[1] }}
                </div>
              </div>

              <div class="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <CopyButton size="small" :value="color[1]" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </ContentCard>
    <Toast />
  </div>
</template>
