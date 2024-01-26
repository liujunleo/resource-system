import { h } from 'vue'
import { Tag } from 'ant-design-vue'
import { BasicColumn, FormSchema } from '/@/components/Table'

export const columns: BasicColumn[] = [
  {
    title: 'ID',
    dataIndex: 'id',
  },
  {
    title: '接口ID',
    dataIndex: 'apiId',
  },
  {
    title: '接口名称',
    dataIndex: 'apiName',
  },
  {
    title: '接口延时',
    dataIndex: 'apiDelayed',
    helpMessage: '毫秒',
  },
  {
    title: '请求接口时间',
    dataIndex: 'apiRequestTime',
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
    title: '接口响应时间',
    dataIndex: 'apiResponseTime',
  },
  {
    title: '平台延时',
    dataIndex: 'delayed',
    helpMessage: '毫秒',
  },
  {
    title: '响应参数',
    dataIndex: 'responseParameter',
  },
  {
    title: '数据源ID',
    dataIndex: 'dsId',
  },
  {
    title: '数据源名称',
    dataIndex: 'dsName',
  },
  {
    title: '流水号',
    dataIndex: 'flowNo',
  },
  {
    title: '机构账号',
    dataIndex: 'orgAccount',
  },
  {
    title: '机构编码',
    dataIndex: 'orgCode',
  },
  {
    title: '机构ID',
    dataIndex: 'orgId',
  },
  {
    title: '机构名称',
    dataIndex: 'orgName',
  },
  {
    title: '产品ID',
    dataIndex: 'productId',
  },
  {
    title: '产品名称',
    dataIndex: 'productName',
  },
  {
    title: '请求平台时间',
    dataIndex: 'requestTime',
  },
  {
    title: '平台响应时间',
    dataIndex: 'responseTime',
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
    field: 'apiCode',
    label: '数据源应答码',
    component: 'Input',
    colProps: { span: 6 },
  },
  {
    field: 'apiId',
    label: '接口ID',
    component: 'Input',
    colProps: { span: 6 },
  },
  {
    field: 'dsId',
    label: '数据源ID',
    component: 'Input',
    colProps: { span: 6 },
  },
  {
    field: 'flowNo',
    label: '流水号',
    component: 'Input',
    colProps: { span: 6 },
  },
  {
    field: 'orgAccount',
    label: '机构账号',
    component: 'Input',
    colProps: { span: 6 },
  },
  {
    field: 'orgCode',
    label: '机构号',
    component: 'Input',
    colProps: { span: 6 },
  },
  {
    field: 'productId',
    label: '产品ID',
    component: 'Input',
    colProps: { span: 6 },
  },
  {
    field: '[startDateStr, endDateStr]',
    label: '日期范围',
    component: 'RangePicker',
    componentProps: {
      valueFormat: 'yyyy-MM-dd',
    },
    colProps: { span: 6 },
  },
]
