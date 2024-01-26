import { defHttp } from '/@/utils/http/axios'
import { BasicResult } from '../model/baseModel'

enum Api {
  GetParameterList = '/parameter/list',
  AddParameter = '/parameter/add',
  UpdateParameter = '/parameter/update',
  DeleteParameter = '/parameter/delete',
  GetParameterById = '/parameter/get',
}

/**
 * @description: 获取参数信息列表
 */

export const getParameterList = (params) => {
  return defHttp.get<BasicResult>({ url: Api.GetParameterList, params })
}

/**
 * @description: 新增参数信息
 */

export const addParameter = (params) => {
  return defHttp.post<BasicResult>({ url: Api.AddParameter, params })
}

/**
 * @description: 修改参数信息
 */

export const updateParameter = (params) => {
  return defHttp.put<BasicResult>({ url: Api.UpdateParameter, params })
}

/**
 * @description: 删除参数信息
 */

export const deleteParameter = (id) => {
  return defHttp.delete<BasicResult>({ url: `${Api.DeleteParameter}/${id}` })
}
/**
 * @description: 获取参数信息详情
 */

export const getParameterById = (id) => {
  return defHttp.get<BasicResult>({ url: `${Api.GetParameterById}/${id}` })
}
