<template>
  <div class="spec-preview">
    <img :src="imgObj.imgUrl" />
    <div class="event" @mousemove="handler"></div>
    <div class="big">
      <img :src="imgObj.imgUrl" ref="big_img" />
    </div>
    <!--遮罩层蒙版-->
    <div class="mask" ref="mask"></div>
  </div>
</template>

<script lang="ts" setup>
  import type { detail_type } from '@/stores/type/detail_type'
  import { bus_inject } from '@/utils/inject'
  const $Bus = inject(bus_inject)
  // props
  type Props = {
    skuInfo: detail_type.SkuInfo
    skuImageList: detail_type.SkuImageList[]
  }
  const props = defineProps<Props>()
  const mask = ref()
  const big_img = ref()

  const imgIndex = ref<number>(0)

  const imgObj = computed(() => {
    return props.skuImageList[imgIndex.value] || { imgUrl: props.skuInfo.skuDefaultImg }
  })

  const activeSlideChange = (index: any = 0) => {
    imgIndex.value = index
  }

  const handler = (event: MouseEvent) => {
    let mask_element = mask.value as HTMLElement
    let left = event.offsetX - mask_element.offsetWidth / 2
    let top = event.offsetY - mask_element.offsetHeight / 2
    // 约束范围
    // left
    if (left <= 0) left = 0
    if (left >= mask_element.offsetWidth) left = mask_element.offsetWidth
    // top
    if (top <= 0) top = 0
    if (top >= mask_element.offsetHeight) top = mask_element.offsetHeight

    // 修改元素的let|top属性值
    mask_element.style.left = left + 'px'
    mask_element.style.top = top + 'px'

    const big_Img_Element = big_img.value as HTMLElement
    big_Img_Element.style.left = -2 * left + 'px'
    big_Img_Element.style.top = -2 * top + 'px'
  }

  //兄弟组件通信 mitt
  // image联动
  // const instance = getCurrentInstance()
  // instance?.proxy?.$Bus.on('activeSlideChange', activeSlideChange)
  $Bus?.on('activeSlideChange', activeSlideChange)
  onUnmounted(() => {
    $Bus?.off('activeSlideChange', activeSlideChange)
    // instance?.proxy?.$Bus.off('activeSlideChange', activeSlideChange)
  })
</script>

<style lang="scss" scoped>
  .spec-preview {
    position: relative;
    width: 400px;
    height: 400px;
    border: 1px solid #ccc;

    img {
      width: 100%;
      height: 100%;
    }

    .event {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      z-index: 998;
    }

    .mask {
      width: 50%;
      height: 50%;
      background-color: rgba(0, 255, 0, 0.3);
      position: absolute;
      left: 0;
      top: 0;
      display: none;
    }

    .big {
      width: 100%;
      height: 100%;
      position: absolute;
      top: -1px;
      left: 100%;
      border: 1px solid #aaa;
      overflow: hidden;
      z-index: 998;
      display: none;
      background: white;

      img {
        width: 200%;
        max-width: 200%;
        height: 200%;
        position: absolute;
        left: 0;
        top: 0;
      }
    }

    .event:hover ~ .mask,
    .event:hover ~ .big {
      display: block;
    }
  }
</style>
