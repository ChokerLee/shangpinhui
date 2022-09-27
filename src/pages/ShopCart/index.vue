<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body">
        <ul class="cart-list" v-for="cart in cartInfoList" :key="cart.id">
          <li class="cart-list-con1">
            <input type="checkbox" name="chk_list" :checked="cart.isChecked == 1" @change="updateChecked(cart)" />
          </li>
          <li class="cart-list-con2">
            <img :src="cart.imgUrl" />
            <div class="item-msg">{{ cart.skuName }}</div>
          </li>
          <li class="cart-list-con4">
            <span class="price">{{ cart.skuPrice }}</span>
          </li>
          <li class="cart-list-con5">
            <a href="javascript:void(0)" class="mins" @click="skuNumHandler('reduce', cart, -1)">-</a>
            <input
              autocomplete="off"
              type="text"
              :value="cart.skuNum"
              minnum="1"
              class="itxt"
              @change="skuNumHandler('change', cart, Number(($event.target as HTMLInputElement).value))"
            />
            <a href="javascript:void(0)" class="plus" @click="skuNumHandler('add', cart, 1)">+</a>
          </li>
          <li class="cart-list-con6">
            <span class="sum">{{ cart.cartPrice * cart.skuNum }}</span>
          </li>
          <li class="cart-list-con7">
            <a href="#none" class="sindelet" @click="deleteCartById(cart)">删除</a>
            <br />
            <a href="#none">移到收藏</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <input class="chooseAll" type="checkbox" :checked="isAllCheck" @change="updateAllChecked" />
        <span>全选</span>
      </div>
      <div class="option">
        <a @click="deleteAllCheckedCart">删除选中的商品</a>
        <a href="#none">移到我的关注</a>
        <a href="#none">清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">已选择 <span>0</span>件商品</div>
        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <i class="summoney">{{ totalPrice }}</i>
        </div>
        <div class="sumbtn">
          <router-link class="sum-btn" to="/trade">结算</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import type { cartList_type } from '@/stores/type/cartList_type'
  import { debounce } from 'lodash'
  // hook
  import { useDetailStore } from '@/stores/detail'
  import { useShopCartStore } from '@/stores/shopcart'
  import useChecked from './hook/useChecked'

  // router
  const router = useRouter()

  const shopCartStore = useShopCartStore()
  const detailStore = useDetailStore()

  // cartInfoList购物车数据
  const { cartInfoList } = storeToRefs(shopCartStore)

  const totalPrice = computed(() => {
    return cartInfoList.value.reduce((sum, curr) => {
      return sum + curr.cartPrice * curr.skuNum
    }, 0)
  })

  // 获取个人购物车数据
  const getCartList = async () => {
    await shopCartStore.getCartList()
  }

  // 控制选中商品状态
  const { isAllCheck, updateChecked, updateAllChecked } = useChecked(cartInfoList, getCartList)

  // 修改某一个产品的数量
  const skuNumHandler = debounce(async (type: string, cart: cartList_type.CartInfoList, disNum: number) => {
    // type:为了区分这三个元素
    // disNum形参：+变化量（1） -变化量（-1） input最终的个数（并不是变化量）
    // cart:哪一个产品【身上有id】
    // 向服务器发送请求，修改数量
    switch (type) {
      case 'add':
        // 带给服务器变化量
        disNum = 1
        break
      case 'change':
        //用户输入进来的最终量，非法的
        if (isNaN(disNum) || disNum < 1) {
          disNum = 0
        } else {
          disNum = Math.floor(disNum) - cart.skuNum
        }
        break
      case 'reduce':
        // 判断产品的个数大于1，才可以传递给服务器-1
        // 如果出现产品的个数小于等于1，传递个服务器个数0（原封不动）
        disNum = cart.skuNum > 1 ? -1 : 0
        break
    }
    try {
      await detailStore.addOrUpdateShopCart(cart.skuId, disNum)
      // 再一次获取服务器最新的数据进行展示
      getCartList()
    } catch (e: any) {
      alert(e.message)
    }
  }, 300)

  // 删除某一个产品的操作
  const deleteCartById = async (cart: cartList_type.CartInfoList) => {
    try {
      // 如果删除成功，再次请求数据展示
      await shopCartStore.deleteCartListBySkuId(cart.skuId)
      getCartList()
    } catch (e: any) {
      alert(e.message)
    }
  }

  // 删除全部选中的产品
  // 这个回调函数没有办法收集到一些有用的数据，传不了参
  const deleteAllCheckedCart = async () => {
    try {
      await shopCartStore.deleteAllCheckedCart()
      getCartList()
    } catch (e: any) {
      alert(e.message)
    }
  }

  watchEffect(async () => {
    await getCartList()
  })
