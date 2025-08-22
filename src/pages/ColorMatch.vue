<script setup lang="ts">
import { Magicolor } from 'magic-color'
import Button from 'primevue/button'
import Card from 'primevue/card'
import InputText from 'primevue/inputtext'
import { ref } from 'vue'

const colorInput = ref('#3b82f6')
const matchedColors = ref<any[]>([])

function matchColors() {
  try {
    const color = new Magicolor(colorInput.value)
    matchedColors.value = [
      { name: 'HEX', value: color.hex },
      { name: 'RGB', value: color.rgb },
      { name: 'HSL', value: color.hsl },
    ]
  }
  catch (error) {
    console.error('Invalid color:', error)
  }
}

// 初始化匹配
matchColors()
</script>

<template>
  <Card class="max-w-4xl mx-auto">
    <template #title>
      颜色匹配
    </template>
    <template #subtitle>
      输入颜色，匹配并提取不同格式的颜色值
    </template>
    <template #content>
      <div class="space-y-6">
        <!-- 颜色输入 -->
        <div class="space-y-2">
          <label class="block text-sm font-medium text-base">颜色输入</label>
          <div class="flex gap-3">
            <InputText
              v-model="colorInput"
              placeholder="输入颜色值 (如: #3b82f6, rgb(59, 130, 246))"
              class="flex-1"
            />
            <Button
              label="匹配颜色"
              icon="pi pi-search"
              @click="matchColors"
            />
          </div>
        </div>

        <!-- 颜色预览 -->
        <div class="space-y-2">
          <label class="block text-sm font-medium text-base">颜色预览</label>
          <div
            class="w-full h-24 rounded-lg border-2 border-base transition-theme"
            :style="{ backgroundColor: colorInput }"
          />
        </div>

        <!-- 匹配结果 -->
        <div class="space-y-2">
          <label class="block text-sm font-medium text-base">匹配结果</label>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card
              v-for="color in matchedColors"
              :key="color.name"
              class="text-center transition-theme"
            >
              <template #title>
                <div class="text-sm font-medium text-base">
                  {{ color.name }}
                </div>
              </template>
              <template #content>
                <div class="text-xs text-muted font-mono p-2 bg-gray-50 dark:bg-gray-800 rounded transition-theme">
                  {{ color.value }}
                </div>
              </template>
            </Card>
          </div>
        </div>
      </div>
    </template>
  </Card>
</template>
