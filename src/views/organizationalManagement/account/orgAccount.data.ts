import { Tag } from 'ant-design-vue'
import { h } from 'vue'
import { BasicColumn, FormSchema } from '/@/components/Table'
import { getOrganizationOption } from '@/api/organizationalManagement'

export const columns: BasicColumn[] = [
  {
    title: '机构编码',
    dataIndex: 'orgCode',
  },
  {
    title: '机构名称',
    dataIndex: 'orgName',
  },
  {
    title: '机构账号',
    dataIndex: 'orgAccount',
  },
  {
    title: '账号状态',
    dataIndex: 'state',
    width: 80,
    customRender: ({ record }) => {
      const status = record.state
      const enable = ~~status === 1
      const color = enable ? 'green' : 'red'
      const text = enable ? '正常' : '停用'
      return h(Tag, { color: color }, () => text)
    },
  },
  {
    title: '密钥',
    dataIndex: 'secret',
    width: 260,
  },
  {
    title: 'IP白名单',
    dataIndex: 'whitelist',
    width: 180,
  },
  {
    title: '联系人',
    dataIndex: 'contactName',
  },
  {
    title: '联系电话',
    dataIndex: 'telephone',
  },
  {
    title: '地址',
    dataIndex: 'address',
  },
  {
    title: '创建时间',
    dataIndex: 'createdTime',
    width: 180,
  },
]

export const searchFormSchema: FormSchema[] = [
  {
    field: 'orgName',
    label: '机构',
    component: 'ApiSelect',
    colProps: { span: 6 },
    componentProps: {
      showSearch: true,
      optionFilterProp: 'label',
      api: getOrganizationOption,
      labelField: 'orgName',
      valueField: 'orgName',
      resultField: 'data',
      placeholder: '请选择机构',
    },
  },
]
