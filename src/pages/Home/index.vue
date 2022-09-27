<template>
  <div>
    <!--三级联动全局组件-->
    <type-nav v-model:showNav="showNav"></type-nav>
    <ListContainer></ListContainer>
    <Recommend></Recommend>
    <Rank></Rank>
    <Like></Like>
    <Floor v-for="floor in floorList" :key="floor.id" :list="floor"></Floor>
    <Brand></Brand>
  </div>
</template>

<script lang="ts" setup>
  //引入其余的组件
  import ListContainer from '@/pages/Home/ListContainer/index.vue'
  import Recommend from '@/pages/Home/Recommend/index.vue'
  import Rank from '@/pages/Home/Rank/index.vue'
  import Like from '@/pages/Home/Like/index.vue'
  import Floor from '@/pages/Home/Floor/index.vue'
  import Brand from '@/pages/Home/Brand/index.vue'
  import { useFloorStore } from '@/stores/floor'

  const showNav = ref<boolean>(true)

  const floorStore = useFloorStore()

  let { floorList } = storeToRefs(floorStore)

  watchEffect(async () => {
    await floorStore.getFloorList()
  })
</script>

<style scoped></style>
