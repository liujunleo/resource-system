import { defHttp } from '/@/utils/http/axios'
import { BasicResult } from '../model/baseModel'

enum Api {
  GetShuntingRuleList = '/shuntingRule/list',
  AddShuntingRule = '/shuntingRule/add',
  UpdateShuntingRule = '/shuntingRule/update',
  DeleteShuntingRule = '/shuntingRule/delete',
  GetShuntingRuleById = '/shuntingRule/get',
  CheckShuntingRuleName = '/shuntingRule/checkName',
  CheckProduct = '/shuntingRule/checkProduct',
}

/**
 * @description: 获取分流配置列表
 */

export const getShuntingRuleList = (params) => {
  return defHttp.get<BasicResult>({ url: Api.GetShuntingRuleList, params })
}

/**
 * @description: 新增分流配置
 */

export const addShuntingRule = (params) => {
  return defHttp.post<BasicResult>({ url: Api.AddShuntingRule, params })
}

/**
 * @description: 修改分流配置
 */

export const updateShuntingRule = (params) => {
  return defHttp.put<BasicResult>({ url: Api.UpdateShuntingRule, params })
}

/**
 * @description: 删除分流配置
 */

export const deleteShuntingRule = (id) => {
  return defHttp.delete<BasicResult>({ url: `${Api.DeleteShuntingRule}/${id}` })
}
/**
 * @description: 获取分流配置详情
 */

export const getShuntingRuleById = (id) => {
  return defHttp.get<BasicResult>({ url: `${Api.GetShuntingRuleById}/${id}` })
}

/**
 * @description: 校验规则名称唯一性
 */
export const checkShuntingRuleName = (params) => {
  return defHttp.get<BasicResult>({ url: Api.CheckShuntingRuleName, params })
}

/**
 * @description: 校验产品唯一性
 */
export const checkProduct = (params) => {
  return defHttp.get<BasicResult>({ url: Api.CheckProduct, params })
}
