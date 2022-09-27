import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import IconsResolver from 'unplugin-icons/resolver'
export default Components({
  // 默认就是 'src/components'
  dirs: ['src/components'], // 配置需要默认导入的自定义组件文件夹，该文件夹下的所有组件都会自动 import
  dts: 'types/components.d.ts',
  // 配置解析器
  resolvers: [
    // ElementPlus自动导入解析器 组件导入
    ElementPlusResolver(),
    // Icon自动引入解析器
    IconsResolver({
      // 自动引入的Icon组件统一前缀，默认为 i，设置false为不需要前缀
      prefix: 'Icon',
      // 标识自定义图标集
      customCollections: ['home'],
    }),
  ],
})
