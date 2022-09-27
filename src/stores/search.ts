import { defineStore } from 'pinia'
import { reqCategoryList, reqGetSearchInfo } from '@/api'
import type { CategoryList } from './type/categoryList_type'
import type { search_type, searchList } from '@/stores/type/search_type'

export const useSearchStore = defineStore({
  id: 'search',
  state: () => {
    return {
      //* state中数据默认初始值别瞎写，服务器返回什么数据类型就定义什么数据类型
      categoryList: <CategoryList[]>[],
      searchList: <searchList.RootObject>{},
    }
  },
  getters: {
    goodsList: (state) => {
      //* 至少返回一个数组
      return state.searchList.goodsList || []
    },
    trademarkList: (state) => {
      return state.searchList.trademarkList || []
    },
    attrsList: (state) => {
      return state.searchList.attrsList || []
    },
  },
  actions: {
    //* 获取列表数据
    async getCategoryList() {
      let result = await reqCategoryList()
      if (result.code === 200) {
        this.categoryList = result.data
        //* 数据多了一条，临时处理
        this.categoryList.pop()
      }
    },
    //* 获取搜索数据
    async getSearchInfo(params: search_type = {}) {
      let result = await reqGetSearchInfo(params)
      if (result.code === 200) {
        this.searchList = result.data
      }
    },
  },
})
