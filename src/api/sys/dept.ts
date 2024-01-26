import { defHttp } from '/@/utils/http/axios'
import { BasicResult } from './model/menuModel'

enum Api {
  GetDeptList = '/department/list',
  AddDept = '/department/add',
  DeleteDept = '/department/delete',
  UpdateDept = '/department/update',
  GetDeptById = '/department/get',
}

/**
 * @description: 获取部门列表
 */

export const getDeptList = (params) => {
  return defHttp.get<BasicResult>({ url: Api.GetDeptList, params })
}

/**
 * @description: 新增部门
 */
export const addDept = (params) => {
  return defHttp.post<BasicResult>({ url: Api.AddDept, params })
}
/**
 * @description: 删除部门
 */
export const deleteDept = (id) => {
  return defHttp.delete<BasicResult>({ url: `${Api.DeleteDept}/${id}` })
}
/**
 * @description: 修改部门信息
 */
export const updateDept = (params) => {
  return defHttp.put<BasicResult>({ url: Api.UpdateDept, params })
}
/**
 * @description: 部门详情
 */
export const getDeptById = (id) => {
  return defHttp.get<BasicResult>({ url: `${Api.GetDeptById}/${id}` })
}
