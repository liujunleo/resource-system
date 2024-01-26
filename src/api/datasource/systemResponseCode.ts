import { defHttp } from '/@/utils/http/axios'
import { BasicResult } from '../model/baseModel'

enum Api {
  GetSystemResponseCodeList = '/systemResponseCode/list',
  AddSystemResponseCode = '/systemResponseCode/add',
  UpdateSystemResponseCode = '/systemResponseCode/update',
  DeleteSystemResponseCode = '/systemResponseCode/delete',
  GetSystemResponseCodeById = '/systemResponseCode/get',
  GetSystemResponseCodeOptions = '/option/systemResponseCode',
}

/**
 * @description: 获取平台应答码列表
 */

export const getSystemResponseCodeList = (params) => {
  return defHttp.get<BasicResult>({ url: Api.GetSystemResponseCodeList, params })
}

/**
 * @description: 新增平台应答码
 */

export const addSystemResponseCode = (params) => {
  return defHttp.post<BasicResult>({ url: Api.AddSystemResponseCode, params })
}

/**
 * @description: 修改平台应答码
 */

export const updateSystemResponseCode = (params) => {
  return defHttp.put<BasicResult>({ url: Api.UpdateSystemResponseCode, params })
}

/**
 * @description: 删除平台应答码
 */

export const deleteSystemResponseCode = (id) => {
  return defHttp.delete<BasicResult>({ url: `${Api.DeleteSystemResponseCode}/${id}` })
}
/**
 * @description: 获取平台应答码详情
 */

export const getSystemResponseCodeById = (id) => {
  return defHttp.get<BasicResult>({ url: `${Api.GetSystemResponseCodeById}/${id}` })
}
/**
 * @description: 获取平台应答码下拉选项
 */

export const getSystemResponseCodeOptions = () => {
  return defHttp.get<BasicResult>({ url: Api.GetSystemResponseCodeOptions })
}
