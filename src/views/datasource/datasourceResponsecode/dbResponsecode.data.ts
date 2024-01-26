import { getProductOptions } from '@/api/productManagement'
import { getDataSourceInterfaceOptions } from '/@/api/datasource/interface'
import { getSystemResponseCodeOptions } from '/@/api/datasource/systemResponseCode'
import { BasicColumn, FormSchema } from '/@/components/Table'

export const columns: BasicColumn[] = [
  {
    title: '数据源名称',
    dataIndex: 'dsName',
  },
  {
    title: '接口名称',
    dataIndex: 'interfaceName',
  },
  {
    title: '认证产品',
    dataIndex: 'productName',
  },
  {
    title: '数据源应答码',
    dataIndex: 'apiCode',
  },
  {
    title: '数据源应答信息',
    dataIndex: 'apiMessage',
  },
  {
    title: '平台应答码',
    dataIndex: 'sysCode',
  },
  {
    title: '平台应答信息',
    dataIndex: 'sysMessage',
  },
  {
    title: '创建时间',
    dataIndex: 'createdTime',
    width: 180,
  },
]
export const searchFormSchema: FormSchema[] = [
  {
    field: 'dataSourceInterfaceId',
    label: '数据源接口',
    component: 'ApiSelect',
    colProps: { span: 8 },
    componentProps: {
      showSearch: true,
      optionFilterProp: 'label',
      api: getDataSourceInterfaceOptions,
      labelField: 'interfaceName',
      valueField: 'id',
      resultField: 'data',
      placeholder: '请选择数据源接口',
    },
  },
  {
    field: 'productId',
    label: '认证产品',
    component: 'ApiSelect',
    colProps: { span: 8 },
    componentProps: {
      showSearch: true,
      optionFilterProp: 'label',
      api: getProductOptions,
      labelField: 'name',
      valueField: 'id',
      resultField: 'data',
      placeholder: '请选择认证产品',
    },
  },
]
export const dbResponseCodeFormSchema: FormSchema[] = [
  {
    field: 'id',
    label: 'id',
    component: 'Input',
    ifShow: false,
  },

  {
    field: 'apiCode',
    label: '数据源应答码',
    component: 'Input',
    required: true,
    componentProps: {
      placeholder: '请输入数据源应答码',
    },
  },
  {
    field: 'apiMessage',
    label: '数据源应答信息',
    component: 'Input',
    required: true,
    componentProps: {
      placeholder: '请输入数据源应答信息',
    },
  },
  {
    field: 'dataSourceInterfaceId',
    label: '数据源接口',
    component: 'ApiSelect',
    required: true,
    componentProps({ formModel }) {
      return {
        showSearch: true,
        optionFilterProp: 'label',
        api: getDataSourceInterfaceOptions,
        labelField: 'interfaceName',
        valueField: 'id',
        resultField: 'data',
        getPopupContainer: () => document.body,
        onChange: (val, options) => {
          if (options) {
            formModel.productId = options.productName
          }
        },
        placeholder: '请选择数据源接口',
      }
    },
    dynamicDisabled: ({ values }) => {
      return !!values.id
    },
  },
  {
    field: 'systemResponseCodeId',
    label: '平台应答码',
    component: 'ApiSelect',
    required: true,
    componentProps({ formModel }) {
      return {
        showSearch: true,
        optionFilterProp: 'label',
        api: () => {
          return getSystemResponseCodeOptions().then((res) => {
            res.data.map((item) => {
              item.label = item.code + '-' + item.name
            })
            return res.data
          })
        },
        labelField: 'label',
        valueField: 'id',
        resultField: 'data',
        getPopupContainer: () => document.body,
        onChange: (val, options) => {
          if (options) {
            formModel.sysMessage = options.name
          }
        },
        placeholder: '请选择平台应答码',
      }
    },
  },
  // {
  //   field: 'sysMessage',
  //   label: '平台应答信息',
  //   component: 'Input',
  //   slot: 'sysMessage',
  // },
]
