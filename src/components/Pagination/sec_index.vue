<template>
  <div class="pagination" @click="pageHandle">
    <!--上结构-->
    <button :data-pageNum="props.pageNo - 1" :disabled="props.pageNo == 1">上一页</button>
    <button :data-pageNum="1" :class="{ active: pageNo == 1 }" v-if="startNumAndEndNum.start > 1">1</button>
    <button disabled v-if="startNumAndEndNum.start > 2">···</button>
    <!--中间结构-->
    <button
      :data-pageNum="page"
      :class="{ active: pageNo == page }"
      v-for="(page, index) in startNumAndEndNum.activeNum"
      :key="index"
    >
      {{ page }}
    </button>
    <!--下结构-->
    <!-- 当前28  数组：26 27 28 29 30 总页数31 此时显示...-->
    <button disabled v-if="startNumAndEndNum.end < totalPage - 1">···</button>
    <button :data-pageNum="totalPage" :class="{ active: pageNo == totalPage }" v-if="startNumAndEndNum.end < totalPage">
      {{ totalPage }}
    </button>
    <button :data-pageNum="props.pageNo + 1" :disabled="props.pageNo == totalPage">下一页</button>

    <button style="margin-left: 30px">共 {{ total }} 条</button>
  </div>
</template>

<script lang="ts" setup>
  // 需要接收的参数
  type Props = {
    // 当前页码数
    pageNo: number
    // 一页展示多少个数据
    pageSize: number
    // 总数据数
    total: number
    // 连续页码数（为了对称，一般是5或7）
    continues: number
  }
  const props = defineProps<Props>()

  const emit = defineEmits(['pageSearch'])

  //分页器控制
  const pageHandle = (event: Event) => {
    const Element = event.target as HTMLElement
    let { pagenum } = Element.dataset
    if (pagenum) {
      emit('pageSearch', parseInt(pagenum))
    }
  }

  // 总共多少页
  // 总数目total/每页展示数据pagesize
  const totalPage = computed(() => {
    // 向上取整，因为有可能是91/3,有余数，余数单独一页
    return Math.ceil(props.total / props.pageSize)
  })

  // 计算出连续的页码的初始数据与结束数字[连续页码数字至少是5]
  const startNumAndEndNum = computed(() => {
    // 安排一个数据，把计算好的连续页码数赋值好，用于循环遍历
    const activeNum: number[] = []
    // 连续页码数量，数组元素个数
    let arrNum = props.continues > totalPage.value ? totalPage.value : props.continues
    let start = 0
    let end = 0
    // 根据连续数判断
    //  -----------------------------------------------------------------
    // 数据量较少的情况
    // 连续页码数字5【就是至少五页】;如果出现不正常数据【就是不够五页】
    // 不正常现象，【总页数没有连续页码多】
    if (props.continues >= totalPage.value) {
      // 总页数少于连续的页码数
      start = 1
      end = totalPage.value
    } else {
      // 正常现象，【连续页码5，但是你的页数一定是大于5的】
      // 注意假设pageNo：3是你当前所在的页码数，开始页码数和结束页码数是对称的 1 2 “3” 4 5
      start = props.pageNo - (props.continues - 1) / 2
      end = props.pageNo + (props.continues - 1) / 2
      // 两个if判断兜底，因为计算是没有限制的
      if (start < 1) {
        // 经过上面计算有可能出现start小于1的情况， -2 -1 “0” 1 2，要变成 1 2 3 4 5
        start = 1
        end = props.continues
      }
      if (end > totalPage.value) {
        // 经过上面计算有可能出现start小于总页数的情况，假设总页数为31， 29 30 “31” 32 33，要变成 27 28 29 30 31
        end = totalPage.value
        start = totalPage.value - props.continues + 1
      }
      for (let i = 0; i < arrNum; i++) {
        activeNum[i] = start + i
      }
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
