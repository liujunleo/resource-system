import { defHttp } from '/@/utils/http/axios'
import { BasicResult } from './model/menuModel'

enum Api {
  GetDictTypeList = '/dict/listDictType',
  AddDictType = '/dict/addDictType',
  DeleteDictType = '/dict/deleteDictType',
  UpdateDictType = '/dict/updateDictType',
  GetDictList = '/dict/listDict',
  AddDict = '/dict/addDict',
  DeleteDict = '/dict/deleteDict',
  UpdateDict = '/dict/updateDict',
}

/**
 * @description: 获取字典类型列表
 */

export const getDictTypeList = (params) => {
  return defHttp.get<BasicResult>({ url: Api.GetDictTypeList, params })
}

/**
 * @description: 新增字典类型
 */
export const addDictType = (params) => {
  return defHttp.post<BasicResult>({ url: Api.AddDictType, params })
}
/**
 * @description: 删除字典类型
 */
export const deleteDictType = (id) => {
  return defHttp.delete<BasicResult>({ url: `${Api.DeleteDictType}/${id}` })
}
/**
 * @description: 修改字典类型
 */
export const updateDictType = (params) => {
  return defHttp.put<BasicResult>({ url: Api.UpdateDictType, params })
}
/**
 * @description: 字典列表
 */
export const getDictList = (params) => {
  return defHttp.get<BasicResult>({ url: Api.GetDictList, params })
}
/**
 * @description: 新增字典
 */
export const addDict = (params) => {
  return defHttp.post<BasicResult>({ url: Api.AddDict, params })
}
/**
 * @description: 删除字典
 */
export const deleteDict = (id) => {
  return defHttp.delete<BasicResult>({ url: `${Api.DeleteDict}/${id}` })
}
/**
 * @description: 修改字典
 */
export const updateDict = (params) => {
  return defHttp.put<BasicResult>({ url: Api.UpdateDict, params })
}
