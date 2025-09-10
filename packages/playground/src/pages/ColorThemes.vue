<script setup lang="ts">
import type { Colors } from 'magic-color'

import { mc } from 'magic-color'
import { formatToCSS, formatToFigma, formatToJson, formatToLess, formatToSass, formatToTailwindCSS, formatToUnoCSS } from '@/utils'

interface ExportFormat {
  icon: string
  name: string
  value: string
  parser: string
}

const { themeColor, colorPalette } = useThemeColor()

const cssFormat = ref<ExportFormat>()
const format = computed(() => cssFormat.value?.value || 'css')

const colorFormatsOptions = [
  { label: 'HEX', value: 'hex' },
  { label: 'RGB', value: 'rgb' },
  { label: 'HSL', value: 'hsl' },
  { label: 'HSB', value: 'hsb' },
]
const colorFormat = ref<keyof Colors>('hex')

const exportFormatsOptions: ExportFormat[] = [
  {
    icon: 'i-logos-unocss',
    name: 'UnoCSS',
    value: 'unocss',
    parser: 'javascript',
  },
  {
    icon: 'i-logos-tailwindcss-icon',
    name: 'Tailwind',
    value: 'tailwind',
    parser: 'javascript',
  },
  {
    icon: 'i-logos-figma',
    name: 'Figma',
    parser: 'json',
    value: 'figma',
  },
  {
    icon: 'i-logos-css-3',
    name: 'CSS',
    value: 'css',
    parser: 'css',
  },
  {
    icon: 'i-logos-sass',
    name: 'Sass',
    parser: 'scss',
    value: 'scss',
  },
  {
    icon: 'i-logos-less',
    name: 'Less',
    parser: 'less',
    value: 'less',
  },
  {
    name: 'JSON',
    icon: 'i-logos-json',
    parser: 'json',
    value: 'json',
  },
]

function generateExport(exportFormat: string) {
  const convertedPalette = mc.theme(themeColor.value, { type: colorFormat.value })

  switch (exportFormat) {
    case 'css':
      return formatToCSS(convertedPalette)
    case 'unocss':
      return formatToUnoCSS(convertedPalette, 'colors')
    case 'tailwind':
      return formatToTailwindCSS(convertedPalette, 'colors')
    case 'scss':
      return formatToSass(convertedPalette)
    case 'less':
      return formatToLess(convertedPalette)
    case 'figma':
      return formatToFigma(convertedPalette)
    case 'json':
      return formatToJson(convertedPalette, 'colors')
    default:
      return ''
  }
}

const exportedCode = computed(() => {
  return generateExport(format.value)
})

const currentLanguage = computed(() => cssFormat.value?.parser || 'text')
</script>

<template>
  <div class="color-themes-page">
    <Title title="衍生色生成器" desc="输入任意格式的颜色值，系统会自动识别并生成相关衍生色" />

    <!-- 输入区域 -->
    <div class="mb-6">
      <div class="flex items-center mb-3">
        <label class="text-base font-medium">输入颜色</label>
      </div>

      <div class="grid grid-cols-12 gap-4">
        <ColorInput v-model="themeColor" />
      </div>
    </div>

    <ContentCard v-if="themeColor" title="衍生色卡">
      <template #desc>
        基于当前主题色 <code class="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded font-mono">{{ themeColor }}</code> 生成的完整色卡
      </template>

      <div v-if="colorPalette.length" class="grid grid-cols-2 md:grid-cols-5 lg:grid-cols-11 gap-2">
        <div
          v-for="color in colorPalette"
          :key="color.name"
          class="group relative cursor-pointer transition-transform hover:scale-105"
        >
          <div
            class="aspect-square rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm"
            :style="{ backgroundColor: color.value }"
            :title="`${color.name}: ${color.value}`"
          />
          <div class="mt-2 text-center">
            <div class="text-xs font-medium">
              {{ color.name }}
            </div>
            <div class="text-xs opacity-70 font-mono">
              {{ color.value }}
            </div>
          </div>

          <!-- 复制按钮 -->
          <div class="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <CopyButton size="small" :value="color.value" />
          </div>
        </div>
      </div>
      <div v-else>
        <p class="text-sm opacity-70">
          未生成任何衍生色
        </p>
      </div>
    </ContentCard>

    <ContentCard title="衍生代码" desc="将当前主题色衍生出各种格式的代码">
      <template #desc>
        <div class="flex items-center gap-4">
          <div class="flex items-center gap-2">
            <label class="text-sm font-medium">导出格式:</label>
            <Select
              v-model="cssFormat"
              :options="exportFormatsOptions"
              option-label="name"
              placeholder="选择格式"
              class="w-40"
            >
              <template #value="slotProps">
                <div v-if="slotProps.value" class="flex items-center gap-2">
                  <i :class="slotProps.value?.icon" />
                  {{ slotProps.value?.name }}
                </div>
                <span v-else>
                  {{ slotProps.placeholder }}
                </span>
              </template>
              <template #option="slotProps">
                <div>{{ slotProps.option.name }}</div>
              </template>
            </Select>
          </div>
          <div class="flex items-center gap-2">
            <label class="text-sm font-medium">颜色格式:</label>
            <Select
              v-model="colorFormat"
              :options="colorFormatsOptions"
              option-label="label"
              option-value="value"
              placeholder="选择颜色格式"
              class="w-32"
            />
          </div>
        </div>
      </template>
      <div class="space-y-4">
        <CodeBlock
          v-if="exportedCode"
          :code="exportedCode"
          :lang="currentLanguage"
        />
        <div v-else class="text-center text-gray-500 py-8">
          请选择一个导出格式
        </div>
      </div>
    </ContentCard>

    <Toast />
  </div>
</template>
