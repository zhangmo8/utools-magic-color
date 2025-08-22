<script setup lang="ts">
import Button from 'primevue/button'
import Card from 'primevue/card'
import ColorPicker from 'primevue/colorpicker'
import InputText from 'primevue/inputtext'
import { ref } from 'vue'

const themeName = ref('我的主题')
const primaryColor = ref('#3b82f6')
const secondaryColor = ref('#8b5cf6')
const accentColor = ref('#06b6d4')
const themes = ref([
  {
    id: 1,
    name: '蓝色主题',
    primary: '#3b82f6',
    secondary: '#8b5cf6',
    accent: '#06b6d4',
  },
  {
    id: 2,
    name: '绿色主题',
    primary: '#10b981',
    secondary: '#059669',
    accent: '#34d399',
  },
])

function saveTheme() {
  const newTheme = {
    id: Date.now(),
    name: themeName.value,
    primary: primaryColor.value,
    secondary: secondaryColor.value,
    accent: accentColor.value,
  }
  themes.value.push(newTheme)
}

function applyTheme(theme: any) {
  primaryColor.value = theme.primary
  secondaryColor.value = theme.secondary
  accentColor.value = theme.accent
  themeName.value = theme.name
}
</script>

<template>
  <div class="space-y-6">
    <!-- 主题创建器 -->
    <Card>
      <template #title>
        创建颜色主题
      </template>
      <template #content>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- 主题设置 -->
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium mb-2">主题名称</label>
              <InputText v-model="themeName" class="w-full" />
            </div>

            <div>
              <label class="block text-sm font-medium mb-2">主色调</label>
              <div class="flex items-center gap-3">
                <ColorPicker v-model="primaryColor" />
                <InputText v-model="primaryColor" class="flex-1 font-mono" />
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium mb-2">辅助色</label>
              <div class="flex items-center gap-3">
                <ColorPicker v-model="secondaryColor" />
                <InputText v-model="secondaryColor" class="flex-1 font-mono" />
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium mb-2">强调色</label>
              <div class="flex items-center gap-3">
                <ColorPicker v-model="accentColor" />
                <InputText v-model="accentColor" class="flex-1 font-mono" />
              </div>
            </div>

            <Button
              label="保存主题"
              icon="pi pi-save"
              class="w-full"
              @click="saveTheme"
            />
          </div>

          <!-- 主题预览 -->
          <div class="space-y-4">
            <h3 class="text-lg font-medium">
              预览
            </h3>
            <div class="space-y-3">
              <div
                class="h-16 rounded-lg flex items-center justify-center text-white font-medium"
                :style="{ backgroundColor: primaryColor }"
              >
                主色调 {{ primaryColor }}
              </div>
              <div
                class="h-16 rounded-lg flex items-center justify-center text-white font-medium"
                :style="{ backgroundColor: secondaryColor }"
              >
                辅助色 {{ secondaryColor }}
              </div>
              <div
                class="h-16 rounded-lg flex items-center justify-center text-white font-medium"
                :style="{ backgroundColor: accentColor }"
              >
                强调色 {{ accentColor }}
              </div>
            </div>
          </div>
        </div>
      </template>
    </Card>

    <!-- 已保存的主题 -->
    <Card>
      <template #title>
        已保存的主题
      </template>
      <template #content>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Card
            v-for="theme in themes"
            :key="theme.id"
            class="cursor-pointer transition-shadow hover:shadow-lg"
            @click="applyTheme(theme)"
          >
            <template #title>
              <div class="text-sm font-medium">
                {{ theme.name }}
              </div>
            </template>
            <template #content>
              <div class="space-y-2">
                <div class="flex gap-2">
                  <div
                    class="w-8 h-8 rounded"
                    :style="{ backgroundColor: theme.primary }"
                    :title="theme.primary"
                  />
                  <div
                    class="w-8 h-8 rounded"
                    :style="{ backgroundColor: theme.secondary }"
                    :title="theme.secondary"
                  />
                  <div
                    class="w-8 h-8 rounded"
                    :style="{ backgroundColor: theme.accent }"
                    :title="theme.accent"
                  />
                </div>
                <Button
                  label="应用"
                  size="small"
                  class="w-full"
                />
              </div>
            </template>
          </Card>
        </div>
      </template>
    </Card>
  </div>
</template>
