import { defHttp } from '/@/utils/http/axios'
import { BasicResult } from '../model/baseModel'

enum Api {
  GetOrganizationList = '/organization/list',
  AddOrganization = '/organization/add',
  UpdateOrganization = '/organization/update',
  DeleteOrganization = '/organization/delete',
  GetOrganizationById = '/organization/get',
  GetOrganizationProductList = '/organizationProduct/list',
  AddOrganizationProduct = '/organizationProduct/add',
  UpdateOrganizationProduct = '/organizationProduct/update',
  DeleteOrganizationProduct = '/organizationProduct/delete',
  GetOrganizationProductById = '/organizationProduct/get',
  GetOrganizationOption = '/option/organization',
  CheckOrgAccountUnique = '/organization/checkAccount',
  CheckOrgNameUnique = '/organization/checkName',
  CheckOrgCodeUnique = '/organization/checkCode',
}

/**
 * @description: 获取机构信息列表
 */

export const getOrganizationList = (params) => {
  return defHttp.get<BasicResult>({ url: Api.GetOrganizationList, params })
}

/**
 * @description: 新增机构信息
 */

export const addOrganization = (params) => {
  return defHttp.post<BasicResult>({ url: Api.AddOrganization, params })
}

/**
 * @description: 修改机构信息
 */

export const updateOrganization = (params) => {
  return defHttp.put<BasicResult>({ url: Api.UpdateOrganization, params })
}

/**
 * @description: 删除机构信息
 */

export const deleteOrganization = (id) => {
  return defHttp.delete<BasicResult>({ url: `${Api.DeleteOrganization}/${id}` })
}
/**
 * @description: 获取机构信息详情
 */

export const getOrganizationById = (id) => {
  return defHttp.get<BasicResult>({ url: `${Api.GetOrganizationById}/${id}` })
}

/**
 * @description: 获取机构产品信息列表
 */

export const getOrganizationProductList = (params) => {
  return defHttp.get<BasicResult>({ url: Api.GetOrganizationProductList, params })
}

/**
 * @description: 新增机构产品信息
 */

export const addOrganizationProduct = (params) => {
  return defHttp.post<BasicResult>({ url: Api.AddOrganizationProduct, params })
}

/**
 * @description: 修改机构产品信息
 */

export const updateOrganizationProduct = (params) => {
  return defHttp.put<BasicResult>({ url: Api.UpdateOrganizationProduct, params })
}

/**
 * @description: 删除机构产品信息
 */

export const deleteOrganizationProduct = (id) => {
  return defHttp.delete<BasicResult>({ url: `${Api.DeleteOrganizationProduct}/${id}` })
}
/**
 * @description: 获取机构产品信息详情
 */

export const getOrganizationProductById = (id) => {
  return defHttp.get<BasicResult>({ url: `${Api.GetOrganizationProductById}/${id}` })
}

/**
 * @description: 新增表单获取机构下拉选项
 */
export const getOrganizationOption = () => {
  return defHttp.get<BasicResult>({ url: Api.GetOrganizationOption })
}

/**
 * @description: 校验机构账号ID唯一性
 */
export const checkOrgAccountUnique = (params) => {
  return defHttp.get<BasicResult>({ url: Api.CheckOrgAccountUnique, params })
}

/**
 * @description: 校验机构名称唯一性
 */
export const checkOrgNameUnique = (params) => {
  return defHttp.get<BasicResult>({ url: Api.CheckOrgNameUnique, params })
}

/**
 * @description: 校验机构编码唯一性
 */
export const checkOrgCodeUnique = (params) => {
  return defHttp.get<BasicResult>({ url: Api.CheckOrgCodeUnique, params })
}
