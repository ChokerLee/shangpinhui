import { defineStore } from 'pinia'
import { reqGetGoodsInfo, reqAddOrUpdateShopCart } from '@/api'
import type { detail_type } from './type/detail_type'
//* 封装游客身分模块uuid--->生成一个随机的哈希字符串
import { getUUID } from '@/utils/uuid_tooken'

export const useDetailStore = defineStore({
  id: 'detail',
  state: () => {
    return {
      goodInfo: <detail_type.RootObject>{},
      uuid_token: getUUID(),
    }
  },
  getters: {
    //* 路径导航简化的数据
    categoryView(state) {
      return state.goodInfo.categoryView || {}
    },
    //* 简化产品信息的数据
    skuInfo(state) {
      return state.goodInfo.skuInfo || {}
    },
    //* 产品售卖属性的简化
    spuSaleAttrList(state) {
      return state.goodInfo.spuSaleAttrList || []
    },
  },
  actions: {
    async getGoodsInfo(skuid: number) {
      let result = await reqGetGoodsInfo(skuid)
      if (result.code === 200) {
        this.goodInfo = result.data
      }
    },
    //* 将产品添加到购物车中
    async addOrUpdateShopCart(skuId: number, skuNum: number) {
      // 加入购物车返回的结果
      // 加入购物车后（发请求），前台将参数带给服务器
      // 服务器写入数据成功，并没有返回其他的数据，只是返回了code,200则为成功
      // 因为服务器没有返回其他的数据，因此这里不用三连环存储数据
      let result = await reqAddOrUpdateShopCart(skuId, skuNum)
      // 当前函数返回的是一个promise结果
      if (result.code == 200) {
        return 'ok'
      } else {
        //加入购物车失败
        return Promise.reject(new Error('faile'))
      }
    },
  },
})
