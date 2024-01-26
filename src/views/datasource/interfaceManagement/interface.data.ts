import { Tag } from 'ant-design-vue'
import { h } from 'vue'
import { getDataSourceOptions } from '/@/api/datasource/basic'
import { getProductOptions } from '/@/api/productManagement'
import { BasicColumn, FormSchema } from '/@/components/Table'
import { getDataSourceInterfaceOptions } from '@/api/datasource/interface'

export const columns: BasicColumn[] = [
  {
    title: '数据源名称',
    dataIndex: 'dsName',
    width: 120,
  },
  {
    title: '认证产品',
    dataIndex: 'productName',
    width: 120,
  },
  {
    title: '接口代码',
    dataIndex: 'interfaceCode',
    width: 150,
  },
  {
    title: '接口名称',
    dataIndex: 'interfaceName',
    width: 120,
  },
  {
    title: '接口URL',
    dataIndex: 'interfaceUrl',
    width: 300,
  },
  {
    title: '状态',
    dataIndex: 'status',
    width: 80,
    customRender: ({ record }) => {
      const status = record.state
      const enable = ~~status === 1
      const color = enable ? 'green' : 'red'
      const text = enable ? '启用' : '停用'
      return h(Tag, { color: color }, () => text)
    },
  },
  {
    title: '备注',
    dataIndex: 'remark',
    width: 120,
  },
  {
    title: '创建时间',
    dataIndex: 'createdTime',
    width: 180,
  },
]
export const searchFormSchema: FormSchema[] = [
  {
    field: 'interfaceName',
    label: '接口名称',
    component: 'ApiSelect',
    colProps: { span: 6 },
    componentProps: {
      showSearch: true,
      optionFilterProp: 'label',
      api: getDataSourceInterfaceOptions,
      labelField: 'interfaceName',
      valueField: 'interfaceName',
      resultField: 'data',
      placeholder: '请选择数据源接口',
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
