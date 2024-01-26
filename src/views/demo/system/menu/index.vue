<template>
  <div>
    <BasicTable @register="registerTable">
      <template #toolbar>
        <a-button type="primary" @click="handleCreate"> 新增菜单 </a-button>
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
    <MenuModal @register="registerModal" @success="handleSuccess" />
  </div>
</template>
<script lang="ts" setup>
  import { getMenuList, deleteMenu } from '/@/api/sys/menu'

  import { useModal } from '/@/components/Modal'
  import MenuModal from './MenuModal.vue'

  import { columns, searchFormSchema } from './menu.data'
  import { BasicTable, TableAction, useTable } from '/@/components/Table'
  import { onMounted, ref } from 'vue'
  import { useMessage } from '/@/hooks/web/useMessage'

  const { createMessage } = useMessage()
  const menuList = ref()
  const dataSource = ref()
  const [registerModal, { openModal }] = useModal()

  const [registerTable, { setLoading }] = useTable({
    title: '菜单列表',
    columns,
    formConfig: {
      labelWidth: 120,
      schemas: searchFormSchema,
      autoSubmitOnEnter: true,
    },
    handleSearchInfoFn(info) {
      queryMenuList(info)
    },
    useSearchForm: true,
    pagination: false,
    striped: false,
    showTableSetting: false,
    bordered: true,
    showIndexColumn: false,
    actionColumn: {
      width: 80,
      title: '操作',
      dataIndex: 'action',
      fixed: 'right',
    },
    dataSource,
  })

  onMounted(() => {
    queryMenuList()
  })
  const queryMenuList = (info?) => {
    const params = {
      ...info,
    }
    setLoading(true)
    getMenuList(params)
      .then((res) => {
        dataSource.value = res.data
        menuList.value = res.data
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
    deleteMenu(record.id).then((res) => {
      createMessage.success(res.data.message)
      queryMenuList()
    })
  }

  const handleSuccess = () => {
    queryMenuList()
  }
</script>
