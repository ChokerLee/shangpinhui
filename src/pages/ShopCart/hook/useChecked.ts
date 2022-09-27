import { computed } from 'vue'
import type { Ref } from 'vue'
import type { cartList_type } from '@/stores/type/cartList_type'
import { useShopCartStore } from '@/stores/shopcart'
const shopCartStore = useShopCartStore()
const useChecked = (cartInfoList: Ref<cartList_type.CartInfoList[]>, getCartList: Function) => {
  // 判断底部复选框是否勾选【全部产品选中，才勾选】
  // every 就当作是 &&  some看作是 ||
  const isAllCheck = computed(() => {
    return cartInfoList.value.every((item) => item.isChecked == 1) && cartInfoList.value.length > 0
  })

  // 更新某个产品的勾选状态
  const updateChecked = async (cart: cartList_type.CartInfoList) => {
    try {
      await shopCartStore.updateCheckedById(cart.skuId, cart.isChecked ? 0 : 1)
      // 如果数据修改成功，再次获取服务器数据展示
      getCartList()
    } catch (e: any) {
      // 如果数据请求失败，则报错
      alert(e.message)
    }
  }

  // 更新所有复选框状态
  const updateAllChecked = async (e: Event) => {
    const inputElement = e.target as HTMLInputElement
    try {
      await shopCartStore.updateAllCheckedCart(inputElement.checked)
      // 如果数据修改成功，再次获取服务器数据展示
      getCartList()
    } catch (e: any) {
      alert(e.message)
    }
  }
  return { isAllCheck, updateChecked, updateAllChecked }
}

export default useChecked
