<template>
  <!--商品分类三级列表-->
  <type-nav v-model:showNav="showNav"></type-nav>
  <!--list-content-->
  <div class="main">
    <div class="py-container">
      <!--bread-->
      <div class="bread">
        <ul class="fl sui-breadcrumb">
          <li>
            <a href="#">全部结果</a>
          </li>
        </ul>
        <ul class="fl sui-tag">
          <!-- 分类的面包屑-->
          <li class="with-x" v-if="searchParams.categoryName">
            {{ searchParams.categoryName }}<i @click="removeCategoryName">×</i>
          </li>
          <!-- 品牌的面包屑-->
          <li class="with-x" v-if="searchParams.trademark">
            {{ searchParams.trademark.split(':')[1] }}
            <i @click="removeTradeMark">×</i>
          </li>
          <!-- 关键字的面包屑-->
          <li class="with-x" v-if="searchParams.keyword">
            {{ searchParams.keyword }}
            <i @click="removeKeyWord">×</i>
          </li>
          <!-- 平台的售卖的属性值展示-->
          <li class="with-x" v-for="(attrValue, index) in searchParams.props" :key="index">
            {{ attrValue.split(':')[1] }}
            <i @click="removeAttr(index)">×</i>
          </li>
        </ul>
      </div>
      <!--selector-->
      <search-selector @trademarkInfo="trademarkInfo" @attrInfo="attrInfo"></search-selector>
      <!--details-->
      <div class="details clearfix">
        <div class="sui-navbar">
          <div class="navbar-inner filter">
            <!-- 排序的结构-->
            <ul class="sui-nav">
              <li :class="{ active: zhOrder }">
                <a @click="changeOrderSort('1')"
                  >综合
                  <IconPark v-show="zhOrder" :icon="arrow" />
                </a>
              </li>
              <li :class="{ active: priceOrder }">
                <a @click="changeOrderSort('2')"
                  >价格
                  <IconPark v-show="priceOrder" :icon="arrow" />
                </a>
              </li>
            </ul>
          </div>
        </div>
        <!-- 销售产品列表-->
        <div class="goods-list">
          <ul class="yui3-g">
            <li class="yui3-u-1-5" v-for="good in goodsList" :key="good.id">
              <div class="list-wrap">
                <div class="p-img">
                  <router-link :to="{ path: `/detail/${good.id}` }"><img :src="good.defaultImg" /></router-link>
                </div>
                <div class="price">
                  <strong>
                    <em>¥</em>&nbsp;
                    <i>{{ good.price }}</i>
                  </strong>
                </div>
                <div class="attr">
                  <a
                    target="_blank"
                    href="item.html"
                    title="促销信息，下单即赠送三个月CIBN视频会员卡！【小米电视新品4A 58 火爆预约中】"
                    >{{ good.title }}</a
                  >
                </div>
                <div class="commit">
                  <i class="command">已有<span>2000</span>人评价</i>
                </div>
                <div class="operate">
                  <a href="success-cart.html" target="_blank" class="sui-btn btn-bordered btn-danger">加入购物车</a>
                  <a href="javascript:void(0);" class="sui-btn btn-bordered">收藏</a>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <!-- 分页器-->
        <Pagination
          @pageSearch="pageSearch"
          :pageNo="searchParams.pageNo || 1"
          :pageSize="searchParams.pageSize || 3"
          :total="searchList.total || 1"
          :continues="5"
        ></Pagination>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  // components
  import SearchSelector from '@/pages/Search/SearchSelector/SearchSelector.vue'
  import IconPark from '@/components/Common/IconPark.vue'
  // vue&&vue-router
  import { ref, reactive, watchEffect } from 'vue'
  import { useRoute, useRouter } from 'vue-router'
  // pinia
  import { storeToRefs } from 'pinia'
  import { useSearchStore } from '@/stores/search'
  // ts-type
  import type { searchList as searchList_type, search_type } from '@/stores/type/search_type'
  // hook
  import usePaixu from './hook/usePaixu'
  import useBread from './hook/useBread'

  // router路由
  const route = useRoute()
  const router = useRouter()
  // 菜单栏显示
  const showNav = ref<boolean>(false)

  // 控制是否请求接口
  const is_go = ref<boolean>(true)
  // 搜索数据参数（关键！！！）
  const searchParams = reactive<search_type>({
    // 一级分类id
    category1Id: '',
    // 二级分类id
    category2Id: '',
    // 三级分类id
    category3Id: '',
    // 分类名字
    categoryName: '',
    // 关键字
    keyword: '',
    // 排序
    order: '1:desc',
    // 分页器：代表当前是第几页
    pageNo: 1,
    // 代表每一页展示的数据个数
    pageSize: 3,
    // 平台售卖属性操作带的参数
    props: [],
    // 品牌
    trademark: '',
  })

  // 重置页面页数page
  const resetPageNo = () => {
    searchParams.pageNo = 1
  }
  // 分页请求
  const pageSearch = (pagenum: number = 1) => {
    searchParams.pageNo = pagenum
  }

  //-------------------------------------------------------------------------------------------------------------------------------
  /**hook */
  // useSearchStore*商品列表数据
  const searchStore = useSearchStore()
  let { searchList, goodsList } = storeToRefs(searchStore)

  // usePaixu*排序
  let { zhOrder, priceOrder, arrow, changeOrderSort } = usePaixu(searchParams)

  // useBread*面包屑
  let { removeCategoryName, removeKeyWord, removeTradeMark, removeAttr } = useBread(searchParams, route, router, is_go)

  /** 品牌&&品牌属性*父子通信 */
  const pinpaiAttrEffect = () => {
    //获取品牌信息
    const trademarkInfo = (trademark: searchList_type.TrademarkList) => {
      searchParams.trademark = `${trademark.tmId}:${trademark.tmName}`
      resetPageNo()
    }

    //获取品牌属性信息
    const attrInfo = (attr: searchList_type.AttrsList, attrValue: string) => {
      // ['属性ID:属性值:属性名']
      const props = `${attr.attrId}:${attrValue}:${attr.attrName}`
      // 数组去重
      if (searchParams.props?.indexOf(props) == -1) {
        searchParams.props?.push(props)
      }
      resetPageNo()
    }
    return { trademarkInfo, attrInfo }
  }
  let { trademarkInfo, attrInfo } = pinpaiAttrEffect()

  // 请求数据方法（最重要的一环！！！）
  const goSearchEffect = async () => {
    // 处理数据
    searchParams.category1Id = undefined
    searchParams.category2Id = undefined
    searchParams.category3Id = undefined
    // 组装
    Object.assign(searchParams, route.query, route.params)
    // 请求
    await searchStore.getSearchInfo(searchParams)
  }

  watchEffect(async () => {
    // 此判断可以防止路由跳转的时候再次请求，因为goSearchEffect依赖了路由
    if (route.name == 'search' && is_go.value) {
      // 请求数据
      await goSearchEffect()
    }
  })
