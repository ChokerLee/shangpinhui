import type { SvgAttributes } from 'csstype'
import Icons from 'unplugin-icons/vite'
// iconify 图标
// import IconBaseline5g from '~icons/ic/baseline-5g';
// 自定义图标
// import IconHomeJiHua from '~icons/home/jihua';
// import IconAboutKeFu from '~icons/about/kefu';
// 引入loader
const { FileSystemIconLoader } = require('unplugin-icons/loaders')
export default Icons({
  autoInstall: true,
  // 自定义图标加载
  customCollections: {
    // home图标集
    // 给svg文件设置fill="currentColor"属性，使图标的颜色具有适应性
    home: FileSystemIconLoader('src/assets', (svg: SvgAttributes) =>
      svg.replace(/^<svg /, '<svg fill="currentColor" ')
    ),
  },
})
