<script setup lang="ts">
import Button from 'primevue/button'
import Card from 'primevue/card'
import Tag from 'primevue/tag'
import { computed, ref } from 'vue'

const presetThemes = ref([
  {
    id: 1,
    name: '深海蓝',
    category: '商务',
    colors: ['#1e40af', '#3b82f6', '#60a5fa', '#93c5fd'],
    description: '专业而稳重的深蓝色调，适合商务场景',
  },
  {
    id: 2,
    name: '森林绿',
    category: '自然',
    colors: ['#064e3b', '#059669', '#10b981', '#34d399'],
    description: '清新的绿色主题，带来自然的舒适感',
  },
  {
    id: 3,
    name: '日落橙',
    category: '温暖',
    colors: ['#c2410c', '#ea580c', '#f97316', '#fb923c'],
    description: '温暖的橙色调，充满活力与热情',
  },
  {
    id: 4,
    name: '薰衣草',
    category: '优雅',
    colors: ['#5b21b6', '#7c3aed', '#8b5cf6', '#a78bfa'],
    description: '优雅的紫色系，展现艺术气质',
  },
  {
    id: 5,
    name: '玫瑰粉',
    category: '温柔',
    colors: ['#be185d', '#e11d48', '#f43f5e', '#fb7185'],
    description: '柔和的粉色调，温馨而浪漫',
  },
  {
    id: 6,
    name: '石墨灰',
    category: '现代',
    colors: ['#111827', '#374151', '#6b7280', '#9ca3af'],
    description: '现代简约的灰色系，经典不过时',
  },
])

const categories = ref(['全部', '商务', '自然', '温暖', '优雅', '温柔', '现代'])
const activeCategory = ref('全部')

const filteredThemes = computed(() => {
  if (activeCategory.value === '全部') {
    return presetThemes.value
  }
  return presetThemes.value.filter(theme => theme.category === activeCategory.value)
})

function applyPresetTheme(theme: any) {
  // 这里可以实现主题应用逻辑
  // eslint-disable-next-line no-console
  console.log('应用主题:', theme)
}
</script>

<template>
  <div class="space-y-6">
    <!-- 分类筛选 -->
    <Card>
      <template #title>
        预设主题
      </template>
      <template #subtitle>
        选择和应用精心设计的预设主题
      </template>
      <template #content>
        <div class="flex flex-wrap gap-2">
          <Button
            v-for="category in categories"
            :key="category"
            :label="category"
            :severity="activeCategory === category ? 'primary' : 'secondary'"
            :outlined="activeCategory !== category"
            size="small"
            @click="activeCategory = category"
          />
        </div>
      </template>
    </Card>

    <!-- 主题网格 -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <Card
        v-for="theme in filteredThemes"
        :key="theme.id"
        class="transition-all duration-300 hover:shadow-lg hover:scale-105"
      >
        <template #title>
          <div class="flex items-center justify-between">
            <span class="text-lg font-semibold">{{ theme.name }}</span>
            <Tag :value="theme.category" severity="info" />
          </div>
        </template>
        <template #content>
          <div class="space-y-4">
            <!-- 颜色预览 -->
            <div class="flex gap-2">
              <div
                v-for="color in theme.colors"
                :key="color"
                class="flex-1 h-16 rounded-lg"
                :style="{ backgroundColor: color }"
                :title="color"
              />
            </div>

            <!-- 颜色值 -->
            <div class="grid grid-cols-2 gap-2 text-xs font-mono">
              <div
                v-for="color in theme.colors"
                :key="color"
                class="p-2 bg-gray-50 rounded text-center"
              >
                {{ color }}
              </div>
            </div>

            <!-- 描述 -->
            <p class="text-sm text-gray-600">
              {{ theme.description }}
            </p>

            <!-- 操作按钮 -->
            <div class="flex gap-2">
              <Button
                label="应用主题"
                icon="pi pi-check"
                class="flex-1"
                @click="applyPresetTheme(theme)"
              />
              <Button
                icon="pi pi-heart"
                severity="secondary"
                outlined
              />
            </div>
          </div>
        </template>
      </Card>
    </div>
  </div>
</template>
