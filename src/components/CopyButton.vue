<script setup lang="ts">
import { useToast } from 'primevue'

const props = defineProps<{ value: string, size?: 'small' | 'medium' | 'large' }>()

const toast = useToast()
const copied = ref(false)

async function copyColorToClipboard() {
  const colorValue = props.value
  copied.value = true
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
  finally {
    setTimeout(() => {
      copied.value = false
    }, 600)
  }
}
</script>

<template>
  <Button
    :icon="copied ? 'pi pi-check' : 'pi pi-copy'"
    :severity="copied ? 'success' : 'secondary'"
    :size="size"
    class="!bg-transparent transition-all duration-300 z-2" :class="[copied ? 'opacity-100' : 'opacity-0 group-hover:opacity-100']"
    variant="text"
    :title="copied ? '已复制' : '复制'"
    @click.stop="copyColorToClipboard()"
  />
</template>
