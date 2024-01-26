<template>
  <div>
    <BasicTable @register="registerTable">
      <template #toolbar>
        <a-button type="primary" @click="handleCreate"> 新增角色 </a-button>
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
    <RoleModal @register="registerDrawer" @success="handleSuccess" />
  </div>
</template>
<script lang="ts">
  import { defineComponent, onMounted, ref } from 'vue'

  import { BasicTable, useTable, TableAction } from '/@/components/Table'

  import { useModal } from '/@/components/Modal'
  import RoleModal from './RoleModal.vue'

  import { columns, searchFormSchema } from './role.data'
  import { getRoleList, deleteRole } from '/@/api/sys/role'
  import { useMessage } from '/@/hooks/web/useMessage'

  export default defineComponent({
    name: 'RoleManagement',
    components: { BasicTable, RoleModal, TableAction },
    setup() {
      const dataSource = ref()
      const { createMessage } = useMessage()

      const [registerDrawer, { openModal }] = useModal()
      const [registerTable, { setLoading }] = useTable({
        title: '角色列表',
        columns,
        formConfig: {
          labelWidth: 120,
          schemas: searchFormSchema,
        },
        handleSearchInfoFn(info) {
          queryRoleList(info)
        },
        useSearchForm: true,
        showTableSetting: false,
        bordered: true,
        showIndexColumn: false,
        pagination: false,
        actionColumn: {
          width: 80,
          title: '操作',
          dataIndex: 'action',
          // slots: { customRender: 'action' },
          fixed: 'right',
        },
        dataSource,
      })

      onMounted(() => {
        queryRoleList()
      })
      function queryRoleList(info?) {
        const params = {
          ...info,
        }
        setLoading(true)
        getRoleList(params)
          .then((res) => {
            dataSource.value = res?.data.list || []
          })
          .finally(() => {
            setLoading(false)
          })
      }
      function handleCreate() {
        openModal(true, {
          isUpdate: false,
        })
      }

      function handleEdit(record: Recordable) {
        openModal(true, {
          record,
          isUpdate: true,
        })
      }

      function handleDelete(record: Recordable) {
        deleteRole(record.id).then(() => {
          createMessage.success('删除成功')
          queryRoleList()
        })
      }

      function handleSuccess() {
        queryRoleList()
      }

      return {
        registerTable,
        registerDrawer,
        handleCreate,
        handleEdit,
        handleDelete,
        handleSuccess,
      }
    },
  })
</script>
