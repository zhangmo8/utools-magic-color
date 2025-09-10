<script setup lang="ts">
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

const isError = computed(() => {
  return props.colorValue.includes('转换暂不支持') || !props.colorValue
})
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
      <CopyButton size="small" :value="colorValue" />
    </div>

    <p class="font-mono text-lg mb-2 break-all" :class="{ 'text-[rgb(var(--p-red-500))] dark:text-[rgb(var(--p-red-400))]': isError }">
      {{ colorValue }}
    </p>

    <p class="text-xs opacity-70">
      {{ colorFormat.description }}
    </p>
  </div>
</template>
