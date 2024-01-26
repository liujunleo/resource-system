<template>
  <BasicModal
    v-bind="$attrs"
    @register="registerModal"
    :maskClosable="false"
    :title="getTitle"
    @ok="handleSubmit"
  >
    <BasicForm @register="registerForm" />
  </BasicModal>
</template>
<script lang="ts">
  import { defineComponent, ref, computed, unref } from 'vue'
  import { BasicModal, useModalInner } from '/@/components/Modal'
  import { BasicForm, useForm, FormSchema } from '/@/components/Form/index'
  // import { ProductFormSchema } from './product.data'

  import {
    addProduct,
    checkCodeUnique,
    checkNameUnique,
    updateProduct,
  } from '/@/api/productManagement/index'
  import { useMessage } from '/@/hooks/web/useMessage'

  const { createMessage } = useMessage()
  export default defineComponent({
    name: 'ProductModal',
    components: { BasicModal, BasicForm },
    emits: ['success', 'register'],
    setup(_, { emit }) {
      const isUpdate = ref(true)
      const ProductFormSchema: FormSchema[] = [
        {
          field: 'productCode',
          label: '认证产品编码',
          component: 'Input',
          componentProps: {
            placeholder: '请输入认证产品名称',
          },
          required: true,
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
                  return Promise.reject(new Error('请输入认证产品编码'))
                }
                if (value) {
                  const params = {
                    code: value,
                    id: values.id,
                  }
                  return new Promise((resolve, reject) => {
                    checkCodeUnique(params).then((res) => {
                      if (res.data === true) {
                        resolve()
                      } else {
                        reject(new Error('认证产品编码已存在'))
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
          field: 'productName',
          label: '认证产品名称',
          component: 'Input',
          componentProps: {
            placeholder: '请输入认证产品名称',
          },
          required: true,
          rules: [
            {
              trigger: 'blur',
              required: true,
              validator: (_, value) => {
                const values = getFieldsValue()
                if (!value) {
                  return Promise.reject(new Error('请输入认证产品名称'))
                }
                if (value) {
                  const params = {
                    name: value,
                    id: values.id,
                  }
                  return new Promise((resolve, reject) => {
                    checkNameUnique(params).then((res) => {
                      if (res.data === true) {
                        resolve()
                      } else {
                        reject(new Error('认证产品名称已存在'))
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
          field: 'id',
          label: 'id',
          component: 'Input',
          ifShow: false,
        },
      ]
      const [
        registerForm,
        { resetFields, setFieldsValue, updateSchema, validate, getFieldsValue },
      ] = useForm({
        labelWidth: 140,
        baseColProps: { span: 20 },
        schemas: ProductFormSchema,
        showActionButtonGroup: false,
      })

      const [registerModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
        resetFields()

        setModalProps({ confirmLoading: false })
        isUpdate.value = !!data?.isUpdate

        if (unref(isUpdate)) {
          updateSchema([
            {
              field: 'id',
            },
          ])
          setFieldsValue({
            ...data.record,
          })
        }
      })

      const getTitle = computed(() => (!unref(isUpdate) ? '新增认证产品' : '编辑认证产品'))

      async function handleSubmit() {
        try {
          const values = await validate()
          setModalProps({ confirmLoading: true })
          if (values.id) {
            updateProduct(values).then(() => {
              createMessage.success('修改成功')
              closeModal()
              emit('success')
            })
          } else {
            addProduct(values).then(() => {
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
