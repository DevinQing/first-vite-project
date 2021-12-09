import request from '../../utils/request'

/**
 * 用户登录
 */

export const userLogin = (data) => {
  return request.post('/user/login', data, { mock: true })
}
