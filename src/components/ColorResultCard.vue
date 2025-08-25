<script setup lang="ts">
import { useToast } from 'primevue/usetoast'
import { computed, ref } from 'vue'

interface ColorFormat {
  name: string
  key: string
  description: string
}

interface Props {
  colorFormat: ColorFormat
  colorValue: string
}

const props = defineProps<Props>()
const toast = useToast()

const isError = computed(() => {
  return props.colorValue.includes('转换暂不支持') || !props.colorValue
})

const showFeedback = ref(false)

async function copyToClipboard() {
  if (isError.value)
    return

  try {
    await navigator.clipboard.writeText(props.colorValue)

    // 显示成功反馈
    showFeedback.value = true
    setTimeout(() => {
      showFeedback.value = false
    }, 300)

    toast.add({
      severity: 'success',
      summary: '复制成功',
      detail: `已复制 ${props.colorFormat.name}: ${props.colorValue}`,
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
  <div
    class="border-2 rounded-lg p-4 relative group transition-all duration-300 hover:scale-105 cursor-pointer border-flowing"
    :class="{
      'card-error': isError,
      'card-primary': !isError,
    }"
  >
    <div class="flex items-center justify-between mb-2">
      <h4 class="font-bold text-base my-2">
        {{ colorFormat.name }}
      </h4>
      <Button
        v-if="!isError"
        :severity=" showFeedback ? 'success' : 'secondary'"
        :variant="showFeedback ? '' : 'text'"
        class="transition-all duration-300 z-2"
        :class="showFeedback ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'"
        :title="`复制 ${colorFormat.name} 值`"
        @click.stop="copyToClipboard"
      >
        <i v-if="!showFeedback" class="pi pi-copy text-sm" />
        <i v-else class="pi pi-check text-sm" />
      </Button>
    </div>

    <p class="font-mono text-lg mb-2 break-all" :class="{ 'text-[rgb(var(--p-red-500))] dark:text-[rgb(var(--p-red-400))]': isError }">
      {{ colorValue }}
    </p>

    <p class="text-xs opacity-70">
      {{ colorFormat.description }}
    </p>
  </div>
</template>
