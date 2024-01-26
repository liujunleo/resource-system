export interface BasicPageParams {
  page: number
  pageSize: number
}

export interface BasicFetchResult<T> {
  items: T[]
  total: number
}

export interface BasicResult {
  code: string | number
  msg: string
  data?: any
  content?: any
}
