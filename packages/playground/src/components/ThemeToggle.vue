<script setup lang="ts">
import Button from 'primevue/button'
import { useTheme } from '@/composables/useTheme'

interface Props {
  size?: 'small' | 'normal' | 'large'
  rounded?: boolean
  outlined?: boolean
  text?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  size: 'normal',
  rounded: false,
  outlined: false,
  text: false,
})

const { isDark, toggleDark } = useTheme()
</script>

<template>
  <Button
    :icon="isDark ? 'pi pi-sun' : 'pi pi-moon'"
    :size="props.size"
    :rounded="props.rounded"
    :outlined="props.outlined"
    :text="props.text"
    severity="secondary"
    :title="isDark ? '切换到浅色模式' : '切换到深色模式'"
    @click="toggleDark()"
  />
</template>
