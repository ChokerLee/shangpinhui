<template>
  <swiper
    :modules="modules"
    :slides-per-view="3"
    :slides-per-group="3"
    v-if="skuImageList.length"
    :navigation="{
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    }"
  >
    <swiper-slide v-for="(slide, index) in skuImageList" :key="slide.id">
      <img :src="slide.imgUrl" :class="{ active: currentIndex === index }" @mouseenter="onActiveSlide(index)" />
    </swiper-slide>
    <div class="swiper-button-next"></div>
    <div class="swiper-button-prev"></div>
  </swiper>
</template>

<script lang="ts" setup>
  import type { detail_type } from '@/stores/type/detail_type'
  import { Swiper, SwiperSlide } from 'swiper/vue'
  import { Navigation, Autoplay } from 'swiper'
  // 全局事件总线
  import { bus_inject } from '@/utils/inject'
  const $Bus = inject(bus_inject)
  // 使用模块
  type Props = {
    skuImageList: detail_type.SkuImageList[]
  }
  defineProps<Props>()
  const modules = [Navigation, Autoplay]
  const currentIndex = ref<number>(0)
  // const instance = getCurrentInstance()
  const onActiveSlide = (index: number) => {
    currentIndex.value = index
    // instance?.proxy?.$Bus.emit('activeSlideChange', index)
    $Bus?.emit('activeSlideChange', index)
  }
</script>

<style lang="scss" scoped>
  .swiper {
    height: 56px;
    width: 412px;
    box-sizing: border-box;
    padding: 0 12px;

    .swiper-slide {
      width: 56px;
      height: 56px;
      img {
        width: 100%;
        height: 100%;
        border: 1px solid #ccc;
        padding: 2px;
        width: 50px;
        height: 50px;
        display: block;

        &.active {
          border: 2px solid #f60;
          padding: 1px;
        }
      }
    }

    .swiper-button-next {
      left: auto;
      right: 0;
    }

    .swiper-button-prev {
      left: 0;
      right: auto;
    }

    .swiper-button-next,
    .swiper-button-prev {
      color: #f60;
      box-sizing: border-box;
      width: 12px;
      height: 56px;
      background: rgb(235, 235, 235);
      border: 1px solid rgb(204, 204, 204);
      top: 0;
      margin-top: 0;
      &::after {
        font-size: 12px;
      }
    }
  }
</style>
