<template>
  <PageWrapper dense contentFullHeight contentClass="flex">
    <DeptTree class="w-1/4 xl:w-1/5" @select="handleSelect" />
    <BasicTable
      @register="registerTable"
      class="w-3/4 xl:w-4/5"
      @change="onChange"
      :pagination="pagination"
    >
      <template #toolbar>
        <a-button type="primary" @click="handleCreate">新增账号</a-button>
      </template>
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'action'">
          <TableAction
            :actions="[
              {
                icon: 'clarity:note-edit-line',
                tooltip: '编辑用户资料',
                onClick: handleEdit.bind(null, record),
              },
              {
                icon: 'ant-design:delete-outlined',
                color: 'error',
                tooltip: '删除此账号',
                popConfirm: {
                  title: '是否确认删除',
                  placement: 'left',
                  confirm: handleDelete.bind(null, record),
                },
              },
              {
                icon: 'ant-design:unlock-outlined',
                tooltip: '账号解锁',
                onClick: handleUnlock.bind(null, record),
              },
            ]"
          />
        </template>
      </template>
    </BasicTable>
    <AccountModal @register="registerModal" @success="handleSuccess" />
  </PageWrapper>
</template>
<script lang="ts" setup>
  import { onMounted, ref } from 'vue'
  import { getAccountList, deleteAccount, updateAccount } from '/@/api/sys/account'
  import { BasicTable, useTable, TableAction } from '/@/components/Table'
  import { PageWrapper } from '/@/components/Page'
  import DeptTree from './DeptTree.vue'

  import { useModal } from '/@/components/Modal'
  import AccountModal from './AccountModal.vue'

  import { columns, searchFormSchema } from './account.data'
  import { useMessage } from '/@/hooks/web/useMessage'

  const { createMessage } = useMessage()
  const [registerModal, { openModal }] = useModal()
  const dataSource = ref()
  const pagination = ref({
    pageSize: 10,
    pageSizeOptions: ['10', '20', '50', '100', '200'],
    current: 1,
    total: 0,
  })
  const [registerTable, { setPagination, setLoading, getForm }] = useTable({
    title: '用户列表',
    columns,
    formConfig: {
      labelWidth: 120,
      schemas: searchFormSchema,
      autoSubmitOnEnter: true,
    },
    pagination: true,
    resizeHeightOffset: 40,
    useSearchForm: true,
    showTableSetting: false,
    bordered: true,
    showIndexColumn: false,
    handleSearchInfoFn() {
      queryUserList()
    },
    actionColumn: {
      width: 120,
      title: '操作',
      dataIndex: 'action',
      fixed: 'right',
    },
    dataSource,
  })
  onMounted(() => {
    queryUserList()
  })
  const queryUserList = (deptIds?) => {
    const { current, pageSize } = pagination.value
    const info = getForm().getFieldsValue()
    const params = {
      page: current,
      pageSize,
      ...info,
      ...deptIds,
    }
    setLoading(true)
    getAccountList(params)
      .then((res) => {
        dataSource.value = res?.data.list || []
        setPagination({ ...pagination.value, total: res?.data.total || 0 })
      })
      .finally(() => {
        setLoading(false)
      })
  }
  const handleCreate = () => {
    openModal(true, {
      isUpdate: false,
    })
  }

  const handleEdit = (record: Recordable) => {
    openModal(true, {
      record,
      isUpdate: true,
    })
  }

  const handleDelete = (record: Recordable) => {
    deleteAccount(record.id).then(() => {
      createMessage.success('删除成功')
      queryUserList()
    })
  }

  const handleSuccess = () => {
    queryUserList()
  }

  const handleSelect = (deptIds) => {
    queryUserList({ deptIds })
  }

  const onChange = ({ current, pageSize }) => {
    pagination.value.current = current
    pagination.value.pageSize = pageSize
    queryUserList()
  }
  const handleUnlock = (record: Recordable) => {
    const params = {
      id: record.id,
      notes: 0,
    }
    updateAccount(params).then(() => {
      createMessage.success('操作成功')
      queryUserList()
    })
  }
</script>
