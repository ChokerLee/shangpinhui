let myPlugins: any = {}
myPlugins.install = (app: any, options: any) => {
  // options是传进来的参数

  // 可以做如下这些事情
  // 全局事件总线 app.config.globalProperties.$Bus
  // 自定义全局指令 app.directive
  // 全局组件 app.component
  // ......

  app.directive(options.name, (element: HTMLElement, params: any) => {
    element.innerHTML = params.value.toUpperCase()
  })
}

export default myPlugins
