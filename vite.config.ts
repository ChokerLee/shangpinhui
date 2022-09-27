import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
// 自动import.config
import AutoImport from './config/autoImport.config'
// components.config
import Components from './config/components.config'
// icon.config
import Icons from './config/icon.config'
// inspect 检查 Vite 插件的中间状态.
// import Inspect from 'vite-plugin-inspect'
// plugins:[...,Inspect()]

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vueJsx(), AutoImport, Components, Icons],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    host: 'localhost',
    https: false, // 是否启用https
    cors: true, // 未开发服务器配置 CORS , 默认启用并允许任何源
    open: true, // 服务启动时自动在浏览器中打开应用
    // port: 3000,
    strictPort: false, // 设为 true 时端口被占用则直接退出，不会尝试其他可用的端口
    force: true, // 是否强制依赖预构建
    hmr: true, // 禁用或配置 HMR连接 （热更新是否开启）,
    // 代理跨域
    proxy: {
      // 选项写法
      '/api': {
        target: 'http://gmall-h5-api.atguigu.cn',
        changeOrigin: true,
      },
    },
  },
  // 项目打包后，代码都是经过压缩加密的，如果运行报错时，输出的错误信息无法准确得知是哪里的代码报错
  // 有了map就可以像未加密的代码一样，准确的输出是哪一行报错
  // 所以一般不要配置，测试服可能有用，上线就不要配置了
  // build: {
  //   sourcemap: true, // 输出.map文件
  //   rollupOptions: {
  //     // 确保外部化处理那些你不想打包进库的依赖
  //     external: ['vue'],
  //   },
  // },
})
