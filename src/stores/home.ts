import { defineStore } from 'pinia'

export const useHomeStore = defineStore({
  id: 'home',
  state: () => {
    return {
      keyword: '',
    }
  },
  getters: {},
  actions: {},
})
