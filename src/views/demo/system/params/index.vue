<template>
  <div>
    <BasicTable @register="registerTable" @change="onChange">
      <template #toolbar>
        <a-button type="primary" @click="handleCreate"> 新增 </a-button>
      </template>
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'action'">
          <TableAction
            :actions="[
              {
                icon: 'clarity:note-edit-line',
                onClick: handleEdit.bind(null, record),
              },
              {
                icon: 'ant-design:delete-outlined',
                color: 'error',
                popConfirm: {
                  title: '是否确认删除',
                  placement: 'left',
                  confirm: handleDelete.bind(null, record),
                },
              },
            ]"
          />
        </template>
      </template>
    </BasicTable>
    <ParamsModal @register="registerModal" @success="handleSuccess" />
  </div>
</template>
<script lang="ts">
  import { defineComponent, ref, onMounted } from 'vue'

  import { BasicTable, useTable, TableAction } from '/@/components/Table'
  import { deleteParameter, getParameterList } from '/@/api/sys/parameter'

  import { useModal } from '/@/components/Modal'
  import ParamsModal from './paramsModal.vue'

  import { columns, searchFormSchema } from './params.data'
  import { useMessage } from '/@/hooks/web/useMessage'

  export default defineComponent({
    name: 'ParamsManagement',
    components: { BasicTable, ParamsModal, TableAction },
    setup() {
      const dataSource = ref([])
      const { createMessage } = useMessage()
      const pagination = ref({
        pageSize: 10,
        pageSizeOptions: ['10', '20', '50', '100', '200'],
        current: 1,
        total: 0,
      })
      const [registerModal, { openModal }] = useModal()
      const [registerTable, { setLoading, setPagination, getForm }] = useTable({
        title: '参数列表',
        columns: columns,
        formConfig: {
          labelWidth: 120,
          schemas: searchFormSchema,
        },
        handleSearchInfoFn(info) {
          handleSearch(info)
        },
        pagination: true,
        striped: false,
        useSearchForm: true,
        showTableSetting: false,
        bordered: true,
        showIndexColumn: false,
        resizeHeightOffset: 35,
        actionColumn: {
          width: 80,
          title: '操作',
          dataIndex: 'action',
          // slots: { customRender: 'action' },
          fixed: 'right',
        },
        dataSource,
      })
      function handleCreate() {
        openModal(true, {
          isUpdate: false,
        })
      }
      onMounted(() => {
        queryParameterList()
      })
      function queryParameterList() {
        const { current, pageSize } = pagination.value
        const data = getForm().getFieldsValue()
        const params = {
          ...data,
          page: current,
          pageSize,
        }
        setLoading(true)
        getParameterList(params)
          .then((res) => {
            dataSource.value = res.data.list || []
            setPagination({ ...pagination.value, total: res?.data.total || 0 })
          })
          .finally(() => {
            setLoading(false)
          })
      }
      function handleEdit(record) {
        openModal(true, {
          record,
          isUpdate: true,
        })
      }

      function handleDelete(record) {
        deleteParameter(record.id).then(() => {
          createMessage.success('删除成功')
          queryParameterList()
        })
      }

      function handleSuccess() {
        queryParameterList()
      }
      function onChange({ current, pageSize }) {
        pagination.value.current = current
        pagination.value.pageSize = pageSize
        queryParameterList()
      }
      function handleSearch(info) {
        const { pageSize } = pagination.value
        pagination.value.current = 1
        const params = {
          ...info,
          page: pagination.value.current,
          pageSize,
        }
        setLoading(true)

        getParameterList(params)
          .then((res) => {
            dataSource.value = res.data?.list || []
            setPagination({ ...pagination.value, total: res?.data?.total || 0 })
          })
          .finally(() => {
            setLoading(false)
          })
      }
      return {
        registerTable,
        registerModal,
        handleCreate,
        handleEdit,
        handleDelete,
        handleSuccess,
        onChange,
        handleSearch,
      }
    },
  })
</script>
