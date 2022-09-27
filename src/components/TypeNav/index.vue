<template>
  <!-- 商品分类导航 -->
  <div class="type-nav">
    <div class="container">
      <!--事件委派|事件代理-->
      <div @mouseleave="hideListBg">
        <h2 class="all" @mouseenter="NavContorl(true)">全部商品分类</h2>
        <!--三级联动-->
        <transition name="sort">
          <div v-if="showNav" class="sort">
            <div class="all-sort-list2" @click="goSearch">
              <div
                class="item"
                v-for="(c1, index) in categoryList"
                :class="{ cur: currentIndex === index }"
                :key="c1.categoryId"
                @mouseenter="showListBg(index)"
              >
                <h3>
                  <a :data-categoryName="c1.categoryName" :data-category1Id="c1.categoryId">{{ c1.categoryName }}</a>
                </h3>
                <div class="item-list clearfix">
                  <div class="subitem" v-for="c2 in c1.categoryChild" :key="c2.categoryId">
                    <dl class="fore">
                      <dt>
                        <a :data-categoryName="c2.categoryName" :data-category2Id="c2.categoryId">
                          {{ c2.categoryName }}
                        </a>
                      </dt>
                      <dd>
                        <em v-for="c3 in c2.categoryChild" :key="c3.categoryId">
                          <a :data-categoryName="c3.categoryName" :data-category3Id="c3.categoryId">
                            {{ c3.categoryName }}
                          </a>
                        </em>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>
      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { ref } from 'vue'
  import { useSearchStore } from '@/stores/search'
  import { storeToRefs } from 'pinia'
  import { throttle, debounce } from 'lodash'
  import { useRouter, useRoute, type RouteLocation } from 'vue-router'

  //* UseHook
  const searchStore = useSearchStore()
  const router = useRouter()
  const route = useRoute()

  //* Prop && Emit
  type Props = {
    showNav: boolean
  }
  defineProps<Props>()
  const emit = defineEmits(['update:showNav'])

  //* 获取数据Data
  let { categoryList } = storeToRefs(searchStore)

  //* 控制列表List
  const listEffects = () => {
    // 定义初始index为-1,即list默认无背景颜色
    let currentIndex = ref<number>(-1)

    // 节流 显示背景颜色
    const showListBg = throttle((index: number) => {
      currentIndex.value = index
    }, 30)

    // 防抖 还原默认背景
    const hideListBg = debounce(() => {
      currentIndex.value = -1
      NavContorl(false)
    }, 50)

    //* 控制type-nav的显示与隐藏
    const NavContorl = (flag: boolean) => {
      if (route.meta.activeNav === true) {
        emit('update:showNav', flag)
      }
    }

    return { currentIndex, showListBg, hideListBg, NavContorl }
  }
  let { currentIndex, showListBg, hideListBg, NavContorl } = listEffects()

  //* 控制菜单栏，路由Route跳转
  const routerEffect = () => {
    // 进行路由跳转的方法
    const goSearch = (event: Event) => {
      // 最好的解决方案：编程式导航 + 事件委派
      // 利用事件的委派存在一些问题：1.不能确定点击的一定是a标签；2.路由传参问题【1、2、3级肺类的产品id】

      // 解决办法
      // 1.把子节点当中a标签，加上自定义属性data-categoryName，其余的子节点是没有的
      // 2.
      const Element = event.target as HTMLElement
      // 获取到当前触发这个事件的节点【h3、a、dt、dl、em】，需要带有data-categoryname这样的节点
      // 节点有一个属性dataset属性，

      let { categoryname, category1id, category2id, category3id } = Element.dataset
      // 结构属性出来，如果标签身上拥有categoryname属性，一定是a标签，注意这里是小写，浏览器自动转换的
      if (categoryname) {
        // 整理路由跳转的参数
        type query = {
          category1Id: string
          category2Id: string
          category3Id: string
          categoryName: string
        }
        const query = {} as query
        query.categoryName = categoryname
        query.categoryName = categoryname
        // 区分一级分类、二级分类、三级分类的a标签
        if (category1id) {
          query.category1Id = category1id
        } else if (category2id) {
          query.category2Id = category2id
        } else if (category3id) {
          query.category3Id = category3id
        }
        const location = {} as RouteLocation
        location.name = 'search'
        location.query = query
        // 路由跳转
        // 如果路由跳转的时候带有params参数，稍带脚传过去
        location.params = route.params
        router.push(location)
      }
    }
    return { goSearch }
  }
  let { goSearch } = routerEffect()
</script>

<style lang="scss" scoped>
  .type-nav {
    border-bottom: 2px solid #e1251b;

    .container {
      width: 1200px;
      margin: 0 auto;
      display: flex;
      position: relative;

      .all {
        width: 210px;
        height: 45px;
        background-color: #e1251b;
        line-height: 45px;
        text-align: center;
        color: #fff;
        font-size: 14px;
        font-weight: bold;
      }

      .nav {
        a {
          height: 45px;
          margin: 0 22px;
          line-height: 45px;
          font-size: 16px;
          color: #333;
        }
      }

      .sort {
        position: absolute;
        left: 0;
        top: 45px;
        width: 210px;
        height: 480px;
        background: #fafafa;
        z-index: 999;

        .all-sort-list2 {
          a {
            cursor: pointer;
          }
          .cur {
            background-color: skyblue;
          }
          .item {
            h3 {
              line-height: 30px;
              font-size: 14px;
              font-weight: 400;
              overflow: hidden;
              padding: 0 20px;
              margin: 0;

              a {
                color: #333;
              }
            }

            .item-list {
              display: none;
              position: absolute;
              width: 734px;
              min-height: 460px;
              background: #f7f7f7;
              left: 210px;
              border: 1px solid #ddd;
              top: 0;
              z-index: 9999 !important;

              .subitem {
                float: left;
                width: 650px;
                padding: 0 4px 0 8px;

                dl {
                  border-top: 1px solid #eee;
                  padding: 6px 0;
                  overflow: hidden;
                  zoom: 1;

                  &.fore {
                    border-top: 0;
                  }

                  dt {
                    float: left;
                    width: 54px;
                    line-height: 22px;
                    text-align: right;
                    padding: 3px 6px 0 0;
                    font-weight: 700;
                  }

                  dd {
                    float: left;
                    width: 415px;
                    padding: 3px 0 0;
                    overflow: hidden;

                    em {
                      float: left;
                      height: 14px;
                      line-height: 14px;
                      padding: 0 8px;
                      margin-top: 5px;
                      border-left: 1px solid #ccc;
                    }
                  }
                }
              }
            }

            &:hover {
              .item-list {
                display: block;
              }
            }
          }
        }
      }

      .sort-enter-from,
      .sort-leave-to {
        height: 0;
      }

      .sort-enter-to,
      .sort-leave-from {
        height: 461px;
      }

      .sort-enter-active {
        transition: all 0.2s linear;
        // 多余的数据隐藏，随着卡片的高度增加而增加
        overflow: hidden;
      }
      .sort-leave-active {
        transition: all 0.2s linear;
        overflow: hidden;
      }
    }
  }
</style>
