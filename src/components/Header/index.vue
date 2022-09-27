<template>
  <!-- 头部 -->
  <header class="header">
    <!-- 头部的第一行 -->
    <div class="top">
      <div class="container">
        <div class="loginList">
          <p>尚品汇欢迎您！</p>
          <p v-if="!userInfo.name">
            <span>请</span>
            <router-link to="/login">登录</router-link>
            <router-link class="register" to="/register">免费注册</router-link>
          </p>
          <!-- 登录了-->
          <p v-else>
            <a>{{ userInfo.name }}</a>
            <a class="register" @click="userLogout">退出登录</a>
          </p>
        </div>
        <div class="typeList">
          <router-link to="/center/myOrder">我的订单</router-link>
          <router-link to="/shopcart">我的购物车</router-link>
          <a href="###">我的尚品汇</a>
          <a href="###">尚品汇会员</a>
          <a href="###">企业采购</a>
          <a href="###">关注尚品汇</a>
          <a href="###">合作招商</a>
          <a href="###">商家后台</a>
        </div>
      </div>
    </div>
    <!--头部第二行 搜索区域-->
    <div class="bottom">
      <h1 class="logoArea">
        <router-link class="logo" to="/home">
          <img src="./images/logo.png" alt="" />
        </router-link>
      </h1>
      <div class="searchArea">
        <form action="###" class="searchForm">
          <input type="text" id="autocomplete" class="input-error input-xxlarge" v-model="keyword" />
          <button class="sui-btn btn-xlarge btn-danger" type="button" @click="goSearch">搜索</button>
        </form>
      </div>
    </div>
  </header>
</template>

<script lang="ts" setup>
  import { useHomeStore } from '@/stores/home'
  import { useUserStore } from '@/stores/user'

  const router = useRouter()
  const route = useRoute()
  const homeStore = useHomeStore()
  const userStore = useUserStore()

  let { keyword } = storeToRefs(homeStore)
  let { userInfo } = storeToRefs(userStore)

  // 退出登录
  const userLogout = async () => {
    // 1:需要发请求，通知服务器退出登录，清除字段token
    // 2:清除项目当中的数据【userInfo、token】
    try {
      // 请求服务器，退出登录
      await userStore.userLogout()
      // 如果退出成功，回到首页
      router.push({ name: 'home' })
    } catch (e: any) {
      alert(e.message)
    }
  }

  const goSearch = (): void => {
    router.push({
      name: 'search',
      params: {
        keyword: keyword.value || undefined,
      },
      query: route.query,
    })
  }
</script>

<style lang="scss" scoped>
  .header {
    & > .top {
      background-color: #eaeaea;
      height: 30px;
      line-height: 30px;

      .container {
        width: 1200px;
        margin: 0 auto;
        overflow: hidden;

        .loginList {
          float: left;

          p {
            float: left;
            margin-right: 10px;

            .register {
              border-left: 1px solid #b3aeae;
              padding: 0 5px;
              margin-left: 5px;
            }
            a {
              cursor: pointer;
            }
          }
        }

        .typeList {
          float: right;

          a {
            padding: 0 10px;

            & + a {
              border-left: 1px solid #b3aeae;
            }
          }
        }
      }
    }

    & > .bottom {
      width: 1200px;
      margin: 0 auto;
      overflow: hidden;

      .logoArea {
        float: left;

        .logo {
          img {
            width: 175px;
            margin: 25px 45px;
          }
        }
      }

      .searchArea {
        float: right;
        margin-top: 35px;

        .searchForm {
          overflow: hidden;

          input {
            box-sizing: border-box;
            width: 490px;
            height: 32px;
            padding: 0px 4px;
            border: 2px solid #ea4a36;
            float: left;

            &:focus {
              outline: none;
            }
          }

          button {
            height: 32px;
            width: 68px;
            background-color: #ea4a36;
            border: none;
            color: #fff;
            float: left;
            cursor: pointer;

            &:focus {
              outline: none;
            }
          }
        }
      }
    }
  }
</style>