</script>

<style lang="scss" scoped>
  .main {
    margin: 10px 0;
    .py-container {
      width: 1200px;
      margin: 0 auto;
      .bread {
        margin-bottom: 5px;
        overflow: hidden;
        .sui-breadcrumb {
          padding: 3px 15px;
          margin: 0;
          font-weight: 400;
          border-radius: 3px;
          float: left;
          li {
            display: inline-block;
            line-height: 18px;
            a {
              color: #666;
              text-decoration: none;
              &:hover {
                color: #4cb9fc;
              }
            }
          }
        }
        .sui-tag {
          margin-top: -5px;
          list-style: none;
          font-size: 0;
          line-height: 0;
          padding: 5px 0 0;
          margin-bottom: 18px;
          float: left;
          .with-x {
            font-size: 12px;
            margin: 0 5px 5px 0;
            display: inline-block;
            overflow: hidden;
            color: #000;
            background: #f7f7f7;
            padding: 0 7px;
            height: 20px;
            line-height: 20px;
            border: 1px solid #dedede;
            white-space: nowrap;
            transition: color 400ms;
            cursor: pointer;
            i {
              margin-left: 10px;
              cursor: pointer;
              font: 400 14px tahoma;
              display: inline-block;
              height: 100%;
              vertical-align: middle;
            }
            &:hover {
              color: #28a3ef;
            }
          }
        }
      }
      .details {
        margin-bottom: 5px;
        .sui-navbar {
          overflow: visible;
          margin-bottom: 0;
          .filter {
            min-height: 40px;
            padding-right: 20px;
            background: #fbfbfb;
            border: 1px solid #e2e2e2;
            padding-left: 0;
            border-radius: 0;
            box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);
            .sui-nav {
              position: relative;
              left: 0;
              display: block;
              float: left;
              margin: 0 10px 0 0;
              li {
                float: left;
                line-height: 18px;
                a {
                  display: block;
                  cursor: pointer;
                  padding: 11px 15px;
                  color: #777;
                  text-decoration: none;
                }
                &.active {
                  a {
                    background: #e1251b;
                    color: #fff;
                  }
                }
              }
            }
          }
        }
        .goods-list {
          margin: 20px 0;
          ul {
            display: flex;
            flex-wrap: wrap;
            li {
              height: 100%;
              width: 20%;
              margin-top: 10px;
              line-height: 28px;
              .list-wrap {
                .p-img {
                  padding-left: 15px;
                  width: 215px;
                  height: 255px;
                  a {
                    color: #666;
                    img {
                      max-width: 100%;
                      height: auto;
                      vertical-align: middle;
                    }
                  }
                }
                .price {
                  padding-left: 15px;
                  font-size: 18px;
                  color: #c81623;
                  strong {
                    font-weight: 700;
                    i {
                      margin-left: -5px;
                    }
                  }
                }
                .attr {
                  padding-left: 15px;
                  width: 85%;
                  overflow: hidden;
                  margin-bottom: 8px;
                  min-height: 38px;
                  cursor: pointer;
                  line-height: 1.8;
                  display: -webkit-box;
                  -webkit-box-orient: vertical;
                  -webkit-line-clamp: 2;
                  a {
                    color: #333;
                    text-decoration: none;
                  }
                }
                .commit {
                  padding-left: 15px;
                  height: 22px;
                  font-size: 13px;
                  color: #a7a7a7;
                  span {
                    font-weight: 700;
                    color: #646fb0;
                  }
                }
                .operate {
                  padding: 12px 15px;
                  .sui-btn {
                    display: inline-block;
                    padding: 2px 14px;
                    box-sizing: border-box;
                    margin-bottom: 0;
                    font-size: 12px;
                    line-height: 18px;
                    text-align: center;
                    vertical-align: middle;
                    cursor: pointer;
                    border-radius: 0;
                    background-color: transparent;
                    margin-right: 15px;
                  }
                  .btn-bordered {
                    min-width: 85px;
                    background-color: transparent;
                    border: 1px solid #8c8c8c;
                    color: #8c8c8c;
                    &:hover {
                      border: 1px solid #666;
                      color: #fff !important;
                      background-color: #666;
                      text-decoration: none;
                    }
                  }
                  .btn-danger {
                    border: 1px solid #e1251b;
                    color: #e1251b;
                    &:hover {
                      border: 1px solid #e1251b;
                      background-color: #e1251b;
                      color: white !important;
                      text-decoration: none;
                    }
                  }
                }
              }
            }
          }
        }
        .page {
          width: 733px;
          height: 66px;
          overflow: hidden;
          float: right;
          .sui-pagination {
            margin: 18px 0;
            ul {
              margin-left: 0;
              margin-bottom: 0;
              vertical-align: middle;
              width: 490px;
              float: left;
              li {
                line-height: 18px;
                display: inline-block;
                a {
                  position: relative;
                  float: left;
                  line-height: 18px;
                  text-decoration: none;
                  background-color: #fff;
                  border: 1px solid #e0e9ee;
                  margin-left: -1px;
                  font-size: 14px;
                  padding: 9px 18px;
                  color: #333;
                }
                &.active {
                  a {
                    background-color: #fff;
                    color: #e1251b;
                    border-color: #fff;
                    cursor: default;
                  }
                }
                &.prev {
                  a {
                    background-color: #fafafa;
                  }
                }
                &.disabled {
                  a {
                    color: #999;
                    cursor: default;
                  }
                }
                &.dotted {
                  span {
                    margin-left: -1px;
                    position: relative;
                    float: left;
                    line-height: 18px;
                    text-decoration: none;
                    background-color: #fff;
                    font-size: 14px;
                    border: 0;
                    padding: 9px 18px;
                    color: #333;
                  }
                }
                &.next {
                  a {
                    background-color: #fafafa;
                  }
                }
              }
            }
            div {
              color: #333;
              font-size: 14px;
              float: right;
              width: 241px;
            }
          }
        }
      }
    }
  }
</style>
