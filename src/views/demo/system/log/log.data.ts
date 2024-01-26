import { h } from 'vue'
import { Tag } from 'ant-design-vue'
import { BasicColumn, FormSchema } from '/@/components/Table'

export const columns: BasicColumn[] = [
  {
    title: 'ID',
    dataIndex: 'id',
  },
  {
    title: '系统模块',
    dataIndex: 'module',
    fixed: 'left',
  },
  {
    title: '操作类型',
    dataIndex: 'title',
    fixed: 'left',
  },
  {
    title: '客户端IP',
    dataIndex: 'ip',
  },
  {
    title: '请求地址',
    dataIndex: 'url',
  },
  {
    title: '请求方式',
    dataIndex: 'method',
  },
  {
    title: '请求参数',
    dataIndex: 'requestParameter',
  },
  {
    title: '请求时间',
    dataIndex: 'requestTime',
  },
  {
    title: '响应参数',
    dataIndex: 'responseParameter',
  },
  {
    title: '响应时间',
    dataIndex: 'responseTime',
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
    title: '创建时间',
    dataIndex: 'createdTime',
    width: 180,
  },
]

export const searchFormSchema: FormSchema[] = [
  {
    field: 'createBy',
    label: '操作人',
    component: 'Input',
    colProps: { span: 6 },
  },
  {
    field: 'title',
    label: '操作类型',
    component: 'Input',
    colProps: { span: 6 },
  },
  {
    field: '[startDateStr, endDateStr]',
    label: '操作日期',
    component: 'RangePicker',
    colProps: { span: 6 },
    componentProps: {
      format: 'YYYY-MM-DD',
      placeholder: ['开始日期', '结束日期'],
    },
  },
]
