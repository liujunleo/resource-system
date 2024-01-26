import { h } from 'vue'
import { Tag } from 'ant-design-vue'
import { BasicColumn } from '/@/components/Table'

export const columns: BasicColumn[] = [
  {
    title: '流水号',
    dataIndex: 'flowNo',
    width: 250,
    fixed: 'left',
  },
  {
    title: '状态',
    dataIndex: 'status',
    width: 80,
    customRender: ({ record }) => {
      const status = record.state
      const enable = ~~status === 1
      const color = enable ? 'green' : 'red'
      const text = enable ? '成功' : '失败'
      return h(Tag, { color: color }, () => text)
    },
  },
  {
    title: '总耗时',
    dataIndex: 'delayed',
    customRender: ({ record }) => {
      const text = record.delayed
      return `${text}ms`
    },
  },
  {
    title: '接口耗时',
    dataIndex: 'apiDelayed',
    customRender: ({ record }) => {
      const text = record.apiDelayed
      return `${text}ms`
    },
  },
  {
    title: '数据源名称',
    dataIndex: 'dsName',
  },
  {
    title: '接口名称',
    dataIndex: 'apiName',
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
    title: '数据源应答码',
    dataIndex: 'apiResponseCode',
  },
  {
    title: '数据源应答信息',
    dataIndex: 'apiResponseMessage',
  },
  {
    title: '系统应答码',
    dataIndex: 'sysResponseCode',
  },
  {
    title: '系统应答信息',
    dataIndex: 'sysResponseMessage',
  },
  {
    title: '创建时间',
    dataIndex: 'createdTime',
    width: 180,
  },
]
