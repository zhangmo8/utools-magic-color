import { createGlobalState, useStorage } from '@vueuse/core'
import { mc } from 'magic-color'
import { computed } from 'vue'

// 使用 VueUse 创建全局状态
export const useThemeColor = createGlobalState(() => {
  // 使用 useStorage 实现持久化存储
  const themeColor = useStorage('theme-color', '#9955ff')

  function setThemeColor(color: string) {
    themeColor.value = color
  }

  const colorPalette = computed(() => {
    try {
      const colors = mc.theme(themeColor.value)
      return Object.entries(colors).map(([key, value]) => ({
        name: key,
        value: value as string,
        hex: value as string,
      }))
    }
    catch (error) {
      console.error('生成主题色失败:', error)
      // 返回默认紫色主题
      return []
    }
  })

  return {
    themeColor,
    colorPalette,
    setThemeColor,
  }
})
