import axios from '@/libs/api.request'

export const getRouterReq = (token) => {
  console.log(token)
  return axios.request({
    url: '/getMenu',
    params: {
      token
    },
    method: 'get'
  })
}
/**
 * 获取用户权限数组,组合路由和菜单
 * @returns {never}
 * @param params
 */
export const getUserPerms = (params) => {
  return axios.request({
    url: '/user/menus',
    method: 'post'
  })
}