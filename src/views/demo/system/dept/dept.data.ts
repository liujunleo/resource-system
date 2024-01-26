import { BasicColumn, FormSchema } from '/@/components/Table'
import { h } from 'vue'
import { Tag } from 'ant-design-vue'
import { getDeptList } from '/@/api/sys/dept'

export const columns: BasicColumn[] = [
  {
    title: '部门名称',
    dataIndex: 'deptName',
  },
  {
    title: '部门编码',
    dataIndex: 'deptCode',
  },
  {
    title: '排序',
    dataIndex: 'xh',
    width: 50,
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
    dataIndex: 'createTime',
    width: 180,
  },
]

export const searchFormSchema: FormSchema[] = [
  {
    field: 'deptName',
    label: '部门名称',
    component: 'Input',
    colProps: { span: 8 },
  },
  {
    field: 'state',
    label: '状态',
    component: 'Select',
    componentProps: {
      options: [
        { label: '启用', value: '1' },
        { label: '停用', value: '0' },
      ],
    },
    colProps: { span: 8 },
  },
]

export const formSchema: FormSchema[] = [
  {
    field: 'deptName',
    label: '部门名称',
    component: 'Input',
    required: true,
  },
  {
    field: 'id',
    label: '部门id',
    component: 'Input',
    ifShow: false,
  },
  {
    field: 'deptCode',
    label: '部门编码',
    component: 'Input',
    required: true,
  },
  {
    field: 'parentId',
    label: '上级部门',
    component: 'ApiSelect',
    componentProps: {
      api: getDeptList,
      labelField: 'deptName',
      valueField: 'id',
      resultField: 'data',
    },
    required: false,
  },
  {
    field: 'xh',
    label: '排序',
    component: 'InputNumber',
    required: true,
    defaultValue: 999,
    componentProps: {
      min: 1,
    },
  },
  {
    field: 'status',
    label: '状态',
    component: 'RadioButtonGroup',
    defaultValue: '1',
    componentProps: {
      options: [
        { label: '启用', value: '1' },
        { label: '停用', value: '0' },
      ],
    },
    required: true,
  },
]
