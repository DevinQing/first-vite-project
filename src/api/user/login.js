import request from '../../utils/request'

/**
 * 用户登录
 */

export const userLogin = (data) => {
  return request.post('/users/login', data)
}

/**
 * 用户收到待审批数
 */

export const getNoticeCount = () => {
  return request.get('/users/leave/count', {})
}

/**
 * 获取菜单
 */

export const getMenuList = () => {
  return request.get('/menu/list', {}, { mock: true })
}
