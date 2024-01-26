<template>
  <BasicModal
    v-bind="$attrs"
    @register="registerModal"
    :title="getTitle"
    @ok="handleSubmit"
    @cancel="onClose"
    :maskClosable="false"
  >
    <BasicForm @register="registerForm" />
  </BasicModal>
</template>
<script lang="ts">
  import { defineComponent, ref, computed, unref } from 'vue'
  import { BasicModal, useModalInner } from '/@/components/Modal'
  import { BasicForm, useForm, FormSchema } from '/@/components/Form/index'

  import {
    addDataSource,
    checkDataSourceCodeUnique,
    checkDataSourceNameUnique,
    updateDataSource,
  } from '/@/api/datasource/basic'
  import { useMessage } from '/@/hooks/web/useMessage'

  const { createMessage } = useMessage()
  export default defineComponent({
    name: 'DatasourceBasicModal',
    components: { BasicModal, BasicForm },
    emits: ['success', 'register'],
    setup(_, { emit }) {
      const isUpdate = ref(true)
      const basicFormSchema: FormSchema[] = [
        {
          field: 'id',
          label: 'id',
          component: 'Input',
          ifShow: false,
        },
        {
          field: 'dsCode',
          label: '数据源编码',
          component: 'Input',
          required: true,
          componentProps: {
            placeholder: '请输入数据源编码',
          },
          dynamicDisabled: ({ values }) => {
            return !!values.id
          },
          rules: [
            {
              trigger: 'blur',
              required: true,
              validator: (_, value) => {
                const values = getFieldsValue()
                if (!value) {
                  return Promise.reject(new Error('请输入数据源编码'))
                }
                if (value) {
                  const params = {
                    code: value,
                    id: values.id,
                  }
                  return new Promise((resolve, reject) => {
                    checkDataSourceCodeUnique(params).then((res) => {
                      if (res.data === true) {
                        resolve()
                      } else {
                        reject(new Error('数据源编码已存在'))
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
          field: 'dsName',
          label: '数据源名称',
          component: 'Input',
          componentProps: {
            placeholder: '请输入数据源名称',
          },
          rules: [
            {
              trigger: 'blur',
              required: true,
              validator: (_, value) => {
                const values = getFieldsValue()
                if (!value) {
                  return Promise.reject(new Error('请输入数据源名称'))
                }
                if (value) {
                  const params = {
                    name: value,
                    id: values.id,
                  }
                  return new Promise((resolve, reject) => {
                    checkDataSourceNameUnique(params).then((res) => {
                      if (res.data === true) {
                        resolve()
                      } else {
                        reject(new Error('数据源名称已存在'))
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
      ]

      const [
        registerForm,
        { resetFields, getFieldsValue, setFieldsValue, updateSchema, validate },
      ] = useForm({
        labelWidth: 140,
        baseColProps: { span: 20 },
        schemas: basicFormSchema,
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

      const getTitle = computed(() => (!unref(isUpdate) ? '新增数据源信息' : '编辑数据源信息'))

      async function handleSubmit() {
        try {
          const values = await validate()
          setModalProps({ confirmLoading: true })
          if (values.id) {
            updateDataSource(values).then(() => {
              createMessage.success('修改成功')
              closeModal()
              emit('success')
            })
          } else {
            addDataSource(values).then(() => {
              createMessage.success('新增成功')
              closeModal()
              emit('success')
            })
          }
        } finally {
          setModalProps({ confirmLoading: false })
        }
      }
      function onClose() {
        closeModal()
        resetFields()
      }
      return { registerModal, registerForm, getTitle, handleSubmit, onClose }
    },
  })
</script>
