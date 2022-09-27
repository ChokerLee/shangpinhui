import express, { Express, Router, Request, Response } from 'express'
import proxy from 'express-http-proxy'

// import history from 'connect-history-api-fallback'

// 代理中间件
// const { createProxyMiddleware } = require('http-proxy-middleware')

const app: Express = express()

const HOST = 'http://gmall-h5-api.atguigu.cn'

//此插件必须在使用静态资源之前使用 解决webHistory模式刷新，组件消失的问题
// app.use(history())

//专门用于指定静态资源，需要传入一个路径
app.use(express.static(__dirname + '/static/hash-history/dist'))

// 配置代理 需要配置在静态资源后面

// app.use(
//   createProxyMiddleware('/', {
//     target: HOST, // target host
//     changeOrigin: true, // needed for virtual hosted sites
//   })
// )

app.use('/', proxy(HOST))

app.listen(3000, () => {
  console.log('success server http://localhost:3000')
})
