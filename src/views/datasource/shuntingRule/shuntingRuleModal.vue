<template>
  <BasicModal
    v-bind="$attrs"
    @register="registerModal"
    :title="getTitle"
    @ok="handleSubmit"
    :maskClosable="false"
    width="45%"
  >
    <a-form
      ref="formRef"
      :model="formState"
      :rules="rules"
      :label-col="{ span: 8 }"
      :wrapper-col="{ span: 10 }"
    >
      <a-form-item label="分流规则名称" name="shuntingRuleName">
        <a-input v-model:value="formState.shuntingRuleName" placeholder="请输入分流规则名称" />
      </a-form-item>
      <a-form-item label="认证产品" name="productId">
        <a-select
          v-model:value="formState.productId"
          placeholder="请选择认证产品"
          :options="productOptions"
          :field-names="{ label: 'name', value: 'id' }"
          @change="handleProChange"
        />
      </a-form-item>
    </a-form>
    <BasicTable @register="registerModalTable">
      <template #toolbar>
        <a-button type="primary" @click="handleCreate"> 新增 </a-button>
      </template>
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'action'">
          <TableAction :actions="createActions(record)" />
        </template>
      </template>
    </BasicTable>
  </BasicModal>
</template>
<script lang="ts">
  import { defineComponent, ref, computed, unref, reactive } from 'vue'
  import type { UnwrapRef } from 'vue'
  import type { Rule } from 'ant-design-vue/es/form'
  import { BasicModal, useModalInner } from '/@/components/Modal'
  import {
    BasicTable,
    useTable,
    TableAction,
    ActionItem,
    EditRecordRow,
    BasicColumn,
  } from '/@/components/Table'

  import { getDataSourceInterfaceOptions } from '/@/api/datasource/interface'

  import {
    addShuntingRule,
    updateShuntingRule,
    getShuntingRuleById,
    checkShuntingRuleName,
    checkProduct,
  } from '/@/api/datasource/shuntingRule'
  import { useMessage } from '/@/hooks/web/useMessage'
  import { getProductOptions } from '/@/api/productManagement'

  const { createMessage } = useMessage()
  export default defineComponent({
    name: 'ShuntingRuleModal',
    components: { BasicModal, BasicTable, TableAction },
    emits: ['success', 'register'],
    setup(_, { emit }) {
      const isUpdate = ref(true)
      const currentEditKeyRef = ref('')
      const dataSource = ref([])
      const productOptions = ref()
      const interfaceOption = ref()

      const formRef = ref()
      interface FormState {
        id: string | undefined
        productId: number | string | undefined
        detailList: string[]
        shuntingRuleName: string | undefined
      }
      let formState: UnwrapRef<FormState> = reactive({
        id: undefined,
        productId: undefined,
        shuntingRuleName: undefined,
        detailList: [],
      })
      const checkProductId = async (_rule: Rule, value) => {
        if (!value) {
          return Promise.reject('请选择产品')
        }
        if (value) {
          const params = {
            productId: value,
            id: formState.id,
          }
          return new Promise<void>((resolve, reject) => {
            checkProduct(params).then((res) => {
              if (res.data === true) {
                resolve()
              } else {
                reject(new Error('产品重复'))
              }
            })
          })
        }
      }
      const checkName = async (_rule: Rule, value) => {
        if (!value) {
          return Promise.reject('请输入规则名称')
        }
        if (value) {
          const params = {
            name: value,
            id: formState.id,
          }
          return new Promise<void>((resolve, reject) => {
            checkShuntingRuleName(params).then((res) => {
              if (res.data === true) {
                resolve()
              } else {
                reject(new Error('名称已存在'))
              }
            })
          })
        }
      }
      const rules: Record<string, Rule[]> = {
        productId: [{ required: true, validator: checkProductId, trigger: 'blur' }],
        shuntingRuleName: [{ required: true, validator: checkName, trigger: 'blur' }],
      }

      // 弹窗的表格头信息
      const modalColumns: BasicColumn[] = [
        {
          title: '接口名称',
          dataIndex: 'dataSourceInterfaceId',
          editRow: true,
          editRule: true,
          editComponent: 'Select',
          editComponentProps: {
            options: interfaceOption,
          },
        },
        {
          title: '权重%',
          dataIndex: 'weight',
          helpMessage: '累计必须等于100',
          editRow: true,
          editRule: true,
          editComponent: 'InputNumber',
          editComponentProps: () => {
            return {
              max: 100,
              min: 0,
            }
          },
        },
      ]
      const [registerModalTable, { getDataSource }] = useTable({
        title: '分流规则',
        columns: modalColumns,
        useSearchForm: false,
        pagination: false,
        striped: false,
        showTableSetting: false,
        bordered: true,
        showIndexColumn: false,
        maxHeight: 190,
        actionColumn: {
          title: '操作',
          width: 150,
          dataIndex: 'action',
        },
        dataSource,
      })

      const [registerModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
        formRef.value.resetFields()
        setModalProps({ confirmLoading: false })
        getProductOption()
        isUpdate.value = !!data?.isUpdate
        if (unref(isUpdate)) {
          formState.productId = data.record.productId
          formState.shuntingRuleName = data.record.shuntingRuleName
          formState.id = data.record.id
          getInterfaceOption(data.record.productId)
          const editDetailList = await getDetailInfo(data.record.id)
          dataSource.value = editDetailList
        } else {
          dataSource.value = []
          formState.productId = undefined
          formState.id = undefined
          formState.shuntingRuleName = undefined
        }
      })

      const getTitle = computed(() => (!unref(isUpdate) ? '新增分流配置' : '编辑分流配置'))
      function getProductOption() {
        getProductOptions().then((res) => {
          productOptions.value = res.data
        })
      }
      function handleProChange(val) {
        getInterfaceOption(val)
      }
      function getInterfaceOption(value) {
        getDataSourceInterfaceOptions({ productId: value }).then((res) => {
          res.data.map((item) => {
            item.label = item.interfaceName
            item.value = item.id
          })
          interfaceOption.value = res.data
        })
      }

      function getDetailInfo(id) {
        return getShuntingRuleById(id).then((res) => {
          return res.data.detailList
        })
      }

      function handleSubmit() {
        formRef.value.validate().then((values) => {
          const detailList = getDataSource()

          if (detailList.length < 1) {
            createMessage.warn('至少添加一条分流规则')
            return
          }
          setModalProps({ confirmLoading: true })

          if (formState.id) {
            const { productId, shuntingRuleName } = values
            const params = {
              detailList: detailList,
              productId,
              shuntingRuleName,
              id: formState.id,
            }
            updateShuntingRule(params)
              .then(() => {
                createMessage.success('修改成功')
                closeModal()
                emit('success')
              })
              .finally(() => {
                setModalProps({ confirmLoading: false })
              })
          } else {
            const { productId, shuntingRuleName } = values
            const params = {
              detailList: detailList,
              productId,
              shuntingRuleName,
            }
            addShuntingRule(params)
              .then(() => {
                createMessage.success('新增成功')
                closeModal()
                emit('success')
              })
              .finally(() => {
                setModalProps({ confirmLoading: false })
              })
          }
        })
      }

      function handleCreate() {
        const data = getDataSource()
        const num = dataSource.value.length + 1
        let arr = {
          key: num,
          dataSourceInterfaceId: undefined,
          weight: undefined,
          editable: true,
        }

        data.push(arr)
      }

      function handleDelete(record) {
        const data = getDataSource()
        dataSource.value = data.filter((item) => item !== record)
      }

      function handleEdit(record: EditRecordRow) {
        currentEditKeyRef.value = record.key
        record.onEdit?.(true)
      }

      function handleCancel(record: EditRecordRow) {
        currentEditKeyRef.value = ''
        record.onEdit?.(false, false)
      }

      async function handleSave(record: EditRecordRow) {
        // 校验
        const valid = await record.onValid?.()
        if (valid) {
          // 校验保存之后提交编辑状态
          const pass = await record.onEdit?.(false, true)
          if (pass) {
            currentEditKeyRef.value = ''
          }
        } else {
          createMessage.error({ content: '不能为空', key: 'saving' })
        }
      }

      function createActions(record: EditRecordRow): ActionItem[] {
        if (!record.editable) {
          return [
            {
              label: '编辑',
              onClick: handleEdit.bind(null, record),
            },
            {
              label: '删除',
              onClick: handleDelete.bind(null, record),
            },
          ]
        }
        return [
          {
            label: '保存',
            onClick: handleSave.bind(null, record),
          },
          {
            label: '取消',
            popConfirm: {
              title: '是否取消编辑',
              confirm: handleCancel.bind(null, record),
            },
          },
        ]
      }

      return {
        registerModal,
        formState,
        formRef,
        rules,
        getTitle,
        registerModalTable,
        interfaceOption,
        productOptions,
        handleSubmit,
        handleCreate,
        handleDelete,
        getInterfaceOption,
        handleSave,
        createActions,
        handleProChange,
      }
    },
  })
</script>
