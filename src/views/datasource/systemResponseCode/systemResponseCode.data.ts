import { BasicColumn, FormSchema } from '/@/components/Table'

export const columns: BasicColumn[] = [
  {
    title: '应答码',
    dataIndex: 'sysCode',
  },
  {
    title: '应答信息',
    dataIndex: 'sysMessage',
  },
  {
    title: '是否系统级别',
    dataIndex: 'isSys',
    customRender: ({ record }) => {
      const status = record.isSys
      const enable = ~~status === 1
      const text = enable ? '是' : '否'
      return text
    },
  },
  {
    title: '创建时间',
    dataIndex: 'createdTime',
  },
]
export const searchFormSchema: FormSchema[] = [
  {
    field: 'sysCode',
    label: '应答码',
    component: 'Input',
    colProps: { span: 8 },
    componentProps: {
      placeholder: '请输入应答码',
    },
  },
]
export const systemResponseCodeFormSchema: FormSchema[] = [
  {
    field: 'id',
    label: 'id',
    component: 'Input',
    ifShow: false,
  },
  {
    field: 'sysCode',
    label: '平台应答码',
    component: 'Input',
    required: true,
    componentProps: {
      placeholder: '请输入平台应答码',
    },
    dynamicDisabled: ({ values }) => {
      return !!values.id
    },
  },
  {
    field: 'sysMessage',
    label: '平台应答信息',
    component: 'Input',
    required: true,
    componentProps: {
      placeholder: '请输入平台应答信息',
    },
  },
  {
    field: 'isSys',
    label: '是否系统级别',
    component: 'RadioButtonGroup',
    defaultValue: '1',
    componentProps: {
      options: [
        { label: '是', value: '1' },
        { label: '否', value: '0' },
      ],
    },
  },
]
