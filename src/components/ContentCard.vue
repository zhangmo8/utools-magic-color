<script setup lang="ts">
const props = defineProps<{
  title: string
  desc?: string
}>()
</script>

<template>
  <div class="content-card [&+.content-card]:mt-6 space-y-4">
    <h3 class="text-lg font-medium">
      {{ title }}
    </h3>
    <p v-if="$slots.desc || props.desc" class="text-sm opacity-70">
      <slot name="desc">
        {{ props.desc }}
      </slot>
    </p>

    <slot />
  </div>
</template>
