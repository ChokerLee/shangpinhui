import type { InjectionKey } from 'vue'
// API
import * as API from '@/api'
// Mit
import mitt from 'mitt'
// Mit 全局事件总线
const MIT = mitt()

export const api_inject = Symbol('api') as InjectionKey<typeof API>

export const bus_inject = Symbol('mit') as InjectionKey<typeof MIT>

const AllProvides = [
  {
    name: api_inject,
    instance: API,
  },
  {
    name: bus_inject,
    instance: MIT,
  },
]

export default AllProvides
