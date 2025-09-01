<script setup lang="ts">
import { mc } from 'magic-color'
import { useToast } from 'primevue'
import { computed } from 'vue'

const props = withDefaults(defineProps<{
  backgroundColor: string
  color: string
  text?: string
  ratio?: number
  type?: 'WCAG' | 'APCA' | 'NORMAL'
}>(), {
  type: 'NORMAL',
  text: '',
  ratio: 1,
})
const toast = useToast()
const calcRatio = computed(() => {
  if (props.type === 'WCAG')
    return mc.wcag(props.backgroundColor, props.color)

  else if (props.type === 'APCA')
    return Number.parseFloat((mc.apca(props.backgroundColor, props.color) as number).toFixed(1))

  return 'N/A'
})

const isDisplay = computed(() => {
  if (props.type === 'WCAG')
    return Number(calcRatio.value) >= props.ratio

  else if (props.type === 'APCA')
    return Math.abs(Number(calcRatio.value)) >= props.ratio

  else if (props.type === 'NORMAL')
    return true

  return false
})

const text = computed(() => {
  if (isDisplay.value) {
    if (props.type === 'WCAG')
      return calcRatio.value

    else if (props.type === 'APCA')
      return calcRatio.value
  }

  return props.text
})

const { copy } = useClipboard({ source: props.backgroundColor })

function copyColor() {
  copy(props.backgroundColor)
  toast.add({
    severity: 'success',
    summary: '复制成功',
    detail: `已复制颜色值: ${props.backgroundColor}`,
    life: 2000,
  })
}
</script>

<template>
  <div class="fcc aspect-square hover:rd-1/2 transition-all cursor-pointer" :class="[isDisplay ? '' : 'placeholder']" :style="isDisplay ? { backgroundColor, color } : {}" @click="copyColor()">
    {{ text }}
  </div>
</template>

<style scoped>
.dark .placeholder {
  background-image: linear-gradient(45deg, rgb(255 255 255/6%) 26%, rgb(255 255 255/3%) 0, rgb(255 255 255/3%) 50%, rgb(255 255 255/6%) 0, rgb(255 255 255/6%) 75%, rgb(255 255 255/3%) 0, rgb(255 255 255/3%));
}

.placeholder{
  background-image: linear-gradient(45deg, rgb(0 0 0/6%) 26%, rgb(0 0 0/3%) 0, rgb(0 0 0/3%) 50%, rgb(0 0 0/6%) 0, rgb(0 0 0/6%) 75%, rgb(0 0 0/3%) 0, rgb(0 0 0/3%));
}
</style>
