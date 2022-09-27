export declare module detail_type {
  export interface CategoryView {
    id: number
    category1Id: number
    category1Name: string
    category2Id: number
    category2Name: string
    category3Id: number
    category3Name: string
  }

  export interface SpuSaleAttrValueList {
    id: number
    spuId: number
    baseSaleAttrId: number
    saleAttrValueName: string
    saleAttrName: string
    isChecked: string
  }

  export interface SpuSaleAttrList {
    id: number
    spuId: number
    baseSaleAttrId: number
    saleAttrName: string
    spuSaleAttrValueList: SpuSaleAttrValueList[]
  }

  export interface SkuImageList {
    id: number
    skuId: number
    imgName: string
    imgUrl: string
    spuImgId: number
    isDefault: string
  }

  export interface SkuAttrValueList {
    id: number
    attrId: number
    valueId: number
    skuId: number
    attrName: string
    valueName: string
  }

  export interface SkuSaleAttrValueList {
    id: number
    skuId: number
    spuId: number
    saleAttrValueId: number
    saleAttrId: number
    saleAttrName: string
    saleAttrValueName: string
  }

  export interface SkuInfo {
    id: number
    spuId: number
    price: number
    skuName: string
    skuDesc: string
    weight: string
    tmId: number
    category3Id: number
    skuDefaultImg: string
    isSale: number
    createTime: string
    skuImageList: SkuImageList[]
    skuAttrValueList: SkuAttrValueList[]
    skuSaleAttrValueList: SkuSaleAttrValueList[]
  }

  export interface RootObject {
    valuesSkuJson: string
    price: number
    categoryView: CategoryView
    spuSaleAttrList: SpuSaleAttrList[]
    // 产品主要信息
    skuInfo: SkuInfo
  }
}
