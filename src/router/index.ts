import { createRouter, createWebHistory } from 'vue-router'
import { routes } from './routes'
import pinia from '@/stores/store'
import { useUserStore } from '@/stores/user'

//* pinia
const userStore = useUserStore(pinia)

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  // 滚动行为
  scrollBehavior(to, from, savedPosition) {
    // 始终滚动到顶部
    return { top: 0 }
  },
})

// 全局守卫：前置守卫（在路由跳转之前判断 ）
router.beforeEach(async (to) => {
  //to:可以获取到你要跳转到那个路由的信息
  //from:可以获取到你从哪个路由而来的信息
  //next:放行函数 next()放行 next(path)放行到指定路由
  if (userStore.token) {
    if (to.path === '/login' || to.path === '/register') {
      return '/'
    } else {
      if (!userStore.userInfo.id) {
        // 没有用户信息
        try {
          // 获取用户信息 再 放行跳转路由
          await userStore.getUserInfo()
        } catch (e: any) {
          // token过期，获取信息失败，这个要取决于后端的设计
          // 清空token等数据
          // 跳转到登录页面
          await userStore.userLogout()
          return '/'
        }
      }
    }
  } else {
    // 没有token，即没有登录的情况
    // 黑名单，没登录，不能去这些地方，其他放行
    const blackList = ['center', 'trade', 'pay', 'paysuccess']
    let toPath = to.path
    // 未登录：不能去交易相关、不能去支付相关【pay|paysuccess】、不能去个人中心
    // 未登录的时候去了上面这些路由------跳转到登录页
    // 去的不是上面的这些路由（home|search|shopcart）---放行
    if (blackList.indexOf(toPath.split('/')[1]) !== -1) {
      // 把未登录的时候想去，而没去成的信息，存储在路由地址当中
      // 稍后在登录组件出发，登录后，想去哪就去哪
      return { path: '/login', query: { redirect: encodeURIComponent(toPath) } }
    }
  }

  // if (userStore.token) {
  //   // 用户已经登录了，还想去login，两个字：休想，停留在首页
  //   if (to.path === '/login') {
  //     next('/')
  //   } else {
  //     if (userStore.userInfo.id) {
  //       next()
  //     } else {
  //       // 没有用户信息
  //       try {
  //         // 获取用户信息 再 放行跳转路由
  //         await userStore.getUserInfo()
  //         // 成功获取用户信息，放行
  //         next()
  //       } catch (e: any) {
  //         // token过期，获取信息失败，这个要取决于后端的设计
  //         // 清空token等数据
  //         // 跳转到登录页面
  //         await userStore.userLogout()
  //         next('/')
  //       }
  //     }
  //   }
  // } else {
  //   //* 未登录还有很多情况，暂时不处理，后期再处理
  //   next()
  // }
})

export default router
