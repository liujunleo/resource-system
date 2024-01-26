<template>
  <div>
    <BasicTable @register="registerTable" @change="onChange" />
  </div>
</template>
<script setup lang="ts">
  import { getOperationLogList } from '/@/api/sys/log'

  import { columns, searchFormSchema } from './log.data'
  import { BasicTable, useTable } from '/@/components/Table'
  import { onMounted, ref } from 'vue'

  const dataSource = ref()
  const pagination = ref({
    pageSize: 10,
    pageSizeOptions: ['10', '20', '50', '100', '200'],
    current: 1,
    total: 0,
  })
  const [registerTable, { setLoading, setPagination, getForm }] = useTable({
    title: '操作日志',
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
    resizeHeightOffset: 20,
    dataSource,
  })
  onMounted(() => {
    queryLogList()
  })
  const queryLogList = () => {
    const { current, pageSize } = pagination.value
    const data = getForm().getFieldsValue()
    const params = {
      ...data,
      page: current,
      pageSize,
    }
    setLoading(true)
    getOperationLogList(params)
      .then((res) => {
        dataSource.value = res.data.list
        setPagination({ ...pagination.value, total: res?.data.total || 0 })
      })
      .finally(() => {
        setLoading(false)
      })
  }
  const onChange = ({ current, pageSize }) => {
    pagination.value.current = current
    pagination.value.pageSize = pageSize
    queryLogList()
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

    getOperationLogList(params)
      .then((res) => {
        dataSource.value = res.data?.list || []
        setPagination({ ...pagination.value, total: res?.data?.total || 0 })
      })
      .finally(() => {
        setLoading(false)
      })
  }
</script>
