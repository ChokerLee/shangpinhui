export interface search_type {
  category1Id?: string
  category2Id?: string
  category3Id?: string
  categoryName?: string
  keyword?: string
  order?: string
  pageNo?: number
  pageSize?: number
  props?: string[]
  trademark?: string
}

export declare module searchList {
  export interface TrademarkList {
    tmId: number
    tmName: string
  }

  export interface AttrsList {
    attrId: number
    attrValueList: string[]
    attrName: string
  }

  export interface GoodsList {
    id: number
    defaultImg: string
    title: string
    price: number
    createTime?: any
    tmId?: any
    tmName?: any
    category1Id?: any
    category1Name?: any
    category2Id?: any
    category2Name?: any
    category3Id?: any
    category3Name?: any
    hotScore: number
    attrs?: any
  }

  export interface RootObject {
    trademarkList: TrademarkList[]
    attrsList: AttrsList[]
    goodsList: GoodsList[]
    total: number
    pageSize: number
    pageNo: number
    totalPages: number
  }
}
