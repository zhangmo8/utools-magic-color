<script setup lang="ts">
defineProps<{
  title: string
  desc?: string
}>()
</script>

<template>
  <div class="mb-6">
    <h1 class="m-0 text-2xl font-bold !mb-2">
      {{ title }}
    </h1>
    <p class="text-sm opacity-70">
      {{ desc }}
    </p>
  </div>
</template>
