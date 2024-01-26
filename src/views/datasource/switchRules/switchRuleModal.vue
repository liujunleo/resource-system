<template>
  <BasicModal
    v-bind="$attrs"
    @register="registerModal"
    :maskClosable="false"
    :title="getTitle"
    @ok="handleSubmit"
  >
    <BasicForm @register="registerForm">
      <template #errorRule="{ model, field }">
        <a-tabs v-model:activeKey="activeKey" type="card">
          <a-tab-pane key="1" tab="连续失败"
            ><a-input-number v-model:value="model[field]" :min="0"
          /></a-tab-pane>
        </a-tabs>
      </template>
    </BasicForm>
  </BasicModal>
</template>
<script lang="ts">
  import { defineComponent, ref, computed, unref } from 'vue'
  import { BasicModal, useModalInner } from '/@/components/Modal'
  import { BasicForm, useForm, FormSchema } from '/@/components/Form/index'

  import {
    addSwitchRule,
    checkDataSourceProductUnique,
    checkSwitchRuleNameUnique,
    updateSwitchRule,
  } from '/@/api/datasource/switchRule'
  import { useMessage } from '/@/hooks/web/useMessage'
  import { getDataSourceOptions } from '@/api/datasource/basic'
  import { getProductOptions } from '@/api/productManagement'

  const { createMessage } = useMessage()
  export default defineComponent({
    name: 'ProductModal',
    components: { BasicModal, BasicForm },
    emits: ['success', 'register'],
    setup(_, { emit }) {
      const activeKey = ref('1')
      const isUpdate = ref(true)
      const switchRuleDetail = ref()
      const switchRulesFormSchema: FormSchema[] = [
        {
          field: 'id',
          label: 'id',
          component: 'Input',
          ifShow: false,
        },
        {
          field: 'switchRuleName',
          label: '切换规则名称',
          component: 'Input',
          componentProps: {
            placeholder: '请输入切换规则名称',
          },
          rules: [
            {
              trigger: 'blur',
              required: true,
              validator: (_, value) => {
                const values = getFieldsValue()
                if (!value) {
                  return Promise.reject(new Error('请输入名称'))
                }
                if (value) {
                  const params = {
                    name: value,
                    id: values.id,
                  }
                  return new Promise((resolve, reject) => {
                    checkSwitchRuleNameUnique(params).then((res) => {
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
          field: 'productId',
          label: '认证产品',
          component: 'ApiSelect',
          componentProps: {
            api: getProductOptions,
            labelField: 'name',
            valueField: 'id',
            resultField: 'data',
            placeholder: '请选择认证产品',
          },
          rules: [
            {
              trigger: 'blur',
              required: true,
              validator: (_, value) => {
                const values = getFieldsValue()
                if (!value) {
                  return Promise.reject(new Error('请选择产品'))
                }
                if (value && values.dataSourceId) {
                  // validateFields(['dataSourceId'])
                  const params = {
                    dsId: values.dataSourceId,
                    id: values.id,
                    productId: value,
                  }
                  return new Promise((resolve, reject) => {
                    checkDataSourceProductUnique(params).then((res) => {
                      if (res.data === true) {
                        clearValidate('dataSourceId')
                        resolve()
                      } else {
                        reject(new Error('数据源与产品组合已存在'))
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
          componentProps: {
            api: getDataSourceOptions,
            labelField: 'name',
            valueField: 'id',
            resultField: 'data',
            placeholder: '请选择数据源',
          },
          rules: [
            {
              trigger: 'blur',
              required: true,
              validator: (_, value) => {
                const values = getFieldsValue()
                if (!value) {
                  return Promise.reject(new Error('请选择数据源'))
                }
                if (value && values.productId) {
                  const params = {
                    dsId: value,
                    id: values.id,
                    productId: values.productId,
                  }
                  return new Promise((resolve, reject) => {
                    checkDataSourceProductUnique(params).then((res) => {
                      if (res.data === true) {
                        clearValidate('productId')
                        resolve()
                      } else {
                        reject(new Error('数据源与产品组合已存在'))
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
          field: 'switchRuleDetail',
          label: '切换规则',
          component: 'Input',
          slot: 'errorRule',
          required: true,
          defaultValue: '1',
        },
      ]
      const [
        registerForm,
        { resetFields, getFieldsValue, setFieldsValue, clearValidate, updateSchema, validate },
      ] = useForm({
        labelWidth: 120,
        baseColProps: { span: 22 },
        schemas: switchRulesFormSchema,
        showActionButtonGroup: false,
      })

      const [registerModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
        resetFields()
        setModalProps({ confirmLoading: false })
        isUpdate.value = !!data?.isUpdate
        if (unref(isUpdate)) {
          switchRuleDetail.value = data.record.switchRuleDetail
          setFieldsValue({
            switchRuleDetail,
            ...data.record,
          })
          updateSchema({
            field: 'id',
          })
        }
      })

      const getTitle = computed(() => (!unref(isUpdate) ? '新增切换规则' : '编辑切换规则'))

      async function handleSubmit() {
        try {
          const values = await validate()
          setModalProps({ confirmLoading: true })
          if (values.id) {
            updateSwitchRule(values).then(() => {
              createMessage.success('修改成功')
              closeModal()
              emit('success')
            })
          } else {
            addSwitchRule(values).then(() => {
              createMessage.success('新增成功')
              closeModal()
              emit('success')
            })
          }
        } finally {
          setModalProps({ confirmLoading: false })
        }
      }

      return { registerModal, registerForm, getTitle, handleSubmit, activeKey }
    },
  })
</script>
