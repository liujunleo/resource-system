import { defHttp } from '/@/utils/http/axios'
import { BasicResult } from '../model/baseModel'

enum Api {
  GetApiByHour = '/index/getApiByHour',
  GetApiFailureRate = '/index/getApiFailureRate',
  GetDsApi = '/index/getDsApi',
  GetProductApi = '/index/getProductApi',
  GetSummary = '/index/getSummary',
  GetTopDs = '/index/getTopDs',
  GetTopOrg = '/index/getTopOrg',
  GetTopProduct = '/index/getTopProduct',
}

/**
 * @description: 接口调用量
 */
export const getApiByHour = (params) => {
  return defHttp.get<BasicResult>({ url: Api.GetApiByHour, params })
}

/**
 * @description: 接口故障率
 */
export const getApiFailureRate = (params) => {
  return defHttp.get<BasicResult>({ url: Api.GetApiFailureRate, params })
}

/**
 * @description: 数据源接口总数
 */
export const getDsApi = (params) => {
  return defHttp.get<BasicResult>({ url: Api.GetDsApi, params })
}

/**
 * @description: 产品接口总数
 */
export const getProductApi = (params) => {
  return defHttp.get<BasicResult>({ url: Api.GetProductApi, params })
}

/**
 * @description: 汇总数据
 */
export const getSummary = (params) => {
  return defHttp.get<BasicResult>({ url: Api.GetSummary, params })
}

/**
 * @description: 数据源调用排行
 */
export const getTopDs = (params) => {
  return defHttp.get<BasicResult>({ url: Api.GetTopDs, params })
}

/**
 * @description: 机构调用排行
 */
export const getTopOrg = (params) => {
  return defHttp.get<BasicResult>({ url: Api.GetTopOrg, params })
}

/**
 * @description: 产品调用排行
 */
export const getTopProduct = (params) => {
  return defHttp.get<BasicResult>({ url: Api.GetTopProduct, params })
}
