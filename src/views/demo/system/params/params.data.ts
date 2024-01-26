import { BasicColumn, FormSchema } from '/@/components/Table'

export const columns: BasicColumn[] = [
  {
    title: '参数代码',
    dataIndex: 'parameterCode',
  },
  {
    title: '参数名称',
    dataIndex: 'parameterName',
  },
  {
    title: '参数值',
    dataIndex: 'parameterValue',
  },
  {
    title: '系统内置',
    dataIndex: 'isSystem',
    customRender: ({ record }) => {
      const enable = ~~record.isSystem === 1
      const text = enable ? '是' : '否'
      return text
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
    field: 'parameterName',
    label: '参数名称',
    component: 'Input',
    colProps: { span: 8 },
  },
  {
    field: 'isSystem',
    label: '系统内置',
    component: 'Select',
    componentProps: {
      options: [
        { label: '是', value: '1' },
        { label: '否', value: '0' },
      ],
    },
    colProps: { span: 8 },
  },
]

export const paramsFormSchema: FormSchema[] = [
  {
    field: 'parameterCode',
    label: '参数代码',
    component: 'Input',
    rules: [
      {
        required: true,
        message: '请输入参数代码',
      },
    ],
    dynamicDisabled: ({ values }) => {
      return !!values.id
    },
  },
  {
    field: 'id',
    label: 'ID',
    component: 'Input',
    ifShow: false,
  },
  {
    field: 'parameterName',
    label: '参数名称',
    component: 'Input',
    required: true,
    rules: [
      {
        required: true,
        message: '请输入参数名称',
      },
    ],
  },
  {
    label: '参数值',
    field: 'parameterValue',
    component: 'Input',
    required: true,
  },
  {
    field: 'isSystem',
    label: '系统内置',
    component: 'RadioButtonGroup',
    defaultValue: '0',
    componentProps: {
      options: [
        { label: '是', value: '1' },
        { label: '否', value: '0' },
      ],
    },
  },
]
