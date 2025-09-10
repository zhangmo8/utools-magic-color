<script setup lang="ts">
import { mc } from 'magic-color'

const innerValue = defineModel<string>()

const color = computed({
  get(): string {
    try {
      return mc(innerValue.value || '').css('hex')
    }
    catch {
      return '#000000'
    }
  },
  set(value: string) {
    innerValue.value = mc(value).css(mc(innerValue.value || '').type)
  },
})
</script>

<template>
  <div class="flex items-center gap-3">
    <ColorPicker v-model="color" />
    <InputText v-model="innerValue" class="flex-1 font-mono" />
  </div>
</template>
