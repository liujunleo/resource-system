<template>
  <BasicModal
    title="调用状态类型详细"
    v-bind="$attrs"
    width="90%"
    @register="register"
    cancelText="关闭"
    :showOkBtn="false"
    @visible-change="openChange"
  >
    <BasicTable @register="registerTable" @change="onChange" />
  </BasicModal>
</template>
<script setup lang="ts">
  import { ref, nextTick } from 'vue'
  import { BasicModal, useModalInner } from '/@/components/Modal'
  import { BasicTable, useTable } from '/@/components/Table'
  import { detailColumns } from './data'
  import { getListOrgReturnDaily } from '/@/api/monitor/index'

  const [register, { setModalProps }] = useModalInner((data) => {
    recordParams.value = data
    setModalProps({
      title: `${data.statDate} ${data.orgName}${data.productName}调用分析（成功：${data.successTimes}次、失败：${data.failTimes}次）`,
    })
  })
  const recordParams = ref()
  const dataSource = ref()
  const pagination = ref({
    pageSize: 200,
    pageSizeOptions: ['10', '20', '50', '100', '200'],
    current: 1,
    total: 0,
  })
  const [registerTable, { setLoading, setPagination }] = useTable({
    columns: detailColumns,
    handleSearchInfoFn(info) {
      handleSearch(info)
    },
    maxHeight: 320,
    useSearchForm: false,
    pagination: true,
    striped: false,
    showTableSetting: false,
    bordered: true,
    showIndexColumn: false,
    resizeHeightOffset: 35,
    dataSource,
  })

  const openChange = (visible) => {
    if (visible) {
      nextTick(() => {
        queryList()
      })
    }
  }

  const queryList = () => {
    const { current, pageSize } = pagination.value
    const params = {
      page: current,
      pageSize,
      sorts: 'rxCode asc,rzCode asc',
      orgId: recordParams.value.orgId,
      productId: recordParams.value.productId,
      startDateStr: formatDate(`${recordParams.value.statDate}01`),
      endDateStr: formatDate(`${recordParams.value.statDate}31`),
    }
    setLoading(true)
    getListOrgReturnDaily(params)
      .then((res) => {
        dataSource.value = res.data.list || []
        setPagination({ ...pagination.value, total: res?.data.total || 0 })
      })
      .finally(() => {
        setLoading(false)
      })
  }
  const onChange = ({ current, pageSize }) => {
    pagination.value.current = current
    pagination.value.pageSize = pageSize
    queryList()
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

    getListOrgReturnDaily(params)
      .then((res) => {
        dataSource.value = res.data?.list || []
        setPagination({ ...pagination.value, total: res?.data?.total || 0 })
      })
      .finally(() => {
        setLoading(false)
      })
  }
  function formatDate(dateStr) {
    return dateStr.slice(0, 4) + '-' + dateStr.slice(4, 6) + '-' + dateStr.slice(6)
  }
</script>
