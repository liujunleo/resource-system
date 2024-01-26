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
    <BasicInfoModal @register="registerModal" @success="handleSuccess" />
  </div>
</template>
<script setup lang="ts">
  import { onMounted, ref } from 'vue'
  import { basicInfoColumns, searchBasicFormSchema } from './basic.data'
  import { BasicTable, useTable, TableAction } from '/@/components/Table'
  import { getDataSourceList, deleteDataSource } from '/@/api/datasource/basic'
  import { useMessage } from '/@/hooks/web/useMessage'
  import { useModal } from '/@/components/Modal'
  import BasicInfoModal from './dbBasicModal.vue'

  const dataSource = ref()
  const pagination = ref({
    pageSize: 10,
    pageSizeOptions: ['10', '20', '50', '100', '200'],
    current: 1,
    total: 0,
  })
  const { createMessage } = useMessage()
  const [registerModal, { openModal }] = useModal()
  const [registerTable, { setLoading, setPagination, getForm }] = useTable({
    title: '数据源',
    columns: basicInfoColumns,
    formConfig: {
      labelWidth: 120,
      schemas: searchBasicFormSchema,
      autoSubmitOnEnter: true,
    },
    handleSearchInfoFn(info) {
      handleSearch(info)
    },
    useSearchForm: true,
    pagination: true,
    striped: false,
    showTableSetting: false,
    bordered: true,
    showIndexColumn: false,
    resizeHeightOffset: 35,
    actionColumn: {
      width: 80,
      title: '操作',
      dataIndex: 'action',
      fixed: 'right',
    },
    dataSource,
  })
  onMounted(() => {
    queryDataList()
  })
  const queryDataList = () => {
    const { current, pageSize } = pagination.value
    const data = getForm().getFieldsValue()

    const params = {
      page: current,
      pageSize,
      ...data,
    }
    setLoading(true)

    getDataSourceList(params)
      .then((res) => {
        dataSource.value = res.data?.list || []
        setPagination({ ...pagination.value, total: res?.data?.total || 0 })
      })
      .finally(() => {
        setLoading(false)
      })
  }
  const onChange = ({ current, pageSize }) => {
    pagination.value.current = current
    pagination.value.pageSize = pageSize
    queryDataList()
  }
  const handleCreate = () => {
    openModal(true, {
      isUpdate: false,
    })
  }
  const handleEdit = (record) => {
    openModal(true, {
      record,
      isUpdate: true,
    })
  }
  const handleDelete = (record) => {
    deleteDataSource(record.id).then(() => {
      createMessage.success('删除成功')
      queryDataList()
    })
  }
  const handleSuccess = () => {
    queryDataList()
  }
  const handleSearch = (info) => {
    const { pageSize } = pagination.value
    pagination.value.current = 1
    const params = {
      ...info,
      page: pagination.value.current,
      pageSize,
    }
    setLoading(true)

    getDataSourceList(params)
      .then((res) => {
        dataSource.value = res.data?.list || []
        setPagination({ ...pagination.value, total: res?.data?.total || 0 })
      })
      .finally(() => {
        setLoading(false)
      })
  }
</script>
