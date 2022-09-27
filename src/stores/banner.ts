import { defineStore } from 'pinia'
import { reqGetBannerList } from '@/api'

interface bannerList {
  id: string
  imgUrl: string
}

export const useBannerStore = defineStore({
  id: 'banner',
  state: () => {
    return {
      bannerList: <bannerList[]>[],
    }
  },
  getters: {},
  actions: {
    //* 获取首页轮播图的数据
    async getBannerList() {
      let result = await reqGetBannerList()
      if (result.code === 200) {
        this.bannerList = result.data
      }
    },
  },
})
