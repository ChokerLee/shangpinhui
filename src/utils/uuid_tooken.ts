import { nanoid } from 'nanoid'

//* 要生成一个随机哈希字符串，且每次执行不能发生变化，游客身份持久存储
//* 单例模式
export const getUUID = () => {
  // 先从本地存储获取uuid（看一下本地存储有没有）
  const uuid_token = localStorage.getItem('UUIDTOKEN')
  if (uuid_token) return uuid_token
  // 生成游客临时身份
  const token = nanoid()
  // 进行本地存储
  localStorage.setItem('UUIDTOKEN', token)
  return token
}
