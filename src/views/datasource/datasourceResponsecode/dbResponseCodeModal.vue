<template>
  <BasicModal
    v-bind="$attrs"
    @register="registerModal"
    :maskClosable="false"
    :title="getTitle"
    @ok="handleSubmit"
  >
    <BasicForm @register="registerForm">
      <template #productId="{ model }"> {{ model.productId }} </template>
      <template #sysMessage="{ model }"> {{ model.sysMessage }} </template>
    </BasicForm>
  </BasicModal>
</template>
<script lang="ts">
  import { defineComponent, ref, computed, unref } from 'vue'
  import { BasicModal, useModalInner } from '/@/components/Modal'
  import { BasicForm, useForm } from '/@/components/Form/index'
  import { dbResponseCodeFormSchema } from './dbResponsecode.data'

  import {
    addDataSourceResponseCode,
    updateDataSourceResponseCode,
  } from '/@/api/datasource/dbResponseCode'
  import { useMessage } from '/@/hooks/web/useMessage'

  const { createMessage } = useMessage()
  export default defineComponent({
    name: 'DbRespondeCodeModal',
    components: { BasicModal, BasicForm },
    emits: ['success', 'register'],
    setup(_, { emit }) {
      const isUpdate = ref(true)
      const [registerForm, { resetFields, setFieldsValue, updateSchema, validate }] = useForm({
        labelWidth: 120,
        baseColProps: { span: 22 },
        schemas: dbResponseCodeFormSchema,
        showActionButtonGroup: false,
        colon: true,
      })

      const [registerModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
        resetFields()
        setModalProps({ confirmLoading: false })
        isUpdate.value = !!data?.isUpdate
        if (unref(isUpdate)) {
          setFieldsValue({
            productId: data.record.productName,
            ...data.record,
          })
          updateSchema({
            field: 'id',
          })
        }
      })

      const getTitle = computed(() => (!unref(isUpdate) ? '新增数据源应答码' : '编辑数据源应答码'))

      async function handleSubmit() {
        try {
          const values = await validate()
          setModalProps({ confirmLoading: true })
          if (values.id) {
            updateDataSourceResponseCode(values).then(() => {
              createMessage.success('修改成功')
              closeModal()
              emit('success')
            })
          } else {
            addDataSourceResponseCode(values).then(() => {
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
