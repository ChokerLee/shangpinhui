import type { RouteRecordRaw } from 'vue-router'
// 路由配置信息
export const routes: Array<RouteRecordRaw> = [
  {
    path: '/:pathMatch(.*)*',
    component: () => import('@/pages/NotFound/index.vue'),
    meta: { showFooter: true, activeNav: false },
  },
  {
    path: '/',
    redirect: '/home',
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('@/pages/Home/index.vue'),
    meta: { showFooter: true, activeNav: false },
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/pages/Login/index.vue'),
    meta: { showFooter: false, activeNav: false },
  },
  {
    path: '/register',
    component: () => import('@/pages/Register/index.vue'),
    meta: { showFooter: false, activeNav: false },
  },
  {
    path: '/search/:keyword?',
    name: 'search',
    component: () => import('@/pages/Search2/index.vue'),
    meta: { showFooter: true, activeNav: true },
  },
  {
    path: '/detail/:skuid',
    name: 'detail',
    component: () => import('@/pages/Detail/index.vue'),
    meta: { showFooter: true, activeNav: true },
  },
  {
    path: '/addcartsuccess',
    name: 'addcartsuccess',
    component: () => import('@/pages/AddCartSuccess/index.vue'),
    meta: { showFooter: true, activeNav: false },
  },
  {
    path: '/shopcart',
    component: () => import('@/pages/ShopCart/index.vue'),
    meta: { showFooter: true, activeNav: false },
  },
  {
    path: '/trade',
    component: () => import('@/pages/Trade/index.vue'),
    meta: { showFooter: true, activeNav: false },
    // 路由独享守卫
    beforeEnter: (to, from) => {
      if (from.path !== '/shopcart' && from.path !== '/') {
        return false
      }
    },
  },
  {
    path: '/pay',
    component: () => import('@/pages/Pay/index.vue'),
    meta: { showFooter: true, activeNav: false },
    beforeEnter: (to, from) => {
      if (from.path !== '/trade' && from.path !== '/') {
        return false
      }
    },
  },
  {
    path: '/paysuccess',
    component: () => import('@/pages/PaySuccess/index.vue'),
    meta: { showFooter: true, activeNav: false },
  },
  {
    path: '/center',
    redirect: '/center/myorder',
    component: () => import('@/pages/Center/index.vue'),
    meta: { showFooter: true, activeNav: false },
    // 二级路由
    children: [
      {
        // 二级路由不用写反斜杠开头，非要写反斜杠就要把路由写全
        path: 'myorder',
        component: () => import('@/pages/Center/myOrder/index.vue'),
      },
      {
        path: 'grouporder',
        component: () => import('@/pages/Center/groupOrder/index.vue'),
      },
    ],
  },
]
