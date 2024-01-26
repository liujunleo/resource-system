<template>
  <div class="flow-content">
    <a-form ref="formRef" class="search-item" :label-col="labelCol">
      <a-form-item label="数据源">
        <a-select
          v-model:value="dsId"
          placeholder="请选择数据源"
          allowClear
          :options="dsOptions"
          :field-names="{ label: 'name', value: 'id' }"
        />
      </a-form-item>
      <a-form-item label="机构">
        <a-select
          v-model:value="orgAccount"
          placeholder="请选择机构"
          allowClear
          :options="orgOptions"
          :field-names="{ label: 'orgName', value: 'orgAccount' }"
        />
      </a-form-item>
      <a-form-item label="产品">
        <a-select
          v-model:value="productId"
          placeholder="请选择产品"
          allowClear
          :options="proOptions"
          :field-names="{ label: 'name', value: 'id' }"
        />
      </a-form-item>
      <a-form-item label="日期范围">
        <a-range-picker
          format="YYYY-MM-DD"
          :value="hackValue || dateValue"
          :disabled-date="disabledDate"
          @change="onDateChange"
          @openChange="onOpenChange"
          @calendarChange="onCalendarChange"
        />
      </a-form-item>
      <a-form-item class="btn-item">
        <a-button @click="reload">重置</a-button>
      </a-form-item>
      <a-form-item>
        <a-button type="primary" @click="query">查询</a-button>
      </a-form-item>
    </a-form>
    <BasicTable @register="registerTable" @change="onChange" />
  </div>
</template>
<script setup lang="ts">
  import { getDataSourceFlow } from '/@/api/monitor'

  import { columns } from './orgFlowInfo.data'
  import { BasicTable, useTable } from '/@/components/Table'
  import { onMounted, ref } from 'vue'
  import dayjs, { Dayjs } from 'dayjs'
  import { getOrganizationOption } from '@/api/organizationalManagement'
  import { getDataSourceOptions } from '@/api/datasource/basic'
  import { getProductOptions } from '@/api/productManagement'

  type RangeValue = [Dayjs, Dayjs]
  const dates = ref<RangeValue>()
  const dateValue = ref<RangeValue>()
  const hackValue = ref<RangeValue>()
  const labelCol = { style: { width: '100px' } }
  const dsId = ref()
  const orgAccount = ref()
  const productId = ref()
  const dataSource = ref()
  const pagination = ref({
    pageSize: 10,
    pageSizeOptions: ['10', '20', '50', '100', '200'],
    current: 1,
    total: 0,
  })
  const [registerTable, { setLoading, setPagination }] = useTable({
    title: '数据源流水',
    columns,
    pagination: true,
    striped: false,
    showTableSetting: false,
    bordered: true,
    showIndexColumn: false,
    resizeHeightOffset: 35,
    dataSource,
  })
  const orgOptions = ref()
  const dsOptions = ref()
  const proOptions = ref()
  onMounted(() => {
    queryDataList()
    getOrgList()
    getDsList()
    getProList()
  })
  const getOrgList = () => {
    getOrganizationOption().then((res) => {
      orgOptions.value = res.data
    })
  }
  const getDsList = () => {
    getDataSourceOptions().then((res) => {
      dsOptions.value = res.data
    })
  }
  const getProList = () => {
    getProductOptions().then((res) => {
      proOptions.value = res.data
    })
  }
  const query = () => {
    let startDateStr
    let endDateStr
    if (dateValue.value) {
      startDateStr = dayjs(dateValue.value[0]).format('YYYY-MM-DD')
      endDateStr = dayjs(dateValue.value[1]).format('YYYY-MM-DD')
    }
    const info = {
      orgAccount: orgAccount.value,
      startDateStr,
      endDateStr,
      dsId: dsId.value,
      productId: productId.value,
    }

    queryDataList(info)
  }
  const queryDataList = (info?) => {
    const { current, pageSize } = pagination.value
    const params = {
      ...info,
      page: current,
      pageSize,
    }
    setLoading(true)
    getDataSourceFlow(params)
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
    queryDataList()
  }
  const disabledDate = (current: Dayjs) => {
    if (!dates.value || (dates.value as any).length === 0) {
      return false
    }

    const tooLate = dates.value[0] && current.diff(dates.value[0], 'month') > 0
    return tooLate
  }

  const onOpenChange = (open: boolean) => {
    if (open) {
      dates.value = [] as any
      hackValue.value = [] as any
    } else {
      hackValue.value = undefined
    }
  }

  const onDateChange = (val: RangeValue) => {
    dateValue.value = val
  }

  const onCalendarChange = (val: RangeValue) => {
    dates.value = val
  }

  const reload = () => {
    orgAccount.value = undefined
    productId.value = undefined
    dsId.value = undefined
    dateValue.value = []
    pagination.value.current = 1
    pagination.value.pageSize = 10
    queryDataList()
  }
</script>
<style lang="less" scoped>
  .flow-content {
    padding: 20px 16px;

    .search-item {
      display: flex;
      flex-flow: row wrap;
      width: 100%;
      margin-bottom: 16px;
      padding: 12px 10px 6px;
      border-radius: 2px;
      background-color: #fff;

      .btn-item {
        margin-left: auto;
        margin-right: 10px;
      }
    }
  }

  :deep(.ant-form-item) {
    margin-bottom: 8px !important;
  }
</style>
