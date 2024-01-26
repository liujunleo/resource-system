import { defHttp } from '/@/utils/http/axios'
import { BasicResult } from './model/menuModel'

enum Api {
  GetOperationLogList = '/operationLog/list',
}

/**
 * @description: 获取登录日志列表
 */

export const getOperationLogList = (params) => {
  return defHttp.get<BasicResult>({ url: Api.GetOperationLogList, params })
}
