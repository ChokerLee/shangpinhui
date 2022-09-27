import express, { Express, Router, Request, Response } from 'express'

const router: Router = express.Router()

router.get('/home', (req, res) => {
  res.send('home页面')
})

router.get('/login', (req, res) => {
  res.send('login页面')
})

export default router
