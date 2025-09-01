<script setup lang="ts">
import ColorInput from '@/components/ColorInput.vue'

const { themeColor, mgColor } = useThemeColor()

const usedColors = useStorage<string[]>('used-colors', [])

const colorFormats = [
  { name: 'HEX', key: 'hex', description: '网页开发最常用格式' },
  { name: 'RGB', key: 'rgb', description: '红绿蓝三原色' },
  { name: 'HSL', key: 'hsl', description: '色相、饱和度、亮度' },
  { name: 'HSB', key: 'hsb', description: '色相、饱和度、明度' },
  { name: 'LAB', key: 'lab', description: 'CIE 1976 LAB* 色彩空间' },
  { name: 'LCH', key: 'lch', description: 'CIE LCH 色彩空间' },
]

const commonColors = computed(() => usedColors.value.slice(0, 10).map(hex => ({ name: hex, hex })))

function getColorResult(format: string): string {
  if (!themeColor.value)
    return ''

  try {
    switch (format) {
      case 'hex':
        return mgColor.value.css('hex').toUpperCase()
      case 'rgb':
        return mgColor.value.css('rgb')
      case 'hsl':
        return mgColor.value.css('hsl')
      case 'hsb': {
        const hsb = mgColor.value.value('hsb')
        if (Array.isArray(hsb) && hsb.length >= 3) {
          return `hsb(${Math.round(hsb[0] || 0)}, ${Math.round(hsb[1] || 0)}%, ${Math.round(hsb[2] || 0)}%)`
        }
        return mgColor.value.css('hsb')
      }
      case 'lab': {
        try {
          return mgColor.value.css('lab')
        }
        catch {
          const lab = mgColor.value.value('lab')
          if (Array.isArray(lab) && lab.length >= 3) {
            return `lab(${Math.round(lab[0] || 0)} ${Math.round(lab[1] || 0)} ${Math.round(lab[2] || 0)})`
          }
          return 'LAB 转换暂不支持'
        }
      }
      case 'lch': {
        try {
          return mgColor.value.css('lch')
        }
        catch {
          const lch = mgColor.value.value('lch')
          if (Array.isArray(lch) && lch.length >= 3) {
            return `lch(${Math.round(lch[0] || 0)} ${Math.round(lch[1] || 0)} ${Math.round(lch[2] || 0)})`
          }
          return 'LCH 转换暂不支持'
        }
      }
      default:
        return `${format.toUpperCase()} 转换暂不支持`
    }
  }
  catch {
    return `${format.toUpperCase()} 转换暂不支持`
  }
}

const colorResults = computed(() => {
  return colorFormats.map(format => ({
    ...format,
    value: getColorResult(format.key),
  }))
})

function addUsedColor(hex: string) {
  const arr = usedColors.value.filter(c => c.toLowerCase() !== hex.toLowerCase())
  arr.unshift(hex)
  if (arr.length > 10)
    arr.length = 10
  usedColors.value = arr
}

function selectCommonColor(hex: string) {
  themeColor.value = hex
  addUsedColor(hex)
}

watch(themeColor, (val) => {
  if (val)
    addUsedColor(val)
}, { immediate: true })
</script>

<template>
  <div class="color-transform-page">
    <Title title="颜色转换" desc="输入任意格式的颜色值，系统会自动识别并转换为其他格式" />

    <div class="mb-6">
      <div class="flex items-center mb-3">
        <label class="text-base font-medium">输入颜色</label>
      </div>

      <div class="grid grid-cols-12 gap-4">
        <ColorInput v-model="themeColor" />
      </div>
    </div>

    <ContentCard v-if="themeColor" title="转换结果">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <ColorResultCard
          v-for="result in colorResults"
          :key="result.key"
          :color-format="result"
          :color-value="result.value"
        />
      </div>
    </ContentCard>

    <ContentCard title="常用颜色">
      <div class="flex flex-wrap gap-2">
        <div
          v-for="color in commonColors"
          :key="color.hex"
          class="w-12 h-12 rounded-lg border-2 border cursor-pointer hover:scale-110 transition-transform"
          :style="{ backgroundColor: color.hex }"
          @click="selectCommonColor(color.hex)"
        />
      </div>
    </ContentCard>

    <ContentCard title="支持的颜色格式">
      <ul class="text-sm opacity-70 space-y-2">
        <li v-for="item in colorFormats" :key="item.key">
          <strong>{{ item.name }}:</strong> {{ item.description }}
        </li>
      </ul>
      <Message class="text-sm">
        提示: 直接输入任何格式的颜色值，系统会自动识别并转换为其他格式
      </Message>
    </ContentCard>

    <Toast />
  </div>
</template>
