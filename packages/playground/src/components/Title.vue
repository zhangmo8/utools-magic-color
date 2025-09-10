<script setup lang="ts">
defineProps<{
  title: string
  desc?: string
}>()
</script>

<template>
  <div class="py-6 sticky top-0 bg-base z-9">
    <h1 class="m-0 text-2xl font-bold !mb-2">
      {{ title }}
    </h1>
    <p class="text-sm opacity-70">
      {{ desc }}
    </p>
  </div>
</template>
