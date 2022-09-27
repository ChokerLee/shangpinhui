import AutoImport from 'unplugin-auto-import/vite'
// import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
export default AutoImport({
  imports: [
    'vue',
    'vue-router',
    'pinia',
    // {
    //   'element-plus': [
    //     // default imports
    //     ['ElMessageBox', 'ElMessageBox'], // import { default as axios } from 'axios',
    //   ],
    // },
  ],
  //为true时在项目根目录自动创建
  dts: 'types/auto-imports.d.ts',
  resolvers: [
    // ElementPlus自动导入解析器 ,api导入
    // ElementPlusResolver(),
  ],
})
