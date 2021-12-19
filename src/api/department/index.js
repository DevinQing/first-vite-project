import request from '@/utils/request'

/**
 * 获取部门列表
 */

export const getDeptList = (params) => {
  return request.get('/dept/list', params, { mock: true })
}
