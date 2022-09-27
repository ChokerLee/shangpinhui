import { computed } from 'vue'
import { ArrowUp, ArrowDown } from '@icon-park/vue-next'
import type { search_type } from '@/stores/type/search_type'
// 控制排序
const usePaixu = (searchParams: search_type) => {
  // 排序active类名控制
  const zhOrder = computed(() => {
    return searchParams.order?.includes('1')
  })

  const priceOrder = computed(() => {
    return searchParams.order?.includes('2')
  })

  // 控制排序箭头显示
  const arrow = computed(() => {
    return searchParams.order?.includes('desc') ? ArrowDown : ArrowUp
  })

  // 改变商品排序
  const changeOrderSort = (flag: string) => {
    // flag形参是一个标记，代表用户点的是综合(1)还是价格(2)
    let originFlag = searchParams.order?.split(':')[0]
    let originSort = searchParams.order?.split(':')[1]
    let newOrder = ''
    if (flag === originFlag) {
      // 点击相同tab
      newOrder = `${originFlag}:${originSort === 'desc' ? 'asc' : 'desc'}`
    } else {
      // 交换点击tab
      newOrder = `${flag}:${originSort === 'desc' ? 'desc' : 'asc'}`
    }
    searchParams.order = newOrder
  }
  return { zhOrder, priceOrder, arrow, changeOrderSort }
}

export default usePaixu
