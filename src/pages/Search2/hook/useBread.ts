import type { search_type } from '@/stores/type/search_type'
import type { RouteLocationNormalized, Router } from 'vue-router'
import type { Ref } from 'vue'
import { SearchClass } from './useSearch'

//* 面包屑hook
export default function useBread(searchParams: search_type, is_go: Ref<boolean>) {
  const router = useRouter()
  const route = useRoute()
  return new BreadClass(searchParams, is_go, router, route)
}

//* 面包屑类
class BreadClass extends SearchClass {
  // 路由
  protected route: RouteLocationNormalized
  protected router: Router
  // 控制是否请求接口
  public is_go: Ref<boolean>
  // 控制是否请求接口
  constructor(searchParams: search_type, is_go: Ref<boolean>, router: Router, route: RouteLocationNormalized) {
    super(searchParams)
    this.is_go = is_go
    this.router = router
    this.route = route
  }

  //* 删除分类关键字
  public removeCategoryName = async () => {
    this.is_go.value = false
    this.searchParams.categoryName = undefined
    this.resetPageNo()
    this.route.query.categoryName = ''
    this.route.query.category1Id = ''
    this.route.query.category2Id = ''
    this.route.query.category3Id = ''
    // 请求路由地址栏也要修改:进行路由跳转
    await this.router.push({ name: 'search', params: this.route.params })
    // is_go控制了watchEffect的统一调用（因为参数和路由的依赖都会引起watchEffect的调用）
    this.is_go.value = true
  }

  //* 删除搜索框关键字
  public removeKeyWord = async () => {
    this.is_go.value = false
    this.searchParams.keyword = undefined
    this.resetPageNo()
    this.route.params.keyword = ''
    // 搜索框的搜索关键字清除
    this.keyword.value = ''
    // 请求路由地址栏也要修改:进行路由跳转
    // 这里一定要用name，因为只有name才会触发params的响应式,path不行
    await this.router.push({ name: 'search', query: this.route.query })
    this.is_go.value = true
  }

  //* 删除品牌关键字
  public removeTradeMark = () => {
    this.searchParams.trademark = undefined
    this.resetPageNo()
  }

  //* 删除属性关键字
  public removeAttr = (index: number) => {
    this.searchParams.props?.splice(index, 1)
    this.resetPageNo()
  }
}
