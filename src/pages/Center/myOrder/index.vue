<template>
  <div class="order-right">
    <div class="order-content">
      <div class="title">
        <h3>我的订单</h3>
      </div>
      <div class="chosetype">
        <table>
          <thead>
            <tr>
              <th width="29%">商品</th>
              <th width="31%">订单详情</th>
              <th width="13%">收货人</th>
              <th>金额</th>
              <th>状态</th>
              <th>操作</th>
            </tr>
          </thead>
        </table>
      </div>
      <div class="orders">
        <table class="order-item" v-for="order in orderInfo?.records" :key="order.id">
          <thead>
            <tr>
              <th colspan="5">
                <span class="ordertitle"
                  >{{ order.createTime }}　订单编号：{{ order.outTradeNo }}
                  <span class="pull-right delete"><img src="../images/delete.png" /></span
                ></span>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(cart, index) in order.orderDetailList" :key="cart.id">
              <td width="60%">
                <div class="typographic">
                  <img :src="cart.imgUrl" style="width: 82px; height: 82px" />
                  <a href="#" class="block-text">{{ cart.skuName }}</a>
                  <span>x{{ cart.skuNum }}</span>
                  <a href="#" class="service">售后申请</a>
                </div>
              </td>
              <!--合并单元格，只要index为0的，后面的循环不要-->
              <template v-if="index == 0">
                <td :rowspan="order.orderDetailList.length" width="8%" class="center">{{ order.consignee }}</td>
                <td :rowspan="order.orderDetailList.length" width="13%" class="center">
                  <ul class="unstyled">
                    <li>总金额¥{{ order.totalAmount }}</li>
                    <li>在线支付</li>
                  </ul>
                </td>
                <td :rowspan="order.orderDetailList.length" width="8%" class="center">
                  <a href="#" class="btn">{{ order.orderStatusName }} </a>
                </td>
                <td :rowspan="order.orderDetailList.length" width="13%" class="center">
                  <ul class="unstyled">
                    <li>
                      <a href="mycomment.html" target="_blank">评价|晒单</a>
                    </li>
                  </ul>
                </td>
              </template>
            </tr>
          </tbody>
        </table>
      </div>
      <Pagination2
        @pageSearch="pageSearch"
        :pageNo="searchParams.page || 1"
        :pageSize="searchParams.limit || 3"
        :total="Number(orderInfo?.total) || 1"
        :continues="5"
      ></Pagination2>
    </div>
    <!--猜你喜欢-->
    <div class="like">
      <h4 class="kt">猜你喜欢</h4>
      <ul class="like-list">
        <li class="likeItem">
          <div class="p-img">
            <img src="../images/itemlike01.png" />
          </div>
          <div class="attr">
            <em>DELL戴尔Ins 15MR-7528SS 15英寸 银色 笔记本</em>
          </div>
          <div class="price">
            <em>¥</em>
            <i>3699.00</i>
          </div>
          <div class="commit">已有6人评价</div>
        </li>
        <li class="likeItem">
          <div class="p-img">
            <img src="../images/itemlike02.png" />
          </div>
          <div class="attr">Apple苹果iPhone 6s/6s Plus 16G 64G 128G</div>
          <div class="price">
            <em>¥</em>
            <i>4388.00</i>
          </div>
          <div class="commit">已有700人评价</div>
        </li>
        <li class="likeItem">
          <div class="p-img">
            <img src="../images/itemlike03.png" />
          </div>
          <div class="attr">DELL戴尔Ins 15MR-7528SS 15英寸 银色 笔记本</div>
          <div class="price">
            <em>¥</em>
            <i>4088.00</i>
          </div>
          <div class="commit">已有700人评价</div>
        </li>
        <li class="likeItem">
          <div class="p-img">
            <img src="../images/itemlike04.png" />
          </div>
          <div class="attr">DELL戴尔Ins 15MR-7528SS 15英寸 银色 笔记本</div>
          <div class="price">
            <em>¥</em>
            <i>4088.00</i>
          </div>
          <div class="commit">已有700人评价</div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { api_inject } from '@/utils/inject'
  import type { myOrder_type } from '@/stores/type/myOrder_type'
  import Pagination2 from '@/components/Pagination/sec_index.vue'

  const API = inject(api_inject)

  // 初始化查询参数
  const searchParams = reactive({
    // 当前第几页
    page: 1,
    // 每一页展示的数据个数
    limit: 3,
  })

  // 订单信息
  const orderInfo = ref<myOrder_type.RootObject>()

  // 获取我的订单的方法
  const getOrderData = async () => {
    let result = await API?.reqMyOrderList(searchParams.page.toString(), searchParams.limit.toString())
    if (result.code == 200) {
      orderInfo.value = result.data
    }
  }

  // 分页请求
  const pageSearch = (pagenum: number = 1) => {
    searchParams.page = pagenum
  }

  watchEffect(async () => {
    try {
      await getOrderData()
    } catch (e: any) {
      alert(e.message)
    }
  })
</script>

<style lang="scss" scoped></style>
