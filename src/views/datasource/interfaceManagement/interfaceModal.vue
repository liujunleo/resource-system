<template>
  <BasicModal
    v-bind="$attrs"
    @register="registerModal"
    :maskClosable="false"
    :title="getTitle"
    width="50%"
    @ok="handleSubmit"
  >
    <BasicForm @register="registerForm" />
  </BasicModal>
</template>
<script lang="ts">
  import { defineComponent, ref, computed, unref } from 'vue'
  import { BasicModal, useModalInner } from '/@/components/Modal'
  import { BasicForm, useForm, FormSchema } from '/@/components/Form/index'

  import {
    addDataSourceInterface,
    checkDataSourceInterfaceCodeUnique,
    checkDataSourceInterfaceNameUnique,
    updateDataSourceInterface,
  } from '/@/api/datasource/interface'
  import { useMessage } from '/@/hooks/web/useMessage'
  import { getDataSourceOptions } from '@/api/datasource/basic'
  import { getProductOptions } from '@/api/productManagement'

  const { createMessage } = useMessage()
  export default defineComponent({
    name: 'InterfaceModal',
    components: { BasicModal, BasicForm },
    emits: ['success', 'register'],
    setup(_, { emit }) {
      const isUpdate = ref(true)
      const interfaceFormSchema: FormSchema[] = [
        {
          field: 'id',
          label: 'id',
          component: 'Input',
          ifShow: false,
        },
        {
          field: 'interfaceName',
          label: '接口名称',
          component: 'Input',
          componentProps: {
            placeholder: '请输入接口名称',
          },
          rules: [
            {
              trigger: 'blur',
              required: true,
              validator: (_, value) => {
                const values = getFieldsValue()
                if (!value) {
                  return Promise.reject(new Error('请输入接口名称'))
                }
                if (value) {
                  const params = {
                    name: value,
                    id: values.id,
                  }
                  return new Promise((resolve, reject) => {
                    checkDataSourceInterfaceNameUnique(params).then((res) => {
                      if (res.data === true) {
                        resolve()
                      } else {
                        reject(new Error('名称已存在'))
                      }
                    })
                  })
                }
                return Promise.resolve()
              },
            },
          ],
        },
        {
          field: 'interfaceCode',
          label: '接口代码',
          component: 'Input',
          componentProps: {
            placeholder: '请输入接口代码',
          },
          rules: [
            {
              trigger: 'blur',
              required: true,
              validator: (_, value) => {
                const values = getFieldsValue()
                if (!value) {
                  return Promise.reject(new Error('请输入接口代码'))
                }
                if (value) {
                  const params = {
                    code: value,
                    id: values.id,
                  }
                  return new Promise((resolve, reject) => {
                    checkDataSourceInterfaceCodeUnique(params).then((res) => {
                      if (res.data === true) {
                        resolve()
                      } else {
                        reject(new Error('接口代码已存在'))
                      }
                    })
                  })
                }
                return Promise.resolve()
              },
            },
          ],
          dynamicDisabled: ({ values }) => {
            return !!values.id
          },
        },
        {
          field: 'dataSourceId',
          label: '数据源',
          component: 'ApiSelect',
          required: true,
          componentProps: {
            api: getDataSourceOptions,
            labelField: 'name',
            valueField: 'id',
            resultField: 'data',
            placeholder: '请选择数据源',
          },
        },
        {
          field: 'productId',
          label: '认证产品',
          component: 'ApiSelect',
          required: true,
          componentProps: {
            api: getProductOptions,
            labelField: 'name',
            valueField: 'id',
            resultField: 'data',
            placeholder: '请选择认证产品',
          },
        },
        {
          field: 'interfaceUrl',
          label: '接口URL',
          component: 'Input',
          required: true,
          componentProps: {
            placeholder: '请输入接口URL',
          },
        },
        {
          field: 'state',
          label: '状态',
          component: 'RadioButtonGroup',
          defaultValue: '1',
          componentProps: {
            options: [
              { label: '正常', value: '1' },
              { label: '停用', value: '0' },
            ],
          },
        },
        {
          field: 'interfaceParamter',
          label: '接口参数',
          component: 'InputTextArea',
          componentProps: {
            placeholder: '请输入接口参数',
          },
        },
        {
          field: 'remark',
          label: '备注',
          component: 'InputTextArea',
          componentProps: {
            placeholder: '请输入备注',
          },
        },
      ]
      const [
        registerForm,
        { resetFields, getFieldsValue, setFieldsValue, updateSchema, validate },
      ] = useForm({
        labelWidth: 100,
        baseColProps: { lg: 12, md: 24 },
        schemas: interfaceFormSchema,
        showActionButtonGroup: false,
      })

      const [registerModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
        resetFields()
        setModalProps({ confirmLoading: false })
        isUpdate.value = !!data?.isUpdate
        if (unref(isUpdate)) {
          setFieldsValue({
            ...data.record,
          })
          updateSchema({
            field: 'id',
          })
        }
      })

      const getTitle = computed(() => (!unref(isUpdate) ? '新增数据源接口' : '编辑数据源接口'))

      async function handleSubmit() {
        try {
          const values = await validate()
          setModalProps({ confirmLoading: true })
          if (values.id) {
            updateDataSourceInterface(values).then(() => {
              createMessage.success('修改成功')
              closeModal()
              emit('success')
            })
          } else {
            addDataSourceInterface(values).then(() => {
              createMessage.success('新增成功')
              closeModal()
              emit('success')
            })
          }
        } finally {
          setModalProps({ confirmLoading: false })
        }
      }

      return { registerModal, registerForm, getTitle, handleSubmit }
    },
  })
</script>
