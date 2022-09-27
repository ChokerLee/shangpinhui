export declare module cartList_type {
  export interface CartInfoList {
    id: number
    userId: string
    skuId: number
    cartPrice: number
    skuNum: number
    imgUrl: string
    skuName: string
    isChecked: number
    createTime: string
    operateTime: string
    isOrdered: number
    orderTime?: any
    sourceType: string
    sourceId: number
    skuPrice: number
    couponInfoList?: any
  }

  export interface RootObject {
    cartInfoList: CartInfoList[]
    activityRuleList?: any
    createTime: string
  }
}
