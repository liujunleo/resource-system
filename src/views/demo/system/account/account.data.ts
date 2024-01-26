import { h } from 'vue'
import { Tag } from 'ant-design-vue'
import { getRoleList } from '/@/api/sys/role'
import { BasicColumn, FormSchema } from '/@/components/Table'

export const columns: BasicColumn[] = [
  {
    title: '用户名',
    dataIndex: 'username',
  },
  {
    title: '用户昵称',
    dataIndex: 'nickname',
  },
  {
    title: '所属部门',
    dataIndex: 'deptName',
  },
  {
    title: '角色',
    dataIndex: 'deptName',
  },
  {
    title: '邮箱',
    dataIndex: 'email',
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
  },
  {
    title: '备注',
    dataIndex: 'remark',
  },
]

export const searchFormSchema: FormSchema[] = [
  {
    field: 'username',
    label: '用户名',
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

export const accountFormSchema: FormSchema[] = [
  {
    field: 'username',
    label: '用户名',
    component: 'Input',
    rules: [
      {
        required: true,
        message: '请输入用户名',
      },
    ],
  },
  {
    field: 'id',
    label: '用户id',
    ifShow: false,
    component: 'Input',
  },
  {
    field: 'password',
    label: '密码',
    component: 'InputPassword',
    // ifShow: false,
    show: ({ values }) => {
      return !values.id
    },
    required: true,
    rules: [
      {
        required: true,
        message: '请输入密码',
      },
    ],
  },
  {
    field: 'updatePassword',
    label: '更新密码',
    component: 'InputPassword',
    show: ({ values }) => {
      return values.id
    },
  },
  {
    label: '角色',
    field: 'roleIds',
    component: 'ApiSelect',
    componentProps: {
      api: getRoleList,
      labelField: 'roleName',
      valueField: 'id',
      resultField: 'data.list',
      getPopupContainer: () => document.body,
    },
    required: true,
    rules: [
      {
        required: true,
        message: '请选择角色',
      },
    ],
  },
  {
    field: 'deptIds',
    label: '所属部门',
    component: 'TreeSelect',
    required: true,
    componentProps: {
      fieldNames: {
        label: 'deptName',
        key: 'id',
        value: 'id',
      },
      getPopupContainer: () => document.body,
    },
  },
  {
    field: 'nickname',
    label: '昵称',
    component: 'Input',
    required: true,
  },

  {
    label: '邮箱',
    field: 'email',
    component: 'Input',
  },
  {
    label: '备注',
    field: 'remark',
    component: 'InputTextArea',
  },
  {
    field: 'state',
    label: '状态',
    component: 'RadioButtonGroup',
    defaultValue: '1',
    required: true,
    componentProps: {
      options: [
        { label: '启用', value: '1' },
        { label: '禁用', value: '0' },
      ],
    },
  },
]
