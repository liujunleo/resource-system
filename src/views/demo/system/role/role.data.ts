import { BasicColumn, FormSchema } from '/@/components/Table'
import { h } from 'vue'
import { Tag } from 'ant-design-vue'
// import { setRoleStatus } from '/@/api/demo/system'
// import { useMessage } from '/@/hooks/web/useMessage'

// type CheckedType = boolean | string | number
export const columns: BasicColumn[] = [
  {
    title: '角色名称',
    dataIndex: 'roleName',
    width: 200,
  },
  {
    title: '角色值',
    dataIndex: 'roleCode',
    width: 180,
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
  // {
  //   title: '状态',
  //   dataIndex: 'state',
  //   width: 120,
  //   customRender: ({ record }) => {
  //     if (!Reflect.has(record, 'pendingStatus')) {
  //       record.pendingStatus = false
  //     }
  //     return h(Switch, {
  //       checked: record.state === '1',
  //       checkedChildren: '停用',
  //       unCheckedChildren: '启用',
  //       loading: record.pendingStatus,
  //       onChange(checked: CheckedType) {
  //         record.pendingStatus = true
  //         const newStatus = checked ? '0' : '1'
  //         const { createMessage } = useMessage()
  //         setRoleStatus(record.id, newStatus)
  //           .then(() => {
  //             record.state = newStatus
  //             createMessage.success(`已成功修改角色状态`)
  //           })
  //           .catch(() => {
  //             createMessage.error('修改角色状态失败')
  //           })
  //           .finally(() => {
  //             record.pendingStatus = false
  //           })
  //       },
  //     })
  //   },
  // },
  {
    title: '创建时间',
    dataIndex: 'createdTime',
    width: 180,
  },
  {
    title: '备注',
    dataIndex: 'remark',
  },
]

export const searchFormSchema: FormSchema[] = [
  {
    field: 'roleName',
    label: '角色名称',
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
    field: 'roleName',
    label: '角色名称',
    required: true,
    component: 'Input',
  },
  {
    field: 'id',
    label: '角色id',
    ifShow: false,
    component: 'Input',
  },
  {
    field: 'roleCode',
    label: '角色值',
    required: true,
    component: 'Input',
  },
  {
    field: 'state',
    label: '状态',
    component: 'RadioButtonGroup',
    defaultValue: '1',
    componentProps: {
      options: [
        { label: '启用', value: '1' },
        { label: '停用', value: '0' },
      ],
    },
  },
  {
    label: '备注',
    field: 'remark',
    component: 'InputTextArea',
  },
  {
    label: ' ',
    field: 'menuIds',
    slot: 'menu',
    component: 'Input',
  },
]
