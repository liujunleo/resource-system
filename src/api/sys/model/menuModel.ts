import type { RouteMeta } from 'vue-router'
export interface RouteItem {
  path: string
  component: any
  meta: RouteMeta
  menuName?: string
  alias?: string | string[]
  redirect?: string
  caseSensitive?: boolean
  children?: RouteItem[]
}

export interface BasicResult {
  code: string | number
  msg: string
  data?: any
  content?: any
  [props: string]: any
}

/**
 * @description: Get menu return value
 */
export type getMenuListResultModel = RouteItem[]
