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
  import { DictTypeFormSchema } from './dict.data'

  import { addDictType, updateDictType } from '/@/api/sys/dict'
  import { useMessage } from '/@/hooks/web/useMessage'

  const { createMessage } = useMessage()
  export default defineComponent({
    name: 'DictTypeModal',
    components: { BasicModal, BasicForm },
    emits: ['success', 'register'],
    setup(_, { emit }) {
      const isUpdate = ref(true)

      const [registerForm, { resetFields, setFieldsValue, updateSchema, validate }] = useForm({
        labelWidth: 100,
        baseColProps: { span: 24 },
        schemas: DictTypeFormSchema,
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

      const getTitle = computed(() => (!unref(isUpdate) ? '新增字典类型' : '编辑字典类型'))

      async function handleSubmit() {
        try {
          const values = await validate()
          setModalProps({ confirmLoading: true })
          if (values.id) {
            updateDictType(values).then(() => {
              createMessage.success('修改成功')
              closeModal()
              emit('success')
            })
          } else {
            addDictType(values).then(() => {
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
