import { getProductOptions } from '/@/api/productManagement'
import { BasicColumn, FormSchema } from '/@/components/Table'

export const columns: BasicColumn[] = [
  {
    title: '分流规则名称',
    dataIndex: 'shuntingRuleName',
  },
  {
    title: '认证产品',
    dataIndex: 'productName',
  },
  {
    title: '分流规则',
    dataIndex: 'shuntingRule',
  },
  {
    title: '创建时间',
    dataIndex: 'createdTime',
  },
]
export const searchFormSchema: FormSchema[] = [
  {
    field: 'shuntingRuleName',
    label: '分流规则名称',
    component: 'Input',
    colProps: { span: 8 },
    componentProps: {
      placeholder: '请输入分流规则名称',
    },
  },
  {
    field: 'productName',
    label: '认证产品',
    component: 'ApiSelect',
    colProps: { span: 8 },
    componentProps: {
      showSearch: true,
      api: getProductOptions,
      labelField: 'name',
      valueField: 'name',
      resultField: 'data',
      placeholder: '请选择认证产品',
    },
  },
]

export const detailColumns: BasicColumn[] = [
  {
    title: '数据源',
    dataIndex: 'dsName',
  },
  {
    title: '接口名称',
    dataIndex: 'interfaceName',
  },
  {
    title: '权重%',
    dataIndex: 'weight',
  },
]
