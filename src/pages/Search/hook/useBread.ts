import type { search_type } from '@/stores/type/search_type'
import { useHomeStore } from '@/stores/home'
import { storeToRefs } from 'pinia'
import type { Ref } from 'vue'
import type { RouteLocationNormalized, Router } from 'vue-router'
// 关键字

const homeStore = useHomeStore()
let { keyword } = storeToRefs(homeStore)
const useBread = (searchParams: search_type, route: RouteLocationNormalized, router: Router, is_go: Ref) => {
  const resetPageNo = () => {
    searchParams.pageNo = 1
  }
  // 删除面包屑分类的名字
  const removeCategoryName = async () => {
    is_go.value = false
    searchParams.categoryName = undefined
    resetPageNo()
    // 请求数据修改 delete会与地址栏断了联系，地址栏会残余路由信息
    // delete route.query.categoryName
    // delete route.query.category1Id
    // delete route.query.category2Id
    // delete route.query.category3Id
    // var url = window.location.href //获取当前页面的url
    // if (url.indexOf('categoryName') != -1) {
    //   //判断是否存在参数
    //   url = url.replace(/(\?|#)[^'"]*/, '') //去除参数
    //   window.history.pushState({}, '0', url)
    // }
    route.query.categoryName = ''
    route.query.category1Id = ''
    route.query.category2Id = ''
    route.query.category3Id = ''
    // 请求路由地址栏也要修改:进行路由跳转
    await router.push({ name: 'search', params: route.params })
    is_go.value = true
  }

  // 删除关键字
  const removeKeyWord = async () => {
    is_go.value = false
    searchParams.keyword = undefined
    resetPageNo()
    route.params.keyword = ''
    keyword.value = ''
    // 请求路由地址栏也要修改:进行路由跳转
    // 这里一定要用name，因为只有name才会触发params的响应式,path不行
    await router.push({ name: 'search', query: route.query })
    is_go.value = true
  }

  // 删除品牌关键字
  const removeTradeMark = () => {
    searchParams.trademark = undefined
    resetPageNo()
  }

  // 删除属性关键字
  const removeAttr = (index: number) => {
    searchParams.props?.splice(index, 1)
    resetPageNo()
  }
  return { removeCategoryName, removeKeyWord, removeTradeMark, removeAttr }
}

export default useBread
