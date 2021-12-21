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
  return request.get('/menu/list', {})
}

/**
 * 获取用户列表
 */

export const getUserList = (params) => {
  return request.get('/users/list', params)
}

/**
 * 删除用户
 */

export const deletUsers = (params) => {
  return request.post('/users/delete', params)
}

/**
 * 增加用户或者编辑用户
 */

export const addOrEditUser = (params) => {
  return request.post('/users/operate', params)
}
