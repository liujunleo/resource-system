<template>
  <BasicModal
    v-bind="$attrs"
    :maskClosable="false"
    @register="registerModal"
    :title="getTitle"
    @ok="handleSubmit"
  >
    <BasicForm @register="registerForm" />
  </BasicModal>
</template>
<script lang="ts">
  import { defineComponent, ref, computed, unref } from 'vue'
  import { BasicModal, useModalInner } from '/@/components/Modal'
  import { BasicForm, useForm } from '/@/components/Form/index'
  import { systemResponseCodeFormSchema } from './systemResponseCode.data'

  import {
    addSystemResponseCode,
    updateSystemResponseCode,
  } from '/@/api/datasource/systemResponseCode'
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
        schemas: systemResponseCodeFormSchema,
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

      const getTitle = computed(() => (!unref(isUpdate) ? '新增平台应答码' : '编辑平台应答码'))

      async function handleSubmit() {
        try {
          const values = await validate()
          setModalProps({ confirmLoading: true })
          if (values.id) {
            updateSystemResponseCode(values).then(() => {
              createMessage.success('修改成功')
              closeModal()
              emit('success')
            })
          } else {
            addSystemResponseCode(values).then(() => {
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
