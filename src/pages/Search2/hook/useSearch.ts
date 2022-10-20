//* ts-type
import type { search_type } from '@/stores/type/search_type'
import type { Ref } from 'vue'
//* pinia
import { useHomeStore } from '@/stores/home'
// useSearchStore*商品列表数据
const homeStore = useHomeStore()

//* 搜索hook
export default function useSearch(searchParams: search_type) {
  return new SearchClass(searchParams)
}

//* 搜索类
export class SearchClass {
  // 搜索参数
  protected searchParams: search_type
  // 搜索框关键字
  public keyword: Ref<string>

  constructor(searchParams: search_type) {
    this.searchParams = searchParams
    // 引用了外部的响应式数据，所以子类直接this就可以用
    this.keyword = storeToRefs(homeStore).keyword
  }

  //* 重置页面页数page
  public resetPageNo = () => {
    this.searchParams.pageNo = 1
  }

  //* 分页请求
  public pageSearch(pagenum: number = 1) {
    this.searchParams.pageNo = pagenum
  }
}
