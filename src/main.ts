import { createApp } from 'vue'

import App from './App.vue'
import router from './router'
import pinia from '@/stores/store'
// import ElementPlus from 'element-plus'

// import mitt from 'mitt'

// 全局事件总线
// const Mit = mitt()

// 引入mock数据
import '@/mock/mockServer'
// 引入css
import './assets/main.css'
// 引入全局组件
// import globalComponent from '@/components/index'
// 引入全局注入
import globalProvide from '@/utils/inject'
// 引入自定义插件
import myPlugins from '@/utils/myPlugins/myPlugins'

// 定义全局组件属性
// declare module 'vue' {
//   export interface ComponentCustomProperties {
//     $Bus: typeof Mit
//     // $API: typeof API
//   }
// }

const app = createApp(App)
// 注册全局注入
// ！！！！！！要尽量靠前，在数据和路由注册之前就要注入才好，这样才能保证所有组件都能获取到
globalProvide.forEach((item) => {
  app.provide(item.name, item.instance)
})
app.use(router)
app.use(pinia)
app.use(myPlugins, { name: 'upper' })
// app.use(ElementPlus)
// app.config.globalProperties.$Bus = Mit // app.config.globalProperties.$API = API
app.mount('#app')


// 注册全局的组件
// for (const componentItme in globalComponent) {
//   app.component(componentItme, globalComponent[componentItme])
// }
