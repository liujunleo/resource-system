import { defHttp } from '/@/utils/http/axios'
import { BasicResult } from '../model/baseModel'

enum Api {
  GetDataSourceInterfaceList = '/dataSourceInterface/list',
  AddDataSourceInterface = '/dataSourceInterface/add',
  UpdateDataSourceInterface = '/dataSourceInterface/update',
  DeleteDataSourceInterface = '/dataSourceInterface/delete',
  GetDataSourceInterfaceById = '/dataSourceInterface/get',
  GetDataSourceInterfaceOptions = '/option/dataSourceInterface',
  CheckDataSourceInterfaceCodeUnique = '/dataSourceInterface/checkCode',
  CheckDataSourceInterfaceNameUnique = '/dataSourceInterface/checkName',
}

/**
 * @description: 获取数据源接口列表
 */

export const getDataSourceInterfaceList = (params) => {
  return defHttp.get<BasicResult>({ url: Api.GetDataSourceInterfaceList, params })
}

/**
 * @description: 新增数据源接口
 */

export const addDataSourceInterface = (params) => {
  return defHttp.post<BasicResult>({ url: Api.AddDataSourceInterface, params })
}

/**
 * @description: 修改数据源接口
 */

export const updateDataSourceInterface = (params) => {
  return defHttp.put<BasicResult>({ url: Api.UpdateDataSourceInterface, params })
}

/**
 * @description: 删除数据源接口
 */

export const deleteDataSourceInterface = (id) => {
  return defHttp.delete<BasicResult>({ url: `${Api.DeleteDataSourceInterface}/${id}` })
}
/**
 * @description: 获取数据源接口详情
 */

export const getDataSourceInterfaceById = (id) => {
  return defHttp.get<BasicResult>({ url: `${Api.GetDataSourceInterfaceById}/${id}` })
}
/**
 * @description: 获取数据源接口下拉列表
 */

export const getDataSourceInterfaceOptions = (params?) => {
  return defHttp.get<BasicResult>({ url: Api.GetDataSourceInterfaceOptions, params })
}
/**
 * @description:校验数据源接口名称唯一性
 */

export const checkDataSourceInterfaceNameUnique = (params) => {
  return defHttp.get<BasicResult>({ url: Api.CheckDataSourceInterfaceNameUnique, params })
}

/**
 * @description: 校验数据源接口编码唯一性
 */
export const checkDataSourceInterfaceCodeUnique = (params) => {
  return defHttp.get<BasicResult>({ url: Api.CheckDataSourceInterfaceCodeUnique, params })
}
