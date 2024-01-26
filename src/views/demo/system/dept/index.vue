<template>
  <div>
    <BasicTable @register="registerTable">
      <template #toolbar>
        <a-button type="primary" @click="handleCreate"> 新增部门 </a-button>
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
    <DeptModal @register="registerModal" @success="handleSuccess" />
  </div>
</template>
<script lang="ts">
  import { defineComponent, ref, onMounted } from 'vue'

  import { BasicTable, useTable, TableAction } from '/@/components/Table'
  import { deleteDept, getDeptList } from '/@/api/sys/dept'
  import { useMessage } from '/@/hooks/web/useMessage'

  import { useModal } from '/@/components/Modal'
  import DeptModal from './DeptModal.vue'

  import { columns, searchFormSchema } from './dept.data'

  export default defineComponent({
    name: 'DeptManagement',
    components: { BasicTable, DeptModal, TableAction },
    setup() {
      const dataSource = ref([])
      const [registerModal, { openModal }] = useModal()
      const { createMessage } = useMessage()
      const [registerTable, { setLoading }] = useTable({
        title: '部门列表',
        columns,
        formConfig: {
          labelWidth: 120,
          schemas: searchFormSchema,
        },
        handleSearchInfoFn(info) {
          queryDeptList(info)
        },
        pagination: false,
        striped: false,
        useSearchForm: true,
        showTableSetting: false,
        bordered: true,
        showIndexColumn: false,
        resizeHeightOffset: 20,
        actionColumn: {
          width: 80,
          title: '操作',
          dataIndex: 'action',
          // slots: { customRender: 'action' },
          fixed: undefined,
        },
        dataSource,
      })
      function handleCreate() {
        openModal(true, {
          isUpdate: false,
        })
      }
      onMounted(() => {
        queryDeptList()
      })
      function queryDeptList(info?) {
        const params = {
          ...info,
        }
        setLoading(true)
        getDeptList(params)
          .then((res) => {
            dataSource.value = res.data || []
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
        if (record.children?.length > 0) {
          createMessage.error('该部门下有子部门，无法删除')
          return
        } else {
          deleteDept(record.id).then((res) => console.log(res.data.msg))
          queryDeptList()
        }
      }

      function handleSuccess() {
        queryDeptList()
      }

      return {
        registerTable,
        registerModal,
        handleCreate,
        handleEdit,
        handleDelete,
        handleSuccess,
      }
    },
  })
</script>
