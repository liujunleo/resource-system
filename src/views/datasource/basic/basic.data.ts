import { BasicColumn, FormSchema } from '/@/components/Table'
import { h } from 'vue'
import { Tag } from 'ant-design-vue'
import { getDataSourceOptions } from '@/api/datasource/basic'

export const basicInfoColumns: BasicColumn[] = [
  {
    title: '数据源编码',
    dataIndex: 'dsCode',
  },
  {
    title: '数据源名称',
    dataIndex: 'dsName',
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
    title: '创建时间',
    dataIndex: 'createdTime',
    // sorter: (a, b) => {
    //   const aTime = new Date(a.createdTime).getTime()
    //   const bTime = new Date(b.createdTime).getTime()
    //   return aTime - bTime
    // },
  },
]
export const searchBasicFormSchema: FormSchema[] = [
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
]
