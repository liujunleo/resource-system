import { defHttp } from '/@/utils/http/axios'
import { BasicResult } from '../model/baseModel'

enum Api {
  GetDataSourceList = '/dataSource/list',
  AddDataSource = '/dataSource/add',
  UpdateDataSource = '/dataSource/update',
  DeleteDataSource = '/dataSource/delete',
  GetDataSourceById = '/dataSource/get',
  GetDataSourceOptions = '/option/dataSource',
  CheckDataSourceCodeUnique = '/dataSource/checkCode',
  CheckDataSourceNameUnique = '/dataSource/checkName',
}

/**
 * @description: 获取数据源信息列表
 */

export const getDataSourceList = (params) => {
  return defHttp.get<BasicResult>({ url: Api.GetDataSourceList, params })
}

/**
 * @description: 新增数据源信息
 */

export const addDataSource = (params) => {
  return defHttp.post<BasicResult>({ url: Api.AddDataSource, params })
}

/**
 * @description: 修改数据源信息
 */

export const updateDataSource = (params) => {
  return defHttp.put<BasicResult>({ url: Api.UpdateDataSource, params })
}

/**
 * @description: 删除数据源信息
 */

export const deleteDataSource = (id) => {
  return defHttp.delete<BasicResult>({ url: `${Api.DeleteDataSource}/${id}` })
}
/**
 * @description: 获取数据源信息详情
 */

export const getDataSourceById = (id) => {
  return defHttp.get<BasicResult>({ url: `${Api.GetDataSourceById}/${id}` })
}
/**
 * @description: 获取数据源下拉列表
 */

export const getDataSourceOptions = () => {
  return defHttp.get<BasicResult>({ url: Api.GetDataSourceOptions })
}

/**
 * @description: 校验数据源编码唯一性
 */
export const checkDataSourceCodeUnique = (params) => {
  return defHttp.get<BasicResult>({ url: Api.CheckDataSourceCodeUnique, params })
}

/**
 * @description: 校验数据源名称唯一性
 */
export const checkDataSourceNameUnique = (params) => {
  return defHttp.get<BasicResult>({ url: Api.CheckDataSourceNameUnique, params })
}
