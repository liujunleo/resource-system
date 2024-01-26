import { defHttp } from '/@/utils/http/axios'
import { BasicResult } from '../model/baseModel'

enum Api {
  GetProductList = '/product/list',
  AddProduct = '/product/add',
  UpdateProduct = '/product/update',
  DeleteProduct = '/product/delete',
  GetProductById = '/product/get',
  GetProductOptions = '/option/product',
  CheckNameUnique = '/product/checkName',
  CheckCodeUnique = '/product/checkCode',
}

/**
 * @description: 获取产品信息列表
 */

export const getProductList = (params) => {
  return defHttp.get<BasicResult>({ url: Api.GetProductList, params })
}

/**
 * @description: 新增产品信息
 */

export const addProduct = (params) => {
  return defHttp.post<BasicResult>({ url: Api.AddProduct, params })
}

/**
 * @description: 修改产品信息
 */

export const updateProduct = (params) => {
  return defHttp.put<BasicResult>({ url: Api.UpdateProduct, params })
}

/**
 * @description: 删除产品信息
 */

export const deleteProduct = (id) => {
  return defHttp.delete<BasicResult>({ url: `${Api.DeleteProduct}/${id}` })
}
/**
 * @description: 获取产品信息详情
 */

export const getProductById = (id) => {
  return defHttp.get<BasicResult>({ url: `${Api.GetProductById}/${id}` })
}
/**
 * @description: 获取产品下拉列表
 */

export const getProductOptions = () => {
  return defHttp.get<BasicResult>({ url: Api.GetProductOptions })
}
/**
 * @description: 产品名称校验唯一性
 */
export const checkNameUnique = (params) => {
  return defHttp.get<BasicResult>({ url: Api.CheckNameUnique, params })
}
/**
 * @description: 产品代码校验唯一性
 */
export const checkCodeUnique = (params) => {
  return defHttp.get<BasicResult>({ url: Api.CheckCodeUnique, params })
}
