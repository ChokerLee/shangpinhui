import { defineStore } from 'pinia'
import { reqFloorList } from '@/api'
import type { floorList_type } from '@/stores/type/flootList_type'

export const useFloorStore = defineStore({
  id: 'floor',
  state: () => {
    return {
      floorList: <floorList_type[]>[],
    }
  },
  getters: {},
  actions: {
    //* 获取floor数据
    async getFloorList() {
      let result = await reqFloorList()
      if (result.code === 200) {
        this.floorList = result.data
      }
    },
  },
})
