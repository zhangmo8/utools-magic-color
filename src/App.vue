<script setup lang="ts">
import { useRouter } from 'vue-router'
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar'

const router = useRouter()

function navigate(path: string) {
  router.push(path)
}

const menuItems = [
  { label: '颜色匹配', path: '/color-match' },
  { label: '颜色主题', path: '/color-themes' },
  { label: '预设主题', path: '/preset-themes' },
  { label: '导出主题', path: '/export-themes' },
]
</script>

<template>
  <SidebarProvider>
    <Sidebar>
      <SidebarHeader>
        <h2 class="text-lg font-semibold">
          MagicColor
        </h2>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>功能菜单</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem v-for="item in menuItems" :key="item.path">
                <SidebarMenuButton @click="navigate(item.path)">
                  {{ item.label }}
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
    <SidebarInset>
      <header class="flex h-16 items-center gap-2 border-b px-4">
        <SidebarTrigger class="-ml-1" />
      </header>
      <div class="flex-1 space-y-4 p-4">
        <router-view />
      </div>
    </SidebarInset>
  </SidebarProvider>
</template>
