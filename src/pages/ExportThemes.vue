<script setup lang="ts">
import Button from 'primevue/button'
import Card from 'primevue/card'
import Dropdown from 'primevue/dropdown'
import InputText from 'primevue/inputtext'
import Textarea from 'primevue/textarea'
import { ref } from 'vue'

const themeName = ref('My Color Theme')
const exportFormat = ref('CSS')
const exportFormats = ref([
  { label: 'CSS Variables', value: 'CSS' },
  { label: 'JSON', value: 'JSON' },
  { label: 'SCSS Variables', value: 'SCSS' },
  { label: 'Tailwind Config', value: 'TAILWIND' },
  { label: 'Figma Tokens', value: 'FIGMA' },
])

const currentTheme = ref({
  primary: '#3b82f6',
  secondary: '#8b5cf6',
  accent: '#06b6d4',
  success: '#10b981',
  warning: '#f59e0b',
  error: '#ef4444',
  background: '#ffffff',
  surface: '#f8fafc',
  text: '#1f2937',
})

const exportedCode = ref('')

function generateExport() {
  const theme = currentTheme.value

  switch (exportFormat.value) {
    case 'CSS':
      exportedCode.value = `:root {
  --color-primary: ${theme.primary};
  --color-secondary: ${theme.secondary};
  --color-accent: ${theme.accent};
  --color-success: ${theme.success};
  --color-warning: ${theme.warning};
  --color-error: ${theme.error};
  --color-background: ${theme.background};
  --color-surface: ${theme.surface};
  --color-text: ${theme.text};
}`
      break

    case 'JSON':
      exportedCode.value = JSON.stringify({
        name: themeName.value,
        colors: theme,
      }, null, 2)
      break

    case 'SCSS':
      exportedCode.value = `$primary: ${theme.primary};
$secondary: ${theme.secondary};
$accent: ${theme.accent};
$success: ${theme.success};
$warning: ${theme.warning};
$error: ${theme.error};
$background: ${theme.background};
$surface: ${theme.surface};
$text: ${theme.text};`
      break

    case 'TAILWIND':
      exportedCode.value = `module.exports = {
  theme: {
    extend: {
      colors: {
        primary: '${theme.primary}',
        secondary: '${theme.secondary}',
        accent: '${theme.accent}',
        success: '${theme.success}',
        warning: '${theme.warning}',
        error: '${theme.error}',
        background: '${theme.background}',
        surface: '${theme.surface}',
        text: '${theme.text}',
      }
    }
  }
}`
      break

    case 'FIGMA':
      exportedCode.value = JSON.stringify({
        [themeName.value]: {
          primary: { value: theme.primary, type: 'color' },
          secondary: { value: theme.secondary, type: 'color' },
          accent: { value: theme.accent, type: 'color' },
          success: { value: theme.success, type: 'color' },
          warning: { value: theme.warning, type: 'color' },
          error: { value: theme.error, type: 'color' },
          background: { value: theme.background, type: 'color' },
          surface: { value: theme.surface, type: 'color' },
          text: { value: theme.text, type: 'color' },
        },
      }, null, 2)
      break
  }
}

function copyToClipboard() {
  navigator.clipboard.writeText(exportedCode.value)
}

function downloadFile() {
  const extensions = {
    CSS: 'css',
    JSON: 'json',
    SCSS: 'scss',
    TAILWIND: 'js',
    FIGMA: 'json',
  }

  const blob = new Blob([exportedCode.value], { type: 'text/plain' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `${themeName.value.toLowerCase().replace(/\s+/g, '-')}.${extensions[exportFormat.value as keyof typeof extensions]}`
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}

// 初始化生成
generateExport()
</script>

<template>
  <div class="space-y-6">
    <!-- 导出设置 -->
    <Card>
      <template #title>
        导出主题
      </template>
      <template #subtitle>
        将当前主题导出为各种格式的文件
      </template>
      <template #content>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- 设置选项 -->
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium mb-2">主题名称</label>
              <InputText v-model="themeName" class="w-full" />
            </div>

            <div>
              <label class="block text-sm font-medium mb-2">导出格式</label>
              <Dropdown
                v-model="exportFormat"
                :options="exportFormats"
                option-label="label"
                option-value="value"
                class="w-full"
                @change="generateExport"
              />
            </div>

            <Button
              label="重新生成"
              icon="pi pi-refresh"
              class="w-full"
              @click="generateExport"
            />
          </div>

          <!-- 当前主题预览 -->
          <div class="space-y-4">
            <h3 class="text-lg font-medium">
              当前主题预览
            </h3>
            <div class="grid grid-cols-3 gap-2">
              <div
                v-for="(color, key) in currentTheme"
                :key="key"
                class="aspect-square rounded-lg border border-gray-200 flex items-end p-2"
                :style="{ backgroundColor: color }"
              >
                <div class="text-xs font-medium text-white bg-black bg-opacity-50 px-1 rounded">
                  {{ key }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>
    </Card>

    <!-- 导出代码 -->
    <Card>
      <template #title>
        导出代码
      </template>
      <template #content>
        <div class="space-y-4">
          <Textarea
            v-model="exportedCode"
            rows="20"
            class="w-full font-mono text-sm"
            readonly
          />

          <div class="flex gap-3">
            <Button
              label="复制到剪贴板"
              icon="pi pi-copy"
              @click="copyToClipboard"
            />
            <Button
              label="下载文件"
              icon="pi pi-download"
              severity="secondary"
              @click="downloadFile"
            />
          </div>
        </div>
      </template>
    </Card>
  </div>
</template>
