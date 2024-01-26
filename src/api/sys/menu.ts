import { defHttp } from '/@/utils/http/axios'
import { BasicResult } from './model/menuModel'

enum Api {
  GetMenuList = '/menu/list',
  AddMenu = '/menu/add',
  DeleteMenu = '/menu/delete',
  UpdateMenu = '/menu/update',
  GetMenuById = '/menu/get',
  GetUserMenuList = '/user/getUserMenu',
}

/**
 * @description: 获取菜单列表
 */

export const getMenuList = (params) => {
  return defHttp.get<BasicResult>({ url: Api.GetMenuList, params })
}

/**
 * @description: 新增菜单
 */
export const addMenu = (params) => {
  return defHttp.post<BasicResult>({ url: Api.AddMenu, params })
}
/**
 * @description: 删除菜单
 */
export const deleteMenu = (id) => {
  return defHttp.delete<BasicResult>({ url: `${Api.DeleteMenu}/${id}` })
}
/**
 * @description: 修改菜单
 */
export const updateMenu = (params) => {
  return defHttp.put<BasicResult>({ url: Api.UpdateMenu, params })
}
/**
 * @description: 菜单详情
 */
export const getMenuById = (id) => {
  return defHttp.get<BasicResult>({ url: `${Api.GetMenuById}/${id}` })
}
/**
 * @description: 获取用户菜单权限列表
 */
export const getUserMenuList = () => {
  return defHttp.get<BasicResult>({ url: Api.GetUserMenuList })
}
