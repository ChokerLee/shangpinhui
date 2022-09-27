import { reqAddressInfo, reqOrderInfo, updateAddressDefault } from '@/api'
import { defineStore } from 'pinia'
import type { orderInfo_type, Address } from '@/stores/type/trade_type'

export const useTradeStore = defineStore({
  id: 'trade',
  state: () => {
    return {
      addressInfo: <Address[]>[],
      orderInfo: <orderInfo_type.RootObject>{},
    }
  },
  getters: {},
  actions: {
    //* 获取用户地址信息
    async getUserAddress() {
      let result = await reqAddressInfo()
      if (result.code == 200) {
        this.addressInfo = result.data
      }
    },
    //* 获取商品清单数据
    async getOrderInfo() {
      let result = await reqOrderInfo()
      if (result.code == 200) {
        this.orderInfo = result.data
        return 'ok'
      } else {
        return Promise.reject(new Error(result.message))
      }
    },
    //* 修改默认地址
    async updateAddressDefault(id: number) {
      let result = await updateAddressDefault(id)
      if (result.code == 200) {
        this.addressInfo = result.data
      }
    },
  },
})
