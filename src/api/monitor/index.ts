import { defHttp } from '/@/utils/http/axios'
import { BasicResult } from '../model/baseModel'

enum Api {
  GetDataSourceFlow = '/statistics/listDataSourceFlow',
  GetListOrganizationDaily = '/statistics/listOrganizationDaily',
  GetDataSourceFlowDetail = '/statistics/getFlow',
  GetListOrgReturnDaily = '/statistics/listOrgReturnDaily',
}

/**
 * @description: 获取数据源流水信息列表
 */

export const getDataSourceFlow = (params) => {
  return defHttp.get<BasicResult>({ url: Api.GetDataSourceFlow, params })
}

/**
 * @description: 获取认证服务报表列表信息
 */

export const getListOrganizationDaily = (params) => {
  return defHttp.get<BasicResult>({ url: Api.GetListOrganizationDaily, params })
}

/**
 * @description: 获取数据源流水信息详情
 */

export const getDataSourceFlowDetail = (params) => {
  return defHttp.get<BasicResult>({ url: Api.GetDataSourceFlowDetail, params })
}

/**
 * @description: 获取产品调用类型详细
 */

export const getListOrgReturnDaily = (params) => {
  return defHttp.get<BasicResult>({ url: Api.GetListOrgReturnDaily, params })
}
