/**
 * 环境配置封装
 */

// 获取环境变量
const env = import.meta.env.MODE || 'prod'
// 根据项目不同的环境找到项目不同的api

const EnvConfig = {
  dev: {
    baseApi: '/',
    mockApi:
      'https://www.fastmock.site/mock/261e7558e985b2b73d68c97e918eebab/api'
  },
  test: {
    baseApi: '/',
    mockApi:
      'https://www.fastmock.site/mock/261e7558e985b2b73d68c97e918eebab/api'
  },
  prod: {
    baseApi: '',
    mockApi:
      'https://www.fastmock.site/mock/261e7558e985b2b73d68c97e918eebab/api'
  }
}

export default {
  env,
  // 表示项目后端还没有好 用 mock 方式来进行访问
  mock: true,
  namespace: 'DevinQing-MoocProject',
  ...EnvConfig[env]
}
