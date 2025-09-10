# Magic Color

一个基于 Vue 3、PrimeVue 和 UnoCSS 构建的现代颜色工具应用，专为 UTools 插件平台设计。

## ✨ 功能特性

- 🎨 **颜色匹配** - 输入颜色值，自动匹配并转换为不同格式
- 🌈 **颜色主题管理** - 创建、编辑和管理自定义颜色主题
- 📚 **预设主题库** - 精选的预设主题，适合不同场景使用
- 📁 **主题导出** - 支持多种格式导出（CSS、JSON、SCSS、Tailwind、Figma）
- 📱 **响应式设计** - 完美适配桌面和移动设备
- 🌙 **深色模式支持** - 优雅的明暗主题切换

## 🛠️ 技术栈

- **前端框架**: Vue 3 + TypeScript
- **UI 组件库**: PrimeVue
- **样式方案**: UnoCSS
- **构建工具**: Vite
- **路由**: Vue Router
- **颜色处理**: magic-color
- **图标**: PrimeIcons

## 🚀 快速开始

### 环境要求

- Node.js >= 16
- pnpm >= 7

### 安装依赖

```bash
pnpm install
```

### 开发模式

```bash
pnpm dev
```

### 构建生产版本

```bash
pnpm build
```

### 预览构建结果

```bash
pnpm preview
```

## 📁 项目结构

```
src/
├── assets/          # 静态资源
├── components/      # 公共组件
├── pages/           # 页面组件
│   ├── ColorMatch.vue      # 颜色匹配页面
│   ├── ColorThemes.vue     # 主题管理页面
│   ├── PresetThemes.vue    # 预设主题页面
│   └── ExportThemes.vue    # 主题导出页面
├── router/          # 路由配置
├── App.vue          # 根组件
├── main.ts          # 应用入口
└── style.css        # 全局样式
```

## 🎯 主要页面

### 颜色匹配
- 支持多种颜色格式输入（HEX、RGB、HSL 等）
- 实时颜色预览
- 自动转换为多种格式

### 颜色主题
- 可视化颜色选择器
- 实时主题预览
- 主题保存和管理

### 预设主题
- 精心设计的主题库
- 分类筛选功能
- 一键应用主题

### 主题导出
- 支持 CSS Variables
- 支持 JSON 格式
- 支持 SCSS Variables
- 支持 Tailwind 配置
- 支持 Figma Tokens
- 一键复制和下载

## 🎨 样式系统

项目使用 UnoCSS 作为原子化 CSS 框架，配合 PrimeVue 提供的组件样式，实现了：

- 统一的设计语言
- 高度可定制的主题系统
- 优秀的性能表现
- 响应式设计支持

## 🔧 配置说明

### UnoCSS 配置

`uno.config.ts` 文件包含了项目的原子化 CSS 配置，包括：

- 预设配置（Uno、Attributify、Icons、Web Fonts）
- 自定义主题颜色
- 实用工具类快捷方式

### PrimeVue 配置

`main.ts` 中配置了 PrimeVue：

- Aura 主题
- 深色模式支持
- Toast 服务

## 📦 构建优化

- 使用 Vite 进行快速构建
- 自动代码分割
- 资源优化压缩
- TypeScript 类型检查

## 🤝 贡献指南

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情

## 🙏 致谢

- [Vue.js](https://vuejs.org/) - 渐进式 JavaScript 框架
- [PrimeVue](https://primevue.org/) - Vue.js UI 组件库
- [UnoCSS](https://unocss.dev/) - 即时原子化 CSS 引擎
- [magic-color](https://github.com/zhangmo8/magic-color) - 强大的颜色处理库
- [UTools](https://u.tools/) - 生产力工具平台
