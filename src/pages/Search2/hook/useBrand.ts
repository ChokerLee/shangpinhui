import type { searchList as searchList_type, search_type } from '@/stores/type/search_type'
import { SearchClass } from './useSearch'

//* 品牌hook
export default function useBrand(searchParams: search_type) {
  return new BrandClass(searchParams)
}

//* 品牌类
class BrandClass extends SearchClass {
  constructor(searchParams: search_type) {
    super(searchParams)
  }

  //获取品牌信息
  public trademarkInfo = (trademark: searchList_type.TrademarkList) => {
    this.searchParams.trademark = `${trademark.tmId}:${trademark.tmName}`
    this.resetPageNo()
  }

  //获取品牌属性信息
  public attrInfo = (attr: searchList_type.AttrsList, attrValue: string) => {
    // ['属性ID:属性值:属性名']
    const props = `${attr.attrId}:${attrValue}:${attr.attrName}`
    // 数组去重
    if (this.searchParams.props?.indexOf(props) == -1) {
      this.searchParams.props?.push(props)
    }
    this.resetPageNo()
  }
}
