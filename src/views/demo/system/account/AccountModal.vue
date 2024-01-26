<template>
  <BasicModal
    v-bind="$attrs"
    @register="registerModal"
    width="60%"
    :title="getTitle"
    :maskClosable="false"
    @ok="handleSubmit"
  >
    <BasicForm @register="registerForm" />
  </BasicModal>
</template>
<script lang="ts">
  import { defineComponent, ref, computed, unref } from 'vue'
  import { BasicModal, useModalInner } from '/@/components/Modal'
  import { BasicForm, useForm } from '/@/components/Form/index'
  import { accountFormSchema } from './account.data'
  import { getDeptList } from '/@/api/sys/dept'
  import { updateAccount, addAccount, getAccountById } from '/@/api/sys/account'
  import { useMessage } from '/@/hooks/web/useMessage'

  export default defineComponent({
    name: 'AccountModal',
    components: { BasicModal, BasicForm },
    emits: ['success', 'register'],
    setup(_, { emit }) {
      const { createMessage } = useMessage()
      const isUpdate = ref(true)

      const [registerForm, { setFieldsValue, updateSchema, resetFields, validate }] = useForm({
        labelWidth: 100,
        baseColProps: { lg: 12, md: 24 },
        schemas: accountFormSchema,
        showActionButtonGroup: false,
        actionColOptions: {
          span: 23,
        },
      })

      const [registerModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
        resetFields()
        setModalProps({ confirmLoading: false })
        isUpdate.value = !!data?.isUpdate

        if (unref(isUpdate)) {
          const info = await queryRoleByUserId(data.record.id)
          setFieldsValue({
            deptIds: info.deptIds[0],
            id: info.id,
            username: info.username,
            email: info.email,
            nickname: info.nickname,
            remark: info.remark,
            roleIds: info.roleIds[0],
            state: info.state,
          })
        }

        const treeData = await queryDeptList()
        updateSchema([
          {
            field: 'id',
          },
          {
            field: 'deptIds',
            componentProps: { treeData },
          },
        ])
      })

      const getTitle = computed(() => (!unref(isUpdate) ? '新增账号' : '编辑账号'))
      function queryRoleByUserId(id) {
        return getAccountById(id).then((res) => {
          return res.data
        })
      }
      function queryDeptList() {
        return getDeptList({}).then((res) => {
          return res.data
        })
      }
      async function handleSubmit() {
        try {
          const values = await validate()
          setModalProps({ confirmLoading: true })
          if (values.id) {
            const {
              deptIds,
              email,
              id,
              nickname,
              remark,
              roleIds,
              state,
              username,
              updatePassword,
            } = values
            const params = {
              deptIds: [deptIds],
              email,
              id,
              nickname,
              remark,
              roleIds: [roleIds],
              state,
              username,
              password: updatePassword,
            }
            updateAccount(params).then(() => {
              createMessage.success('修改成功')
              closeModal()
              emit('success')
            })
          } else {
            const { deptIds, email, nickname, password, remark, roleIds, state, username } = values
            const params = {
              deptIds: [deptIds],
              email,
              nickname,
              password,
              remark,
              roleIds: [roleIds],
              state,
              username,
            }
            addAccount(params).then(() => {
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
