<script setup lang="ts">
interface Props {
  size?: 'small' | 'normal' | 'large'
  rounded?: boolean
  outlined?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  size: 'normal',
  rounded: false,
  outlined: false,
  text: false,
})
const { themeColor } = useThemeColor()
function pickColor() {
  utools.screenColorPick(({ hex }: { hex: string }) => {
    themeColor.value = hex
  })
}
</script>

<template>
  <Button
    icon="pi pi-pencil"
    :size="props.size"
    :rounded="props.rounded"
    :outlined="props.outlined"
    severity="secondary"
    @click="pickColor"
  />
</template>
