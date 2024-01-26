/**
 * @description: Login interface parameters
 */
export interface LoginParams {
  username: string
  password: string
}

export interface RoleInfo {
  roleName: string
  value: string
}

export interface loginInfo {
  nickname: string
  token: string
  username: string
  realName: string
}
/**
 * @description: Login interface return value
 */
export interface LoginResultModel {
  code: string
  data: loginInfo
  errorStackTrace: string
  message: string
}

/**
 * @description: Get user information return value
 */
export interface GetUserInfoModel {
  roles?: RoleInfo[]
  // 用户id
  // userId: string | number
  // 用户名
  username: string
  nickname: string
  // 真实名字
  realName?: string
  // 头像
  avatar?: string
  // 介绍
  desc?: string
}
