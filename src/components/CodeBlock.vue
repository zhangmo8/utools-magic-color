<script setup lang="ts">
import { codeToHtml } from 'shiki'
import { onMounted, ref, watch } from 'vue'

const props = defineProps<{
  code: string
  lang: string
}>()

const htmlCode = ref('')

async function highlightCode() {
  if (!props.code)
    return

  try {
    htmlCode.value = await codeToHtml(props.code, {
      lang: props.lang,
      theme: 'min-light',
    })
  }
  catch (error) {
    console.error('Shiki highlighting failed:', error)
    htmlCode.value = `<pre><code>${props.code}</code></pre>`
  }
}

onMounted(highlightCode)
watch(() => [props.code, props.lang], highlightCode)
</script>

<template>
  <div class="relative">
    <div
      class="shiki-container overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700"
      v-html="htmlCode"
    />
    <div class="absolute top-2 right-2">
      <CopyButton :value="code" />
    </div>
  </div>
</template>

<style>
.shiki-container {
  font-size: 14px;
  line-height: 1.5;
}

.shiki-container pre {
  margin: 0;
  padding: 1rem;
  overflow-x: auto;
}

.shiki-container code {
  font-family: 'JetBrains Mono', 'Fira Code', Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace;
}
</style>
