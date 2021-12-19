import request from '../../utils/request'

/**
 * 获取所有用户角色
 */

export const getAllRoles = (params) => {
  return request.get('/roles/list', params, { mock: true })
}
