<template>
  <BasicModal
    v-bind="$attrs"
    @register="registerModal"
    :maskClosable="false"
    :title="getTitle"
    @ok="handleSubmit"
  >
    <BasicForm @register="registerForm">
      <template #orgName="{ model }"> {{ model.orgName }} </template>
    </BasicForm>
  </BasicModal>
</template>
<script lang="ts">
  import { defineComponent, ref, computed, unref } from 'vue'
  import { BasicModal, useModalInner } from '/@/components/Modal'
  import { BasicForm, useForm } from '/@/components/Form/index'
  import { OrgProductFormSchema } from './orgProduct.data'

  import {
    addOrganizationProduct,
    updateOrganizationProduct,
  } from '/@/api/organizationalManagement/index'
  import { useMessage } from '/@/hooks/web/useMessage'

  const { createMessage } = useMessage()
  export default defineComponent({
    name: 'ProductModal',
    components: { BasicModal, BasicForm },
    emits: ['success', 'register'],
    setup(_, { emit }) {
      const isUpdate = ref(true)
      const [registerForm, { resetFields, setFieldsValue, updateSchema, validate }] = useForm({
        labelWidth: 120,
        baseColProps: { span: 22 },
        schemas: OrgProductFormSchema,
        showActionButtonGroup: false,
        colon: true,
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

      const getTitle = computed(() => (!unref(isUpdate) ? '新增机构产品' : '编辑机构产品'))

      async function handleSubmit() {
        try {
          const values = await validate()
          setModalProps({ confirmLoading: true })
          if (values.id) {
            updateOrganizationProduct(values).then(() => {
              createMessage.success('修改成功')
              closeModal()
              emit('success')
            })
          } else {
            addOrganizationProduct(values).then(() => {
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
