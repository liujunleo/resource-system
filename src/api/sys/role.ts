import { defHttp } from '/@/utils/http/axios'
import { BasicResult } from './model/menuModel'

enum Api {
  GetRoleList = '/role/list',
  AddRole = '/role/add',
  DeleteRole = '/role/delete',
  UpdateRole = '/role/update',
  GetRoleById = '/role/get',
}

/**
 * @description: 获取角色列表
 */

export const getRoleList = (params) => {
  const param = { ...params, pageSize: 999, page: 1 }
  return defHttp.get<BasicResult>({ url: Api.GetRoleList, params: param })
}

/**
 * @description: 新增角色
 */
export const addRole = (params) => {
  return defHttp.post<BasicResult>({ url: Api.AddRole, params })
}
/**
 * @description: 删除角色
 */
export const deleteRole = (id) => {
  return defHttp.delete<BasicResult>({ url: `${Api.DeleteRole}/${id}` })
}
/**
 * @description: 修改角色信息
 */
export const updateRole = (params) => {
  return defHttp.put<BasicResult>({ url: Api.UpdateRole, params })
}
/**
 * @description: 角色详情
 */
export const getRoleById = (id) => {
  return defHttp.get<BasicResult>({ url: `${Api.GetRoleById}/${id}` })
}
