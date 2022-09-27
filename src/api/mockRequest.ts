// 对axios进行二次封装
import axios, { type AxiosRequestConfig } from 'axios'
// 引入进度条
import nprogress from './nprogress'

// axios.defaults.baseURL = '/mock'

// 1.利用axios对象的方法create，去创建一个axios实例
const requests = axios.create({
  // 配置对象
  baseURL: '/mock',
  // 基础路径，发送请求的时候，路径当中会出现mock
  timeout: 5000,
})

// 请求拦截器：在发送请求之前，请求拦截器可以检测到，可以在发送请求出去之前做一些事情
requests.interceptors.request.use((config: AxiosRequestConfig) => {
  // config：配置对象，对象里面有一个属性很重要，header请求头

  // 进度条开始动
  nprogress.start()
  return config
})

// 响应拦截器
requests.interceptors.response.use(
  (res) => {
    // 成功的回调函数：服务器响应数据回来以后，相应拦截器可以检测到，可以做一些事情

    // 进度条结束
    nprogress.done()
    return res.data
  },
  (error) => {
    // 响应失败的回调函数
    return Promise.reject(error)
  }
)

// 对外暴露
export default requests
