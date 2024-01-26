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
    <ResponseCodeModal @register="registerModal" @success="handleSuccess" />
  </div>
</template>
<script setup lang="ts">
  import { columns, searchFormSchema } from './dbResponsecode.data'
  import { BasicTable, useTable, TableAction } from '/@/components/Table'
  import { onMounted, ref } from 'vue'
  import {
    getDataSourceResponseCodeList,
    deleteDataSourceResponseCode,
  } from '/@/api/datasource/dbResponseCode'
  import { useModal } from '/@/components/Modal'
  import ResponseCodeModal from './dbResponseCodeModal.vue'
  import { useMessage } from '/@/hooks/web/useMessage'

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
    title: '数据源应答码',
    columns,
    formConfig: {
      labelWidth: 120,
      schemas: searchFormSchema,
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
      title: '操作',
      width: 80,
      dataIndex: 'action',
    },
    dataSource,
  })
  onMounted(() => {
    queryProductList()
  })
  const queryProductList = () => {
    const { current, pageSize } = pagination.value
    const data = getForm().getFieldsValue()
    const params = {
      page: current,
      pageSize,
      ...data,
    }
    setLoading(true)

    getDataSourceResponseCodeList(params)
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
    queryProductList()
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
    deleteDataSourceResponseCode(record.id).then(() => {
      createMessage.success('删除成功')
      queryProductList()
    })
  }
  const handleSuccess = () => {
    queryProductList()
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

    getDataSourceResponseCodeList(params)
      .then((res) => {
        dataSource.value = res.data?.list || []
        setPagination({ ...pagination.value, total: res?.data?.total || 0 })
      })
      .finally(() => {
        setLoading(false)
      })
  }
</script>
