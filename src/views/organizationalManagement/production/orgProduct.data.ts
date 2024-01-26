import { BasicColumn, FormSchema } from '/@/components/Table'
import { Tag } from 'ant-design-vue'
import { h } from 'vue'
import { getOrganizationOption } from '/@/api/organizationalManagement'
import { getProductOptions } from '@/api/productManagement'

export const columns: BasicColumn[] = [
  {
    title: '机构账号',
    dataIndex: 'orgAccount',
  },
  {
    title: '机构名称',
    dataIndex: 'orgName',
  },
  {
    title: '认证产品',
    dataIndex: 'productName',
  },
  {
    title: '当前套餐剩余',
    dataIndex: 'remainingTimes',
    customRender: ({ record }) => {
      if (!record.remainingTimes) {
        return ''
      } else {
        return `${record.remainingTimes}次`
      }
    },
  },
  {
    title: '是否支持欠账',
    dataIndex: 'isSupportArrearsName',
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
      placeholder: '请选择产品',
    },
  },
]

export const OrgProductFormSchema: FormSchema[] = [
  {
    field: 'orgId',
    label: '机构',
    component: 'ApiSelect',
    componentProps: ({ formModel }) => {
      return {
        disabled: false,
        api: getOrganizationOption,
        labelField: 'orgName',
        valueField: 'id',
        resultField: 'data',
        getPopupContainer: () => document.body,
        onChange: (val, options) => {
          if (options) {
            formModel.orgName = options.orgName
          }
        },
        placeholder: '请选择机构',
      }
    },
    dynamicDisabled: ({ values }) => {
      return !!values.id
    },
    required: true,
  },
  {
    field: 'productId',
    label: '认证产品',
    required: true,
    component: 'ApiSelect',
    componentProps: {
      api: getProductOptions,
      labelField: 'name',
      valueField: 'id',
      resultField: 'data',
      getPopupContainer: () => document.body,
      placeholder: '请选择认证产品',
    },
    dynamicDisabled: ({ values }) => {
      return !!values.id
    },
  },
  // {
  //   field: 'orgName',
  //   label: '机构名称',
  //   component: 'Input',
  //   slot: 'orgName',
  // },
  {
    field: 'id',
    label: 'id',
    component: 'Input',
    ifShow: false,
  },
  {
    field: 'remainingTimes',
    label: '当前套餐剩余次数',
    component: 'InputNumber',
    defaultValue: 0,
  },
  {
    field: 'isSupportArrears',
    label: '是否支持欠账',
    component: 'RadioButtonGroup',
    defaultValue: '1',
    componentProps: {
      options: [
        { label: '是', value: '1' },
        { label: '否', value: '0' },
      ],
    },
  },
  {
    field: 'state',
    label: '账号状态',
    component: 'RadioButtonGroup',
    defaultValue: '1',
    componentProps: {
      options: [
        { label: '启用', value: '1' },
        { label: '停用', value: '0' },
      ],
    },
  },
]
