<template>
  <div>
    <!-- svg
      <svg width="100" height="100">
      <circle cx="50" cy="50" r="40" stroke="green" stroke-width="4" fill="yellow" />
    </svg>
    <svg width="100" height="100" viewBox="0 0 24 24">
      <path fill="red" d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" font-size="40px" />
    </svg>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="100"
      height="100"
      preserveAspectRatio="xMidYMid meet"
      viewBox="0 0 24 24"
    >
      <path
        fill="currentColor"
        d="M17 13h2v2h-5V9h7c0-1.1-.9-2-2-2h-5c-1.1 0-2 .9-2 2v6c0 1.1.9 2 2 2h5c1.1 0 2-.9 2-2v-4h-4v2zM3 13h5v2H3v2h5c1.1 0 2-.9 2-2v-2c0-1.1-.9-2-2-2H5V9h5V7H3v6z"
      />
    </svg> -->
    <!--自定义全局指令-->
    <!-- <h1 v-upper="upper">{{ upper }}</h1> -->
    <Header></Header>
    <router-view></router-view>
    <Footer v-if="route.meta.showFooter"></Footer>
  </div>
</template>

<script lang="ts" setup>
  // import Header from '@/components/Header/index.vue'
  // import Footer from '@/components/Footer/index.vue'
  import { useSearchStore } from '@/stores/search'

  // import { bus_inject } from '@/utils/inject'
  // 异步组件，全局依赖注入才会生效
  // const Header = defineAsyncComponent(() => import('@/components/Header/index.vue'))

  // const $bus = inject(bus_inject)
  // console.log($bus)

  const route = useRoute()
  const searchStore = useSearchStore()

  // const upper = 'abc'

  onMounted(() => {
    // 通知pinia发送请求，获取数据，存储于仓库中
    searchStore.getCategoryList()
  })
</script>

<style></style>
