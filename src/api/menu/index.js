import request from '../../utils/request'

/**
 * 操作菜单
 */

export const operateMenu = (data) => {
  return request.post('/menu/operate', data)
}

/**
 * 获取菜单列表
 */

export const getMenuList = (data) => {
  return request.get('/menu/list', data)
}
