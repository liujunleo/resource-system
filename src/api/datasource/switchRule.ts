import { defHttp } from '/@/utils/http/axios'
import { BasicResult } from '../model/baseModel'

enum Api {
  GetSwitchRuleList = '/switchRule/list',
  AddSwitchRule = '/switchRule/add',
  UpdateSwitchRule = '/switchRule/update',
  DeleteSwitchRule = '/switchRule/delete',
  GetSwitchRuleById = '/switchRule/get',
  CheckSwitchRuleNameUnique = '/switchRule/checkName',
  CheckDataSourceProductUnique = '/switchRule/checkProduct',
}

/**
 * @description: 获取切换规则列表
 */

export const getSwitchRuleList = (params) => {
  return defHttp.get<BasicResult>({ url: Api.GetSwitchRuleList, params })
}

/**
 * @description: 新增切换规则
 */

export const addSwitchRule = (params) => {
  return defHttp.post<BasicResult>({ url: Api.AddSwitchRule, params })
}

/**
 * @description: 修改切换规则
 */

export const updateSwitchRule = (params) => {
  return defHttp.put<BasicResult>({ url: Api.UpdateSwitchRule, params })
}

/**
 * @description: 删除切换规则
 */

export const deleteSwitchRule = (id) => {
  return defHttp.delete<BasicResult>({ url: `${Api.DeleteSwitchRule}/${id}` })
}
/**
 * @description: 获取切换规则详情
 */

export const getSwitchRuleById = (id) => {
  return defHttp.get<BasicResult>({ url: `${Api.GetSwitchRuleById}/${id}` })
}
/**
 * @description: 校验名称唯一性
 */

export const checkSwitchRuleNameUnique = (params) => {
  return defHttp.get<BasicResult>({ url: Api.CheckSwitchRuleNameUnique, params })
}

/**
 * @description: 校验数据源产品唯一性
 */

export const checkDataSourceProductUnique = (params) => {
  return defHttp.get<BasicResult>({ url: Api.CheckDataSourceProductUnique, params })
}
