# Vue 3 + TypeScript + Vite + Pinia + tailwindcss + element-plus

- 配置环境，跨域，路由，请求
- 配置 components 文件夹中自动导入自定义组件 无需 import 手动导入
- 配置 element-plus 的自动按需引入
- 配置自动导入 vue 相关函数 无需在组件中 import 手动导入 ref, reactive 等
- 封装 c-icon 组件 assets/svg 文件夹中可放 svg 图片 配合 c-icon 可实现自定义 icon 图标
- 封装 c-table 组件 把 el-table+el-el-pagination 封装成一个组件
- set.config.ts 文件可配置全局布局 如 menu 的侧边显示和顶部显示切换

### 安装依赖

`pnpm i`

### 运行/打包

```
pnpm run dev    // 开发环境
pnpm run prod   // 生产环境

pnpm run build        // 生产环境打包
pnpm run build:dev   // 开发环境打包
```
