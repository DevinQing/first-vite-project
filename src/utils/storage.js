/**
 * Storage 二次封装
 */

// storage 对比 cookie
// 1. 更方便的 api用于存储 获取 和清空
// 2. 更大的空间 4M
// 3. 封装的目的是 浏览器只支持字符串或者数字的阅读，对象无法识别，所以通过封装来更方便的设置和获取
import config from '../config'

export default {
  // 思路是先拿到值 再改变值 再存回去
  setItem(key, val) {
    // 拿到自身命名空间中的值
    let storage = this.getStorage()
    storage[key] = val
    window.localStorage.setItem(config.namespace, JSON.stringify(storage))
  },
  getStorage() {
    // 通过命名空间 获取该项目存储在浏览器中的变量 防止命名污染
    return JSON.parse(window.localStorage.getItem(config.namespace) || '{}')
  },
  getItem(key) {
    return this.getStorage()[key]
  },
  clearItem(key) {
    let storage = this.getStorage()
    delete storage[key]
    window.localStorage.setItem(config.namespace, JSON.stringify(storage))
  },
  clearAll() {
    // window.localStorage.clear()
    // 应该给成 清空与该命名空间相关的所有
    window.localStorage.removeItem(config.namespace)
  }
}
