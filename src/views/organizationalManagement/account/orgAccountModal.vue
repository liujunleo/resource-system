<template>
  <BasicModal
    v-bind="$attrs"
    @register="registerModal"
    width="60%"
    :title="getTitle"
    @ok="handleSubmit"
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
    addOrganization,
    updateOrganization,
    checkOrgCodeUnique,
    checkOrgAccountUnique,
    checkOrgNameUnique,
  } from '/@/api/organizationalManagement/index'
  import { useMessage } from '/@/hooks/web/useMessage'

  const { createMessage } = useMessage()
  export default defineComponent({
    name: 'ProductModal',
    components: { BasicModal, BasicForm },
    emits: ['success', 'register'],
    setup(_, { emit }) {
      const isUpdate = ref(true)
      const AccountFormSchema: FormSchema[] = [
        {
          field: 'id',
          label: 'id',
          component: 'Input',
          ifShow: false,
        },
        {
          field: 'orgCode',
          label: '机构编码',
          component: 'Input',
          required: true,
          rules: [
            {
              trigger: 'blur',
              required: true,
              validator: (_, value) => {
                const values = getFieldsValue()
                if (!value) {
                  return Promise.reject(new Error('请输入机构编码'))
                }
                if (value) {
                  const params = {
                    code: value,
                    id: values.id,
                  }
                  return new Promise((resolve, reject) => {
                    checkOrgCodeUnique(params).then((res) => {
                      if (res.data === true) {
                        resolve()
                      } else {
                        reject(new Error('机构编码已存在'))
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
          componentProps: {
            placeholder: '请输入机构编码',
          },
        },

        {
          field: 'orgName',
          label: '机构名称',
          component: 'Input',
          componentProps: {
            placeholder: '请输入机构名称',
          },
          rules: [
            {
              trigger: 'blur',
              required: true,
              validator: (_, value) => {
                const values = getFieldsValue()
                if (!value) {
                  return Promise.reject(new Error('请输入机构名称'))
                }
                if (value) {
                  const params = {
                    name: value,
                    id: values.id,
                  }
                  return new Promise((resolve, reject) => {
                    checkOrgNameUnique(params).then((res) => {
                      if (res.data === true) {
                        resolve()
                      } else {
                        reject(new Error('机构名称已存在'))
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
          field: 'orgAccount',
          label: '机构账号',
          component: 'Input',
          required: true,
          dynamicDisabled: ({ values }) => {
            return !!values.id
          },
          componentProps: {
            placeholder: '请输入机构账号',
          },
          rules: [
            {
              trigger: 'blur',
              required: true,
              validator: (_, value) => {
                const values = getFieldsValue()
                if (!value) {
                  return Promise.reject(new Error('请输入机构账号'))
                }
                if (value) {
                  const params = {
                    code: value,
                    id: values.id,
                  }
                  return new Promise((resolve, reject) => {
                    checkOrgAccountUnique(params).then((res) => {
                      if (res.data === true) {
                        resolve()
                      } else {
                        reject(new Error('机构账号已存在'))
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
          field: 'whitelist',
          label: 'IP白名单',
          component: 'Input',
          required: true,
          componentProps: {
            placeholder: '请输入ip白名单，多个IP请用,分隔',
          },
        },
        {
          field: 'secret',
          label: '密钥',
          component: 'Input',
          dynamicDisabled: true,
          ifShow: ({ values }) => {
            return !!values.id
          },
        },
        {
          field: 'contactName',
          label: '联系人',
          component: 'Input',
          componentProps: {
            placeholder: '请输入联系人',
          },
        },
        {
          field: 'telephone',
          label: '联系电话',
          component: 'Input',
          componentProps: {
            placeholder: '请输入联系电话',
          },
        },
        {
          field: 'address',
          label: '联系地址',
          component: 'Input',
          componentProps: {
            placeholder: '请输入联系地址',
          },
        },
        {
          field: 'state',
          label: '账号状态',
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
        labelWidth: 100,
        baseColProps: { lg: 12, md: 24 },
        schemas: AccountFormSchema,
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

      const getTitle = computed(() => (!unref(isUpdate) ? '新增机构账号' : '编辑机构账号'))

      async function handleSubmit() {
        try {
          const values = await validate()
          setModalProps({ confirmLoading: true })
          if (values.id) {
            updateOrganization(values).then(() => {
              createMessage.success('修改成功')
              closeModal()
              emit('success')
            })
          } else {
            addOrganization(values).then(() => {
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
