import { Tag } from 'ant-design-vue'
import { h } from 'vue'
import { BasicColumn, FormSchema } from '/@/components/Table'

export const dictTypeColumns: BasicColumn[] = [
  {
    title: '字典类型名称',
    dataIndex: 'dictTypeName',
  },
  {
    title: '字典类型代码',
    dataIndex: 'dictTypeCode',
  },
  {
    title: '状态',
    dataIndex: 'state',
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
  },
  {
    title: '创建时间',
    dataIndex: 'createdTime',
    width: 180,
  },
]

export const searchDictTypeFormSchema: FormSchema[] = [
  {
    field: 'dictTypeCode',
    label: '字典类型代码',
    component: 'Input',
    colProps: { span: 8 },
  },
  {
    field: 'dictTypeName',
    label: '字典类型名称',
    component: 'Input',
    colProps: { span: 8 },
  },
]

export const DictTypeFormSchema: FormSchema[] = [
  {
    field: 'dictTypeCode',
    label: '字典类型代码',
    component: 'Input',
    rules: [
      {
        required: true,
        message: '请输入字典类型代码',
      },
    ],
  },
  {
    field: 'id',
    label: '字典ID',
    component: 'Input',
    ifShow: false,
  },
  {
    field: 'dictTypeName',
    label: '字典类型名称',
    component: 'Input',
    required: true,
    rules: [
      {
        required: true,
        message: '请输入字典类型名称',
      },
    ],
  },
  {
    field: 'state',
    label: '状态',
    component: 'RadioButtonGroup',
    defaultValue: '1',
    componentProps: {
      options: [
        { label: '启用', value: '1' },
        { label: '禁用', value: '0' },
      ],
    },
  },
  {
    label: '备注',
    field: 'remark',
    component: 'InputTextArea',
  },
]

// 字典
export const dictColumns: BasicColumn[] = [
  {
    title: '字典名称',
    dataIndex: 'dictName',
  },
  {
    title: '字典代码',
    dataIndex: 'dictCode',
  },
  {
    title: '创建时间',
    dataIndex: 'createdTime',
    width: 200,
  },
]

export const DictFormSchema: FormSchema[] = [
  {
    field: 'dictTypeId',
    label: '字典类型',
    component: 'Input',
    dynamicDisabled: true,
    required: true,
  },
  {
    field: 'dictCode',
    label: '字典代码',
    component: 'Input',
    rules: [
      {
        required: true,
        message: '请输入字典代码',
      },
    ],
  },
  {
    field: 'id',
    label: '字典ID',
    component: 'Input',
    ifShow: false,
  },
  {
    field: 'dictName',
    label: '字典名称',
    component: 'Input',
    required: true,
    rules: [
      {
        required: true,
        message: '请输入字典名称',
      },
    ],
  },
  {
    field: 'xh',
    label: '序号',
    component: 'Input',
    required: true,
  },
]
