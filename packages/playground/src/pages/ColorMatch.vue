<script setup lang="ts">
import { mc } from 'magic-color'

const { themeColor } = useThemeColor()

const convertedPalette = computed(() => {
  return mc.theme(themeColor.value)
})
</script>

<template>
  <Title title="对比度" desc="输入任意格式的颜色值，系统会自动识别并生成相关对比度颜色" />
  <RatioTable :colors="convertedPalette" />
  <Toast />
</template>
