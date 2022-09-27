import type { Component } from 'vue'
// 三级联动组件----全局组件
import TypeNav from '@/components/TypeNav/index.vue'
// 分页
import Pagination from '@/components/Pagination/index.vue'

const AllComponents = {
  TypeNav,
  Pagination,
}

// ✨如果使用的是 JS 可以删除类型校验
const components: {
  [propName: string]: Component
} = AllComponents

export default components
