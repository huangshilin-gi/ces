import { defineConfig, loadEnv } from 'vite'
import { resolve } from 'path'
import vue from '@vitejs/plugin-vue'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import createProxyConfig from './config-c/proxy'

// https://vitejs.dev/config/
export default defineConfig((configEnv) => {
  const config = loadEnv(configEnv.mode, './')
  return {
    plugins: [
      vue(),
      AutoImport({
        // 自动导入vue相关函数
        imports: ['vue'],
        resolvers: [
          ElementPlusResolver(),
          IconsResolver({
            prefix: 'Icon'
          })
        ],
        dts: 'src/typings/auto-imports.d.ts'
      }),
      Components({
        // 自动导入自定义组件
        dirs: ['src/components'],
        resolvers: [
          IconsResolver({
            enabledCollections: ['ep']
          }),
          ElementPlusResolver()
        ],
        dts: 'src/typings/components.d.ts'
      }),
      Icons({
        autoInstall: true
      }),
      createSvgIconsPlugin({
        // 指定要缓存的图标文件夹
        iconDirs: [resolve(process.cwd(), 'src/assets/svg')],
        // 执行icon name的格式
        symbolId: 'icon-[name]'
      })
    ],
    resolve: {
      // 配置别名
      alias: {
        '@': resolve(__dirname, 'src')
      }
    },
    define: {
      __Admin_VERSION__: JSON.stringify(process.env.npm_package_version)
    },
    server: {
      port: 3000, // 配置服务器端口
      open: true, // 是否自动打开浏览器
      cors: true, // 允许跨域
      proxy: createProxyConfig(config)
    },
    build: {
      outDir: 'dist'
    }
  }
})
