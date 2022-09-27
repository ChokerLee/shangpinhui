export declare module myOrder_type {
  export interface OrderDetailList {
    id: number
    orderId: number
    skuId: number
    skuName: string
    imgUrl: string
    orderPrice: number
    skuNum: number
    createTime: string
    sourceType: string
    sourceId: number
    splitTotalAmount: number
    splitActivityAmount: number
    splitCouponAmount: number
    refundStatus: string
    refundStatusString: string
    hasStock?: any
    activityRule?: any
    couponInfoList?: any
  }

  export interface Record {
    id: number
    consignee: string
    consigneeTel: string
    totalAmount: number
    orderStatus: string
    userId: number
    paymentWay: string
    deliveryAddress: string
    orderComment: string
    outTradeNo: string
    tradeBody: string
    createTime: string
    operateTime?: any
    expireTime: string
    processStatus: string
    trackingNo?: any
    parentOrderId?: any
    imgUrl?: any
    provinceId?: any
    activityReduceAmount?: any
    couponAmount?: any
    originalTotalAmount?: any
    feightFee?: any
    feightFeeReduce?: any
    refundableTime?: any
    orderDetailList: OrderDetailList[]
    orderDetailVoList?: any
    orderStatusName: string
    wareId?: any
    couponInfo?: any
  }

  export interface RootObject {
    records: Record[]
    total: number
    size: number
    current: number
    searchCount: boolean
    pages: number
  }
}