</script>

<style lang="scss" scoped>
  .cart {
    width: 1200px;
    margin: 0 auto;

    h4 {
      margin: 9px 0;
      font-size: 14px;
      line-height: 21px;
    }

    .cart-main {
      .cart-th {
        background: #f5f5f5;
        border: 1px solid #ddd;
        padding: 10px;
        overflow: hidden;

        & > div {
          float: left;
        }

        .cart-th1 {
          width: 25%;

          input {
            vertical-align: middle;
          }

          span {
            vertical-align: middle;
          }
        }

        .cart-th2 {
          width: 25%;
        }

        .cart-th3,
        .cart-th4,
        .cart-th5,
        .cart-th6 {
          width: 12.5%;
        }
      }

      .cart-body {
        margin: 15px 0;
        border: 1px solid #ddd;

        .cart-list {
          padding: 10px;
          border-bottom: 1px solid #ddd;
          overflow: hidden;

          & > li {
            float: left;
          }

          .cart-list-con1 {
            width: 15%;
          }

          .cart-list-con2 {
            width: 35%;

            img {
              width: 82px;
              height: 82px;
              float: left;
            }

            .item-msg {
              float: left;
              width: 150px;
              margin: 0 10px;
              line-height: 18px;
            }
          }

          // .cart-list-con3 {
          //   width: 20.8333%;

          //   .item-txt {
          //     text-align: center;
          //   }
          // }

          .cart-list-con4 {
            width: 10%;
          }

          .cart-list-con5 {
            width: 17%;

            .mins {
              border: 1px solid #ddd;
              border-right: 0;
              float: left;
              color: #666;
              width: 6px;
              text-align: center;
              padding: 8px;
            }

            input {
              border: 1px solid #ddd;
              width: 40px;
              height: 33px;
              float: left;
              text-align: center;
              font-size: 14px;
            }

            .plus {
              border: 1px solid #ddd;
              border-left: 0;
              float: left;
              color: #666;
              width: 6px;
              text-align: center;
              padding: 8px;
            }
          }

          .cart-list-con6 {
            width: 10%;

            .sum {
              font-size: 16px;
            }
          }

          .cart-list-con7 {
            width: 13%;

            a {
              color: #666;
            }
          }
        }
      }
    }

    .cart-tool {
      overflow: hidden;
      border: 1px solid #ddd;

      .select-all {
        padding: 10px;
        overflow: hidden;
        float: left;

        span {
          vertical-align: middle;
        }

        input {
          vertical-align: middle;
        }
      }

      .option {
        padding: 10px;
        overflow: hidden;
        float: left;

        a {
          float: left;
          padding: 0 10px;
          color: #666;
          cursor: pointer;
        }
      }

      .money-box {
        float: right;

        .chosed {
          line-height: 26px;
          float: left;
          padding: 0 10px;
        }

        .sumprice {
          width: 200px;
          line-height: 22px;
          float: left;
          padding: 0 10px;

          .summoney {
            color: #c81623;
            font-size: 16px;
          }
        }

        .sumbtn {
          float: right;

          a {
            display: block;
            position: relative;
            width: 96px;
            height: 52px;
            line-height: 52px;
            color: #fff;
            text-align: center;
            font-size: 18px;
            font-family: 'Microsoft YaHei';
            background: #e1251b;
            overflow: hidden;
          }
        }
      }
    }
  }
</style>
