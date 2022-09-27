import { defineStore } from 'pinia'
import { reqGetCode, reqUserInfo, reqUserLogin, reqUserLogout, reqUserRegister } from '@/api/index'
import type { userInfo_type } from './type/userInfo_type'
import { setToken, getToken, removeToken } from '@/utils/token'

export const useUserStore = defineStore({
  id: 'user',
  state: () => {
    return {
      code: '',
      token: getToken(),
      userInfo: <userInfo_type>{},
    }
  },
  getters: {},
  actions: {
    //* 获取验证码
    async getCode(phone: string) {
      let result = await reqGetCode(phone)
      if (result.code == 200) {
        this.code = result.data
        return 'ok'
      } else {
        return Promise.reject(new Error('faile'))
      }
    },
    //* 用户注册
    async userRegister(user: any) {
      let result = await reqUserRegister(user)
      if (result.code == 200) {
        return 'ok'
      } else {
        return Promise.reject(new Error('faile'))
      }
    },
    //* 用户登录
    async userLogin(user: any) {
      let result = await reqUserLogin(user)
      // 服务器下发的token,是用户信息的唯一标识
      // 将来经常通过token着服务器要用户信息进行展示
      if (result.code == 200) {
        this.token = result.data.token
        // 持久化存储token
        setToken(result.data.token)
        return 'ok'
      } else {
        return Promise.reject(new Error('faile'))
      }
    },
    //* 获取用户信息
    async getUserInfo() {
      let result = await reqUserInfo()
      if (result.code == 200) {
        this.userInfo = result.data
        return 'ok'
      } else {
        return Promise.reject(new Error('faile'))
      }
    },
    //* 退出登录
    async userLogout() {
      let result = await reqUserLogout()
      if (result.code == 200) {
        //* 清除仓库数据
        this.token = ''
        this.userInfo = <userInfo_type>{}
        //* 本地存储数据清空
        removeToken()
        return 'ok'
      } else {
        return Promise.reject(new Error('faile'))
      }
    },
  },
})
