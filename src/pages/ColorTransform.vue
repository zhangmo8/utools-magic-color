<script setup lang="ts">
import { mc } from 'magic-color'
import InputText from 'primevue/inputtext'
import Toast from 'primevue/toast'
import { computed, ref } from 'vue'

const inputValue = ref('#FF5733')
const errorMessage = ref('')
const currentColor = ref<any>(null)

// 常用颜色
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

// 计算属性
const previewColor = computed(() => {
  if (currentColor.value) {
    return currentColor.value.css()
  }
  return '#FFFFFF'
})

const hexResult = computed(() => {
  if (currentColor.value) {
    return currentColor.value.css('hex').toUpperCase()
  }
  return ''
})

const rgbResult = computed(() => {
  if (currentColor.value) {
    return currentColor.value.css('rgb')
  }
  return ''
})

const hslResult = computed(() => {
  if (currentColor.value) {
    return currentColor.value.css('hsl')
  }
  return ''
})

const labResult = computed(() => {
  if (currentColor.value) {
    try {
      // 尝试使用 css 方法
      return currentColor.value.css('lab')
    }
    catch {
      // 如果不支持 css 格式，尝试使用 value 方法
      try {
        const lab = currentColor.value.value('lab')
        if (Array.isArray(lab) && lab.length >= 3) {
          return `lab(${Math.round(lab[0] || 0)} ${Math.round(lab[1] || 0)} ${Math.round(lab[2] || 0)})`
        }
        return 'LAB 转换暂不支持'
      }
      catch {
        return 'LAB 转换暂不支持'
      }
    }
  }
  return ''
})

const lchResult = computed(() => {
  if (currentColor.value) {
    try {
      // 尝试使用 css 方法
      return currentColor.value.css('lch')
    }
    catch {
      // 如果不支持 css 格式，尝试使用 value 方法
      try {
        const lch = currentColor.value.value('lch')
        if (Array.isArray(lch) && lch.length >= 3) {
          return `lch(${Math.round(lch[0] || 0)} ${Math.round(lch[1] || 0)} ${Math.round(lch[2] || 0)})`
        }
        return 'LCH 转换暂不支持'
      }
      catch {
        return 'LCH 转换暂不支持'
      }
    }
  }
  return ''
})

const hsbResult = computed(() => {
  if (currentColor.value) {
    try {
      // 尝试使用 value 方法获取 HSB 值
      const hsb = currentColor.value.value('hsb')
      if (Array.isArray(hsb) && hsb.length >= 3) {
        return `hsb(${Math.round(hsb[0] || 0)}, ${Math.round(hsb[1] || 0)}%, ${Math.round(hsb[2] || 0)}%)`
      }
      // 如果上面不行，尝试使用 css 方法
      return currentColor.value.css('hsb')
    }
    catch {
      return 'HSB 转换暂不支持'
    }
  }
  return ''
})

// 方法
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

// 初始化
setTimeout(() => {
  handleInput()
}, 0)
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
        <!-- 颜色输入 -->
        <div class="col-span-8">
          <InputText
            v-model="inputValue"
            placeholder="例如：#FF5733, rgb(255, 87, 51), hsl(11, 100%, 60%), lab(62 52 64), blue"
            class="w-full"
            @input="handleInput"
          />
        </div>

        <!-- 颜色预览 -->
        <div class="col-span-4">
          <div
            class="w-full h-10 border-2 border-base rounded"
            :style="{ backgroundColor: previewColor }"
          />
        </div>
      </div>

      <!-- 错误提示 -->
      <div v-if="errorMessage" class="mt-2 p-3 bg-red-50 border border-red-200 rounded text-red-700">
        {{ errorMessage }}
      </div>
    </div>

    <!-- 转换结果 -->
    <div v-if="!errorMessage && currentColor" class="space-y-4">
      <h3 class="text-lg font-medium">
        转换结果
      </h3>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div class="border border-surface rounded p-4">
          <h4 class="font-bold">
            HEX
          </h4>
          <p class="font-mono">
            {{ hexResult }}
          </p>
          <p class="text-xs opacity-70 mt-1">
            网页开发最常用格式
          </p>
        </div>

        <div class="border border-surface rounded p-4">
          <h4 class="font-bold">
            RGB
          </h4>
          <p class="font-mono">
            {{ rgbResult }}
          </p>
          <p class="text-xs opacity-70 mt-1">
            红绿蓝三原色
          </p>
        </div>

        <div class="border border-surface rounded p-4">
          <h4 class="font-bold">
            HSL
          </h4>
          <p class="font-mono">
            {{ hslResult }}
          </p>
          <p class="text-xs opacity-70 mt-1">
            色相、饱和度、亮度
          </p>
        </div>

        <div class="border border-surface rounded p-4">
          <h4 class="font-bold">
            HSB
          </h4>
          <p class="font-mono">
            {{ hsbResult }}
          </p>
          <p class="text-xs opacity-70 mt-1">
            色相、饱和度、明度
          </p>
        </div>

        <div class="border border-surface rounded p-4">
          <h4 class="font-bold">
            LAB
          </h4>
          <p class="font-mono">
            {{ labResult }}
          </p>
          <p class="text-xs opacity-70 mt-1">
            CIE 1976 LAB* 色彩空间
          </p>
        </div>

        <div class="border border-surface rounded p-4">
          <h4 class="font-bold">
            LCH
          </h4>
          <p class="font-mono">
            {{ lchResult }}
          </p>
          <p class="text-xs opacity-70 mt-1">
            CIE LCH 色彩空间
          </p>
        </div>
      </div>
    </div>

    <!-- 常用颜色快速选择 -->
    <div class="mt-8">
      <h3 class="text-lg font-medium mb-4">
        常用颜色
      </h3>
      <div class="flex flex-wrap gap-2">
        <div
          v-for="color in commonColors"
          :key="color.hex"
          class="w-12 h-12 rounded-lg border-2 border-base cursor-pointer hover:scale-110 transition-transform"
          :style="{ backgroundColor: color.hex }"
          :title="`${color.name} - ${color.hex}`"
          @click="selectCommonColor(color.hex)"
        />
      </div>
    </div>

    <!-- 使用说明 -->
    <!-- 使用说明 -->
    <div class="mt-8">
      <h3 class="text-lg font-medium mb-4">
        支持的颜色格式
      </h3>
      <div class="text-sm opacity-70 space-y-2">
        <div>• <strong>HEX:</strong> 十六进制格式，如 #FF5733、#3b82f6</div>
        <div>• <strong>RGB:</strong> 红绿蓝格式，如 rgb(255, 87, 51)、rgba(59, 130, 246, 0.8)</div>
        <div>• <strong>HSL:</strong> 色相、饱和度、亮度格式，如 hsl(11, 100%, 60%)</div>
        <div>• <strong>HSB:</strong> 色相、饱和度、明度格式，如 hsb(217, 76%, 96%)</div>
        <div>• <strong>LAB:</strong> CIE 1976 LAB* 色彩空间，更接近人眼感知</div>
        <div>• <strong>LCH:</strong> CIE LCH 色彩空间，亮度-色度-色相</div>
        <div>• <strong>颜色名:</strong> CSS 颜色关键字，如 red、blue、green</div>
        <div class="mt-3 p-3 bg-blue-50 border border-blue-200 rounded">
          <strong>提示:</strong> 直接输入任何格式的颜色值，系统会自动识别并转换为其他格式
        </div>
      </div>
    </div>    <!-- Toast 组件 -->
    <Toast />
  </div>
</template>
