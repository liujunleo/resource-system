import { BasicColumn } from '/@/components/Table'

export const columns: BasicColumn[] = [
  {
    title: '机构账号',
    dataIndex: 'orgAccount',
  },
  {
    title: '机构名称',
    dataIndex: 'orgName',
  },
  {
    title: '认证产品',
    dataIndex: 'productName',
  },
  {
    title: '成功次数',
    dataIndex: 'successTimes',
  },
  {
    title: '失败次数',
    dataIndex: 'failTimes',
  },
  {
    title: '统计月份',
    dataIndex: 'statDate',
    width: 180,
  },
]

export const detailColumns: BasicColumn[] = [
  {
    title: '系统Code',
    dataIndex: 'sysResponseCode',
    width: 100,
  },
  {
    title: '系统信息',
    dataIndex: 'sysResponseMessage',
  },
  {
    title: '人证Code',
    dataIndex: 'rzCode',
    width: 100,
  },
  {
    title: '人证信息',
    dataIndex: 'rzMessage',
  },
  {
    title: '人像Code',
    dataIndex: 'rxCode',
    width: 100,
  },
  {
    title: '人像信息',
    dataIndex: 'rxMessage',
  },
  {
    title: '数量',
    dataIndex: 'total',
    width: 80,
  },
]
