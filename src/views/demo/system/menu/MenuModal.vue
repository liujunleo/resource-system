<template>
  <BasicModal
    v-bind="$attrs"
    @register="registerModal"
    showFooter
    :title="getTitle"
    width="50%"
    :maskClosable="false"
    @ok="handleSubmit"
  >
    <BasicForm @register="registerForm" />
  </BasicModal>
</template>
<script lang="ts">
  import { defineComponent, ref, computed, unref } from 'vue'
  import { BasicForm, useForm } from '/@/components/Form/index'
  import { menuFormSchema } from './menu.data'
  import { BasicModal, useModalInner } from '/@/components/Modal'

  import { getMenuList, addMenu, updateMenu } from '/@/api/sys/menu'
  import { useMessage } from '/@/hooks/web/useMessage'

  export default defineComponent({
    name: 'MenuModal',
    components: { BasicModal, BasicForm },
    emits: ['success', 'register'],
    setup(_, { emit }) {
      const { createMessage } = useMessage()
      const isUpdate = ref(true)

      const [registerForm, { resetFields, setFieldsValue, updateSchema, validate }] = useForm({
        labelWidth: 100,
        schemas: menuFormSchema,
        showActionButtonGroup: false,
        baseColProps: { lg: 12, md: 24 },
      })

      const [registerModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
        resetFields()
        setModalProps({ confirmLoading: false })
        isUpdate.value = !!data?.isUpdate

        if (unref(isUpdate)) {
          setFieldsValue({
            ...data.record,
          })
        }
        const treeData = await queryMenuList()
        updateSchema({
          field: 'parentId',
          componentProps: { treeData },
        })
      })

      const getTitle = computed(() => (!unref(isUpdate) ? '新增菜单' : '编辑菜单'))

      function queryMenuList() {
        return getMenuList({}).then((res) => {
          return res.data
        })
      }

      async function handleSubmit() {
        try {
          const values = await validate()
          setModalProps({ confirmLoading: true })

          if (values.id) {
            updateMenu(values).then(() => {
              createMessage.success('修改菜单成功')
              closeModal()
              emit('success')
            })
          } else {
            addMenu(values).then(() => {
              createMessage.success('新增菜单成功')
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
