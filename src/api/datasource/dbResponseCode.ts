import { defHttp } from '/@/utils/http/axios'
import { BasicResult } from '../model/baseModel'

enum Api {
  GetDataSourceResponseCodeList = '/dataSourceResponseCode/list',
  AddDataSourceResponseCode = '/dataSourceResponseCode/add',
  UpdateDataSourceResponseCode = '/dataSourceResponseCode/update',
  DeleteDataSourceResponseCode = '/dataSourceResponseCode/delete',
  GetDataSourceResponseCodeById = '/dataSourceResponseCode/get',
}

/**
 * @description: 获取数据源应答码列表
 */

export const getDataSourceResponseCodeList = (params) => {
  return defHttp.get<BasicResult>({ url: Api.GetDataSourceResponseCodeList, params })
}

/**
 * @description: 新增数据源应答码
 */

export const addDataSourceResponseCode = (params) => {
  return defHttp.post<BasicResult>({ url: Api.AddDataSourceResponseCode, params })
}

/**
 * @description: 修改数据源应答码
 */

export const updateDataSourceResponseCode = (params) => {
  return defHttp.put<BasicResult>({ url: Api.UpdateDataSourceResponseCode, params })
}

/**
 * @description: 删除数据源应答码
 */

export const deleteDataSourceResponseCode = (id) => {
  return defHttp.delete<BasicResult>({ url: `${Api.DeleteDataSourceResponseCode}/${id}` })
}
/**
 * @description: 获取数据源应答码详情
 */

export const getDataSourceResponseCodeById = (id) => {
  return defHttp.get<BasicResult>({ url: `${Api.GetDataSourceResponseCodeById}/${id}` })
}
