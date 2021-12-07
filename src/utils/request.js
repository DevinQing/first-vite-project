/**
 * axios 二次封装
 */
import axios from 'axios'
import config from './../config'
import { ElMessage } from 'element-plus'
import router from '../router'

const TOKEN_INVALID = 'Token认证失败，请重新登陆'
const NETWORK_ERROR = '网络错误，请稍后重试'
// 创建 axios 实例对象，添加全局配置
const service = axios.create({
  // 请求的 baseURL 地址，不用每次都请求
  baseURL: config.baseApi,
  timeout: 8000
})

// 请求拦截
service.interceptors.request.use((req) => {
  // TO-DO
  const headers = req.headers
  // 判断请求权限的
  if (!headers.Authorization) {
    headers.Authorization = 'Bear Booker'
  }
  return req
})

// 响应拦截
service.interceptors.response.use((res) => {
  //   debugger
  // 暂时觉得这一步其实没必要
  //   const { code, data, msg } = res.data
  if (code === 200) {
    return data
  } else if (code === 400) {
    ElMessage.error(TOKEN_INVALID)
    setTimeout(() => {
      router.push('/login')
    }, 15000)
    return Promise.reject(TOKEN_INVALID)
  } else {
    ElMessage.error(msg || NETWORK_ERROR)
    return Promise.reject(msg || NETWORK_ERROR)
    // return Promise.resolve(data)
  }
})

/**
 * 请求核心函数
 */

function request(options) {
  options.method = options.method || 'get'
  if (options.method.toLowerCase() === 'get') {
    // 不用去区分 'data' 还是 'params'
    options.params = options.data
  }

  if (config.env === 'prod') {
    // 以防万一 防止线上请求到 mock 地址
    service.defaults.baseURL = config.baseApi
  } else {
    service.defaults.baseURL = config.mock ? config.mockApi : config.baseApi
  }
  // 就是对前面的参数做了封装
  return service(options)
}
// 封装一下四个请求方法
;['get', 'post', 'delete', 'patch'].forEach((item) => {
  request[item] = (url, data, options) => {
    return request({
      url,
      data,
      method: item,
      ...options
    })
  }
})
export default request
