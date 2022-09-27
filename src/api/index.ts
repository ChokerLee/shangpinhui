// 当前这个模块：API进行统一管理

import requests from './request'
import mockRequest from './mockRequest'
import type { search_type } from '../stores/type/search_type'

//* 三级联动接口
// /api/product/getBaseCategoryList get 无参数
// 发请求：axios发请求返回结果是Promise对象

export const reqCategoryList = () => {
  return requests({ url: '/product/getBaseCategoryList', method: 'get' })
}

//* 获取banner(Home首页轮播图接口)
export const reqGetBannerList = () => {
  return mockRequest({ url: '/banner', method: 'get' })
}

//* 获取floor数据
export const reqFloorList = () => {
  return mockRequest.get('/floor')
}

//* 获取搜索模块数据 地址：/api/list 请求方式:post
export const reqGetSearchInfo = (params: search_type) => {
  return requests({
    method: 'post',
    url: '/list',
    data: params,
  })
}

//* 获取产品具体信息的接口 URL:/api/item/{skuid} 请求方式get
export const reqGetGoodsInfo = (skuid: number) => {
  return requests({
    method: 'get',
    url: `/item/${skuid}`,
  })
}

//* 将产品添加到购物车中（获者更新够一个产品的个数）
//* /api/cart/addToCart/{skuid}/{skunum}
export const reqAddOrUpdateShopCart = (skuId: number, skuNum: number) => {
  return requests({
    method: 'post',
    url: `/cart/addToCart/${skuId}/${skuNum}`,
  })
}

//* 获取购物车列表数据的接口
//* URL:/api/cart/cartList method:get
export const reqCartList = () => {
  return requests({
    method: 'get',
    url: '/cart/cartList',
  })
}

//* 删除购物车产品的接口
//* URL:/api/cart/deleteCart/{skuId} method:DELETE
export const reqDeleteCartById = (skuId: number) => {
  return requests({
    method: 'delete',
    url: `/cart/deleteCart/${skuId}`,
  })
}

//* 修改商品选中的状态
// URL:/api/cart/checkCart/{skuId}/{isChecked} mehtod:get
export const reqUpdateCheckedById = (skuId: number, isChecked: number) => {
  return requests({
    method: 'get',
    url: `/cart/checkCart/${skuId}/${isChecked}`,
  })
}

//* 获取验证码
// URL:/api/user/passport/sendCode/{phone} get
export const reqGetCode = (phone: string) => {
  return requests({
    method: 'get',
    url: `/user/passport/sendCode/${phone}`,
  })
}

//* 注册
// URL:/api/user/passport/register post
export const reqUserRegister = (data: any) => {
  return requests({
    method: 'post',
    url: '/user/passport/register',
    data,
  })
}

//* 登录业务【token】
//URL:/api/user/passport/Login post
export const reqUserLogin = (data: any) => {
  return requests({
    method: 'post',
    url: '/user/passport/login',
    data,
  })
}

//* 获取用户信息【需要带着用户的token向服务器获取用户信息】
// URL:/api/user/passport/auth/getUserInfo get
export const reqUserInfo = () => {
  return requests({
    method: 'get',
    url: '/user/passport/auth/getUserInfo',
  })
}

//* 退出登录
// URL:/api/user/passport/logout get
export const reqUserLogout = () => {
  return requests({
    method: 'get',
    url: '/user/passport/logout',
  })
}

//* 获取用户地址信息
// URL:/api/user/userAddress/auth/findUserAddressList get
//* 没有提供添加地址的接口，用mockjs模拟数据
export const reqAddressInfo = () => {
  return mockRequest({
    method: 'get',
    url: '/address',
  })
}

//* 获取商品清单
// URL:api/order/auth/trade get
export const reqOrderInfo = () => {
  return requests({
    method: 'get',
    url: '/order/auth/trade',
  })
}

//* 修改默认地址
export const updateAddressDefault = (data: any) => {
  return mockRequest({
    method: 'post',
    url: '/updateAddressDefault',
    data,
  })
}

//* 提交订单的接口
// URL:/api/order/auth/submitOrder?tradeNo={tradeNo} post
export const reqSubmitOrder = (tradeNo: string, data: any) => {
  return requests({
    method: 'post',
    url: `/order/auth/submitOrder?tradeNo=${tradeNo}`,
    data,
  })
}

//* 获取订单支付信息
// URL:/api/payment/weixin/createNative/{orderId}
export const reqPayInfo = (orderId: string) => {
  return requests({
    method: 'get',
    url: `/payment/weixin/createNative/${orderId}`,
  })
}

//* 获取支付订单状态
// URL:/api/payment/weixin/queryPayStatus/{orderId} get
export const reqPayStatus = (orderId: number) => {
  return requests({
    method: 'get',
    url: `/payment/weixin/queryPayStatus/${orderId}`,
  })
}

//* 获取个人中心的数据
// URL:/api/order/auth/{page}/{limit} get 两个参数都是必传
export const reqMyOrderList = (page: string, limit: string) => {
  return requests({
    method: 'get',
    url: `/order/auth/${page}/${limit}`,
  })
}
