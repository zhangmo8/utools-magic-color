<script setup lang="ts">
import { mc } from 'magic-color'
import InputText from 'primevue/inputtext'
import Toast from 'primevue/toast'
import { computed, ref } from 'vue'
import ColorResultCard from '../components/ColorResultCard.vue'

const inputValue = ref('#FF5733')
const errorMessage = ref('')
const currentColor = ref<any>(null)

const colorFormats = [
  { name: 'HEX', key: 'hex', description: '网页开发最常用格式' },
  { name: 'RGB', key: 'rgb', description: '红绿蓝三原色' },
  { name: 'HSL', key: 'hsl', description: '色相、饱和度、亮度' },
  { name: 'HSB', key: 'hsb', description: '色相、饱和度、明度' },
  { name: 'LAB', key: 'lab', description: 'CIE 1976 LAB* 色彩空间' },
  { name: 'LCH', key: 'lch', description: 'CIE LCH 色彩空间' },
]

const commonColors = [
  { name: '红色', hex: '#FF0000' },
  { name: '绿色', hex: '#00FF00' },
  { name: '蓝色', hex: '#0000FF' },
  { name: '黄色', hex: '#FFFF00' },
  { name: '紫色', hex: '#800080' },
  { name: '青色', hex: '#00FFFF' },
  { name: '洋红', hex: '#FF00FF' },
  { name: '橙色', hex: '#FFA500' },
  { name: '粉色', hex: '#FFC0CB' },
  { name: '灰色', hex: '#808080' },
  { name: '黑色', hex: '#000000' },
  { name: '白色', hex: '#FFFFFF' },
]

const previewColor = computed(() => {
  if (currentColor.value) {
    return currentColor.value.css()
  }
  return '#FFFFFF'
})

function getColorResult(format: string): string {
  if (!currentColor.value)
    return ''

  try {
    switch (format) {
      case 'hex':
        return currentColor.value.css('hex').toUpperCase()
      case 'rgb':
        return currentColor.value.css('rgb')
      case 'hsl':
        return currentColor.value.css('hsl')
      case 'hsb': {
        // 尝试使用 value 方法获取 HSB 值
        const hsb = currentColor.value.value('hsb')
        if (Array.isArray(hsb) && hsb.length >= 3) {
          return `hsb(${Math.round(hsb[0] || 0)}, ${Math.round(hsb[1] || 0)}%, ${Math.round(hsb[2] || 0)}%)`
        }
        // 如果上面不行，尝试使用 css 方法
        return currentColor.value.css('hsb')
      }
      case 'lab': {
        // 尝试使用 css 方法
        try {
          return currentColor.value.css('lab')
        }
        catch {
          // 如果不支持 css 格式，尝试使用 value 方法
          const lab = currentColor.value.value('lab')
          if (Array.isArray(lab) && lab.length >= 3) {
            return `lab(${Math.round(lab[0] || 0)} ${Math.round(lab[1] || 0)} ${Math.round(lab[2] || 0)})`
          }
          return 'LAB 转换暂不支持'
        }
      }
      case 'lch': {
        // 尝试使用 css 方法
        try {
          return currentColor.value.css('lch')
        }
        catch {
          // 如果不支持 css 格式，尝试使用 value 方法
          const lch = currentColor.value.value('lch')
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

function parseColor(value: string) {
  try {
    errorMessage.value = ''
    // 让 magic-color 自动推导颜色格式
    const color = mc(value)
    currentColor.value = color
    return color
  }
  catch {
    errorMessage.value = '无效的颜色值，请检查输入格式'
    currentColor.value = null
    return null
  }
}

function handleInput() {
  const value = inputValue.value.trim()
  if (value) {
    parseColor(value)
  }
}

function selectCommonColor(hex: string) {
  inputValue.value = hex
  parseColor(hex)
}

onMounted(handleInput)
</script>

<template>
  <div class="color-transform-page p-6">
    <div class="mb-6">
      <h1 class="text-2xl font-bold mb-2">
        颜色转换
      </h1>
      <p class="text-sm opacity-70">
        输入任意格式的颜色值，系统会自动识别并转换为其他格式
      </p>
    </div>

    <!-- 输入区域 -->
    <div class="mb-6">
      <div class="flex items-center mb-3">
        <label class="text-base font-medium">输入颜色</label>
      </div>

      <div class="grid grid-cols-12 gap-4">
        <div class="col-span-8">
          <InputText
            v-model="inputValue"
            placeholder="例如：#FF5733, rgb(255, 87, 51), hsl(11, 100%, 60%), lab(62 52 64), blue"
            class="w-full"
            @input="handleInput"
          />
        </div>

        <div class="col-span-4">
          <div
            class="w-full h-10 border-2 border-base rounded"
            :style="{ backgroundColor: previewColor }"
          />
        </div>
      </div>

      <div v-if="errorMessage" class="mt-2 p-3 bg-red-50 border border-red-200 rounded text-red-700">
        {{ errorMessage }}
      </div>
    </div>

    <div v-if="!errorMessage && currentColor" class="space-y-4">
      <h3 class="text-lg font-medium">
        转换结果
      </h3>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <ColorResultCard
          v-for="result in colorResults"
          :key="result.key"
          :color-format="result"
          :color-value="result.value"
        />
      </div>
    </div>

    <div class="mt-8">
      <h3 class="text-lg font-medium mb-4">
        常用颜色
      </h3>
      <div class="flex flex-wrap gap-2">
        <div
          v-for="color in commonColors"
          :key="color.hex"
          class="w-12 h-12 rounded-lg border-2 border cursor-pointer hover:scale-110 transition-transform"
          :style="{ backgroundColor: color.hex }"
          :title="`${color.name} - ${color.hex}`"
          @click="selectCommonColor(color.hex)"
        />
      </div>
    </div>

    <div class="mt-8">
      <h3 class="text-lg font-medium mb-4">
        支持的颜色格式
      </h3>
      <ul class="text-sm opacity-70 space-y-2">
        <li><strong>HEX:</strong> 十六进制格式，如 #FF5733、#3b82f6</li>
        <li><strong>RGB:</strong> 红绿蓝格式，如 rgb(255, 87, 51)、rgba(59, 130, 246, 0.8)</li>
        <li><strong>HSL:</strong> 色相、饱和度、亮度格式，如 hsl(11, 100%, 60%)</li>
        <li><strong>HSB:</strong> 色相、饱和度、明度格式，如 hsb(217, 76%, 96%)</li>
        <li><strong>LAB:</strong> CIE 1976 LAB* 色彩空间，更接近人眼感知</li>
        <li><strong>LCH:</strong> CIE LCH 色彩空间，亮度-色度-色相</li>
        <li><strong>颜色名:</strong> CSS 颜色关键字，如 red、blue、green</li>
      </ul>
      <Message class="text-sm">
        提示: 直接输入任何格式的颜色值，系统会自动识别并转换为其他格式
      </Message>
    </div>
    <Toast />
  </div>
</template>
