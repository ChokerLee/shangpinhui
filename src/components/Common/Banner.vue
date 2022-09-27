<template>
  <swiper
    class="swiper"
    :modules="modules"
    :loop="loop || true"
    v-if="list.length"
    :a11y="a11y"
    :autoplay="autoplay"
    :controller="controller"
    :coverflowEffect="coverflowEffect"
    :cubeEffect="cubeEffect"
    :fadeEffect="fadeEffect"
    :flipEffect="flipEffect"
    :creativeEffect="creativeEffect"
    :cardsEffect="cardsEffect"
    :hashNavigation="hashNavigation"
    :history="history"
    :keyboard="keyboard"
    :lazy="lazy"
    :mousewheel="mousewheel"
    :navigation="navigation"
    :pagination="pagination"
    :parallax="parallax"
    :scrollbar="scrollbar"
    :thumbs="thumbs"
    :virtual="virtual"
    :zoom="zoom"
    :freeMode="freeMode"
    :grid="grid"
  >
    <swiper-slide v-for="(banner, index) in list" :key="index">
      <img :src="banner[imgUrl]" />
    </swiper-slide>

    <slot name="swiper-pagination"></slot>
    <slot name="swiper-navigation"></slot>
  </swiper>
</template>

<script lang="ts" setup>
  import { Swiper, SwiperSlide } from 'swiper/vue'

  import type {
    SwiperModule,
    A11yOptions,
    AutoplayOptions,
    ControllerOptions,
    CoverflowEffectOptions,
    CubeEffectOptions,
    FadeEffectOptions,
    FlipEffectOptions,
    CreativeEffectOptions,
    CardsEffectOptions,
    HashNavigationOptions,
    HistoryOptions,
    KeyboardOptions,
    LazyOptions,
    MousewheelOptions,
    NavigationOptions,
    PaginationOptions,
    ParallaxOptions,
    ScrollbarOptions,
    ThumbsOptions,
    VirtualOptions,
    ZoomOptions,
    FreeModeOptions,
    GridOptions,
  } from 'swiper/types'

  defineProps<{
    list: any[]
    imgUrl: string
    modules: SwiperModule[]
    loop?: boolean
    a11y?: A11yOptions
    autoplay?: AutoplayOptions
    controller?: ControllerOptions
    coverflowEffect?: CoverflowEffectOptions
    cubeEffect?: CubeEffectOptions
    fadeEffect?: FadeEffectOptions
    flipEffect?: FlipEffectOptions
    creativeEffect?: CreativeEffectOptions
    cardsEffect?: CardsEffectOptions
    hashNavigation?: HashNavigationOptions
    history?: HistoryOptions
    keyboard?: KeyboardOptions
    lazy?: LazyOptions
    mousewheel?: MousewheelOptions
    navigation?: NavigationOptions
    pagination?: PaginationOptions
    parallax?: ParallaxOptions
    scrollbar?: ScrollbarOptions
    thumbs?: ThumbsOptions
    virtual?: VirtualOptions
    zoom?: ZoomOptions
    freeMode?: FreeModeOptions
    grid?: GridOptions
  }>()
</script>

<style scoped>
  .swiper {
    --swiper-pagination-color: #fff;
    --swiper-navigation-color: rgba(247, 244, 244, 0.728);
    --swiper-navigation-size: 30px;
  }
  .swiper-button-prev:hover,
  .swiper-button-next:hover {
    color: #fff;
  }

  /* .swiper-pagination-bullet-active {
    background-color: #fff;
  }
  .swiper-pagination-bullet:hover {
    background-color: #fff;
  } */
</style>
