export declare module orderInfo_type {
  //* 购物车数据
  export interface DetailArrayList {
    id?: any
    orderId?: any
    skuId: number
    skuName: string
    imgUrl: string
    orderPrice: number
    skuNum: number
    createTime?: any
    sourceType: string
    sourceId: number
    splitTotalAmount?: any
    splitActivityAmount?: any
    splitCouponAmount?: any
    refundStatus: string
    refundStatusString: string
    hasStock?: any
    activityRule?: any
    couponInfoList?: any
  }

  export interface OrderDetailList {
    id?: any
    orderId?: any
    skuId: number
    skuName: string
    imgUrl: string
    orderPrice: number
    skuNum: number
    createTime?: any
    sourceType: string
    sourceId: number
    splitTotalAmount?: any
    splitActivityAmount?: any
    splitCouponAmount?: any
    refundStatus: string
    refundStatusString: string
    hasStock?: any
    activityRule?: any
    couponInfoList?: any
  }

  export interface OrderDetailVoList {
    orderDetailList: OrderDetailList[]
    activityRule?: any
  }

  export interface RootObject {
    totalAmount: number
    userAddressList: any[]
    tradeNo: string
    totalNum: number
    originalTotalAmount: number
    couponInfoList: any[]
    detailArrayList: DetailArrayList[]
    activityReduceAmount: number
    orderDetailVoList: OrderDetailVoList[]
  }
}

export interface Address {
  id: number
  userAddress: string
  userId: number
  provinceId: number
  consignee: string
  phoneNum: string
  isDefault: string
  regionId: number
  fullAddress: string
}
