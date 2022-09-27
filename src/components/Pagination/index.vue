<template>
  <div class="pagination" @click="pageHandle">
    <button :data-pageNum="props.pageNo - 1" :disabled="props.pageNo == 1">上一页</button>
    <!--上结构-->
    <button :data-pageNum="1" :class="{ active: pageNo == 1 }" v-if="startNumAndEndNum.start > 1">1</button>
    <button disabled v-if="startNumAndEndNum.start > 2">···</button>
    <!--中间结构，动态生成-->
    <button
      :data-pageNum="page"
      :class="{ active: pageNo == page }"
      v-for="(page, index) in startNumAndEndNum.activeNum"
      :key="index"
    >
      {{ page }}
    </button>
    <!--下结构-->
    <button disabled v-if="startNumAndEndNum.end < totalPage - 1">···</button>
    <button :data-pageNum="totalPage" :class="{ active: pageNo == totalPage }" v-if="startNumAndEndNum.end < totalPage">
      {{ totalPage }}
    </button>
    <button :data-pageNum="props.pageNo + 1" :disabled="props.pageNo == totalPage">下一页</button>
    <button style="margin-left: 30px">共{{ total }}条</button>
  </div>
</template>

<script lang="ts" setup>
  type Props = {
    pageNo: number
    pageSize: number
    total: number
    continues: number
  }

  const props = defineProps<Props>()

  const emit = defineEmits(['pageSearch'])

  const pageHandle = (event: Event) => {
    const Element = event.target as HTMLElement
    let { pagenum } = Element.dataset
    if (pagenum) {
      emit('pageSearch', parseInt(pagenum))
    }
  }

  // 点击分页搜索数据

  // 总共多少页
  const totalPage = computed(() => {
    //向上取整
    return Math.ceil(props.total / props.pageSize)
  })

  // 计算出连续的页码的初始数据与结束数字[连续页码数字至少是5]
  const startNumAndEndNum = computed(() => {
    const activeNum: number[] = []
    let arrNum = props.continues > totalPage.value ? totalPage.value : props.continues
    // 先定义两个变量储存起数字与结束数字
    let start = 0
    let end = 0
    // 连续页码数字5【就是至少五页】;如果出现不正常数据【就是不够五页】
    // 不正常现象，【总页数没有连续页码多】
    if (props.continues >= totalPage.value) {
      // 总页数少于连续的页码数
      start = 1
      end = totalPage.value
    } else {
      // 正常现象，【连续页码5，但是你的页数一定是大于5的】
      start = props.pageNo - (props.continues - 1) / 2
      end = props.pageNo + (props.continues - 1) / 2
      if (start < 1) {
        start = 1
        end = props.continues
      }
      if (end > totalPage.value) {
        end = totalPage.value
        start = totalPage.value - props.continues + 1
      }
    }
    for (let i = 0; i < arrNum; i++) {
      activeNum[i] = start + i
    }
    return { start, end, activeNum }
  })
</script>

<style lang="scss" scoped>
  .pagination {
    text-align: center;
    button {
      margin: 0 5px;
      background-color: #f4f4f5;
      color: #606266;
      outline: none;
      border-radius: 2px;
      padding: 0 4px;
      vertical-align: top;
      display: inline-block;
      font-size: 13px;
      min-width: 35.5px;
      height: 28px;
      line-height: 28px;
      cursor: pointer;
      box-sizing: border-box;
      text-align: center;
      border: 0;

      &[disabled] {
        color: #c0c4cc;
        cursor: not-allowed;
      }

      &.active {
        cursor: not-allowed;
        background-color: #409eff;
        color: #fff;
      }
    }
  }
</style>
