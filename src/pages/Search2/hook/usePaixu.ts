import type { search_type } from '@/stores/type/search_type'
import { ArrowUp, ArrowDown } from '@icon-park/vue-next'
import { SearchClass } from './useSearch'

//* 排序hook
export default function usePaixu(searchParams: search_type) {
  return new PaixuClass(searchParams)
}

//* 排序类
class PaixuClass extends SearchClass {
  constructor(searchParams: search_type) {
    super(searchParams)
  }

  //* 综合排序
  public zhOrder = computed(() => {
    return this.searchParams.order?.includes('1')
  })

  //* 价格排序
  public priceOrder = computed(() => {
    return this.searchParams.order?.includes('2')
  })

  //* 控制排序箭头显示
  public arrow = computed(() => {
    return this.searchParams.order?.includes('desc') ? ArrowDown : ArrowUp
  })

  //* 改变商品排序
  public changeOrderSort = (flag: string) => {
    // flag形参是一个标记，代表用户点的是综合(1)还是价格(2)
    let originFlag = this.searchParams.order?.split(':')[0]
    let originSort = this.searchParams.order?.split(':')[1]
    let newOrder = ''
    if (flag === originFlag) {
      // 点击相同tab
      newOrder = `${originFlag}:${originSort === 'desc' ? 'asc' : 'desc'}`
    } else {
      // 交换点击tab
      newOrder = `${flag}:${originSort === 'desc' ? 'desc' : 'asc'}`
    }
    this.searchParams.order = newOrder
  }
}
