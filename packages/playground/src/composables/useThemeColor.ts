import { createGlobalState, useStorage } from '@vueuse/core'
import { mc } from 'magic-color'
import { computed } from 'vue'

export const useThemeColor = createGlobalState(() => {
  const themeColor = useStorage('theme-color', '#9955ff')
  const mgColor = computed(() => {
    return mc(themeColor.value)
  })

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
      return []
    }
  })

  return {
    themeColor,
    mgColor,
    colorPalette,
    setThemeColor,
  }
})
