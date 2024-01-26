<template>
  <div>
    <BasicTable @register="registerTable" @change="onChange">
      <template #toolbar>
        <a-button type="primary" @click="handleCreate"> 新增字典类型 </a-button>
      </template>
      <template #bodyCell="{ column, record }">
        <template v-if="column.dataIndex === 'dictTypeName'">
          <a @click="goDictList(record)"> {{ record.dictTypeName }}</a>
        </template>
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
    <DictTypeModal @register="registerModal" @success="handleSuccess" />
  </div>
</template>
<script lang="ts">
  import { defineComponent, ref, onMounted } from 'vue'

  import { BasicTable, useTable, TableAction } from '/@/components/Table'
  import { deleteDictType, getDictTypeList } from '/@/api/sys/dict'

  import { useModal } from '/@/components/Modal'
  import DictTypeModal from './DictTypeModal.vue'

  import { dictTypeColumns, searchDictTypeFormSchema } from './dict.data'
  import { useRouter } from 'vue-router'
  import { useMessage } from '/@/hooks/web/useMessage'

  export default defineComponent({
    name: 'DictManagement',
    components: { BasicTable, DictTypeModal, TableAction },
    setup() {
      const dataSource = ref([])
      const router = useRouter()
      const { createMessage } = useMessage()
      const pagination = ref({
        pageSize: 10,
        pageSizeOptions: ['10', '20', '50', '100', '200'],
        current: 1,
        total: 0,
      })
      const [registerModal, { openModal }] = useModal()
      const [registerTable, { setLoading, setPagination, getForm }] = useTable({
        title: '字典类型',
        columns: dictTypeColumns,
        formConfig: {
          labelWidth: 120,
          schemas: searchDictTypeFormSchema,
        },
        handleSearchInfoFn() {
          queryDictTypeList()
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
        queryDictTypeList()
      })
      function queryDictTypeList() {
        const { current, pageSize } = pagination.value
        const data = getForm().getFieldsValue()
        const params = {
          ...data,
          page: current,
          pageSize,
        }
        setLoading(true)
        getDictTypeList(params)
          .then((res) => {
            dataSource.value = res.data.list || []
            setPagination({ ...pagination.value, total: res?.data.total || 0 })
          })
          .finally(() => {
            setLoading(false)
          })
      }
      function handleEdit(record: Recordable) {
        openModal(true, {
          record,
          isUpdate: true,
        })
      }

      function handleDelete(record: Recordable) {
        deleteDictType(record.id).then(() => {
          createMessage.success('删除成功')
          queryDictTypeList()
        })
      }

      function handleSuccess() {
        queryDictTypeList()
      }
      function goDictList(record: Recordable) {
        router.push({
          path: '/demo/system/dict/dictList',
          query: { id: record.id },
        })
      }
      function onChange({ current, pageSize }) {
        pagination.value.current = current
        pagination.value.pageSize = pageSize
        queryDictTypeList()
      }
      return {
        registerTable,
        registerModal,
        handleCreate,
        handleEdit,
        handleDelete,
        handleSuccess,
        goDictList,
        onChange,
      }
    },
  })
</script>
