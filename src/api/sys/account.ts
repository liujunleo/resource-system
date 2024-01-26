import { defHttp } from '/@/utils/http/axios'
import { BasicResult } from './model/menuModel'

enum Api {
  GetAccountList = '/user/list',
  AddAccount = '/user/add',
  DeleteAccount = '/user/delete',
  UpdateAccount = '/user/update',
  GetAccountById = '/user/get',
}

/**
 * @description: 查询用户账号列表
 */

export const getAccountList = (params) => {
  return defHttp.get<BasicResult>({ url: Api.GetAccountList, params })
}

/**
 * @description: 新增用户账号
 */
export const addAccount = (params) => {
  return defHttp.post<BasicResult>({ url: Api.AddAccount, params })
}
/**
 * @description: 删除用户账号
 */
export const deleteAccount = (id) => {
  return defHttp.delete<BasicResult>({ url: `${Api.DeleteAccount}/${id}` })
}
/**
 * @description: 修改用户账号信息
 */
export const updateAccount = (params) => {
  return defHttp.put<BasicResult>({ url: Api.UpdateAccount, params })
}
/**
 * @description: 用户账号详情
 */
export const getAccountById = (id) => {
  return defHttp.get<BasicResult>({ url: `${Api.GetAccountById}/${id}` })
}
