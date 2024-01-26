import { getProductOptions } from '@/api/productManagement'
import { BasicColumn, FormSchema } from '/@/components/Table'
export const columns: BasicColumn[] = [
  {
    title: '认证产品编码',
    dataIndex: 'productCode',
  },
  {
    title: '认证产品名称',
    dataIndex: 'productName',
  },
  {
    title: '创建时间',
    dataIndex: 'createdTime',
  },
]

export const searchFormSchema: FormSchema[] = [
  {
    field: 'productName',
    label: '认证产品名称',
    component: 'ApiSelect',
    colProps: { span: 6 },
    componentProps: {
      placeholder: '请选择认证产品',
      showSearch: true,
      api: getProductOptions,
      labelField: 'name',
      valueField: 'name',
      resultField: 'data',
    },
  },
]
