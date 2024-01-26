import { getProductOptions } from '/@/api/productManagement'
import { getDataSourceOptions } from '/@/api/datasource/basic'
import { BasicColumn, FormSchema } from '/@/components/Table'

export const columns: BasicColumn[] = [
  {
    title: '切换规则名称',
    dataIndex: 'switchRuleName',
  },
  {
    title: '数据源名称',
    dataIndex: 'dsName',
  },
  {
    title: '认证产品',
    dataIndex: 'productName',
  },

  {
    title: '连续失败规则',
    dataIndex: 'switchRuleDetail',
  },
  {
    title: '创建时间',
    dataIndex: 'createdTime',
  },
]
export const searchFormSchema: FormSchema[] = [
  {
    field: 'switchRuleName',
    label: '切换规则名称',
    component: 'Input',
    colProps: { span: 6 },
    componentProps: {
      placeholder: '请输入切换规则名称',
    },
  },
  {
    field: 'dsName',
    label: '数据源名称',
    component: 'ApiSelect',
    colProps: { span: 6 },
    componentProps: {
      showSearch: true,
      api: getDataSourceOptions,
      labelField: 'name',
      valueField: 'name',
      resultField: 'data',
      placeholder: '请选择数据源',
    },
  },
  {
    field: 'productName',
    label: '认证产品',
    component: 'ApiSelect',
    colProps: { span: 6 },
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
