<script setup lang="ts">
import { useToast } from 'primevue/usetoast'

const { themeColor, colorPalette, setThemeColor } = useThemeColor()
const toast = useToast()

const themeColorInput = computed({
  get: () => themeColor.value,
  set: value => setThemeColor(value),
})

function applyColorAsTheme(colorValue: string) {
  setThemeColor(colorValue)
}

async function copyColorToClipboard(colorValue: string) {
  try {
    await navigator.clipboard.writeText(colorValue)
    toast.add({
      severity: 'success',
      summary: '复制成功',
      detail: `已复制颜色值: ${colorValue}`,
      life: 2000,
    })
  }
  catch {
    toast.add({
      severity: 'error',
      summary: '复制失败',
      detail: '请手动复制颜色值',
      life: 3000,
    })
  }
}
</script>

<template>
  <div class="space-y-6">
    <!-- 主题色生成器 -->
    <Card>
      <template #title>
        主题色生成器
      </template>
      <template #content>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- 主题色设置 -->
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium mb-2">主题色</label>
              <div class="flex items-center gap-3">
                <ColorPicker v-model="themeColorInput" />
                <InputText v-model="themeColorInput" class="flex-1 font-mono" />
              </div>
            </div>
          </div>
        </div>
      </template>
    </Card>

    <!-- 主题色卡 -->
    <Card>
      <template #title>
        主题色卡
      </template>
      <template #content>
        <div class="space-y-4">
          <p class="text-sm opacity-70">
            基于当前主题色 <code class="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded font-mono">{{ themeColor }}</code> 生成的完整色卡
          </p>

          <!-- 色卡网格 -->
          <div class="grid grid-cols-2 md:grid-cols-5 lg:grid-cols-11 gap-2">
            <div
              v-for="color in colorPalette"
              :key="color.name"
              class="group relative cursor-pointer transition-transform hover:scale-105"
              @click="applyColorAsTheme(color.value)"
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
                <Button
                  icon="pi pi-copy"
                  size="small"
                  severity="secondary"
                  class="w-6 h-6 p-0"
                  @click.stop="copyColorToClipboard(color.value)"
                />
              </div>
            </div>
          </div>
        </div>
      </template>
    </Card>
  </div>
  <Toast />
</template>
