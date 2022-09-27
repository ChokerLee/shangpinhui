import { defineStore } from 'pinia'
import { reqCartList, reqDeleteCartById, reqUpdateCheckedById } from '@/api'
import type { cartList_type } from './type/cartList_type'

export const useShopCartStore = defineStore({
  id: 'shopcart',
  state: () => {
    return {
      cartInfo: <cartList_type.RootObject[]>[],
    }
  },
  getters: {
    cartList(state) {
      return state.cartInfo[0] || {}
    },
    cartInfoList(state) {
      return state.cartInfo[0]?.cartInfoList || []
    },
  },
  actions: {
    //* 获取购物车列表数据
    async getCartList() {
      let result = await reqCartList()
      if (result.code === 200) {
        this.cartInfo = result.data
      }
    },
    //* 删除购物车某一个产品
    async deleteCartListBySkuId(skuId: number) {
      let result = await reqDeleteCartById(skuId)
      if (result.code == 200) {
        return 'ok'
      } else {
        return Promise.reject(new Error('faile'))
      }
    },
    //* 删除全部勾选的产品
    deleteAllCheckedCart() {
      let PromiseAll = <Promise<string>[]>[]
      // 获取购物车中所有的产品
      this.cartInfoList.forEach((item) => {
        let result = item.isChecked == 1 && this.deleteCartListBySkuId(item.skuId)
        // 将每一次返回的promise添加到数组当中
        if (result) PromiseAll.push(result)
        // 都成功才返回成功，有一个失败即返回失败结果
      })
      return Promise.all(PromiseAll)
    },
    //* 修改购物车某一个产品的选中状态
    async updateCheckedById(skuId: number, isChecked: number) {
      let result = await reqUpdateCheckedById(skuId, isChecked)
      if (result.code == 200) {
        return 'ok'
      } else {
        return Promise.reject(new Error('faile'))
      }
    },
    //* 修改全部商品选中状态
    updateAllCheckedCart(isChecked: boolean) {
      let PromiseAll = <Promise<string>[]>[]
      // 获取购物车中所有的产品
      this.cartInfoList.forEach((item) => {
        let result = this.updateCheckedById(item.skuId, isChecked ? 1 : 0)
        // 将每一次返回的promise添加到数组当中
        if (result) PromiseAll.push(result)
        // 都成功才返回成功，有一个失败即返回失败结果
      })
      return Promise.all(PromiseAll)
    },
  },
})
