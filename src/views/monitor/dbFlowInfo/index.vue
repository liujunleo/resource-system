<template>
  <div class="flow-content">
    <a-form ref="formRef" class="search-item" :label-col="labelCol">
      <a-form-item label="流水号" name="flowNo" style="width: 17%">
        <a-input v-model:value="flowNo" placeholder="请输入流水号" />
      </a-form-item>
      <a-form-item label="数据源" style="width: 17%">
        <a-select
          v-model:value="dsId"
          placeholder="请选择数据源"
          allowClear
          :options="dsOptions"
          :field-names="{ label: 'name', value: 'id' }"
        />
      </a-form-item>
      <a-form-item label="机构" style="width: 17%">
        <a-select
          v-model:value="orgAccount"
          placeholder="请选择机构"
          allowClear
          :options="orgOptions"
          :field-names="{ label: 'orgName', value: 'orgAccount' }"
        />
      </a-form-item>
      <a-form-item label="认证产品" style="width: 17%">
        <a-select
          v-model:value="productId"
          placeholder="请选择认证产品"
          allowClear
          :options="proOptions"
          :field-names="{ label: 'name', value: 'id' }"
        />
      </a-form-item>
      <a-form-item label="日期" style="width: 17%">
        <a-date-picker :allowClear="false" format="YYYY-MM-DD" v-model:value="dateValue" />
      </a-form-item>
      <a-form-item class="btn-item">
        <a-button @click="reload">重置</a-button>
      </a-form-item>
      <a-form-item>
        <a-button type="primary" @click="query">查询</a-button>
      </a-form-item>
    </a-form>
    <BasicTable @register="registerTable" @change="onChange">
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'flowNo'">
          <a-button type="link" @click="goDetail(record)">{{ record.flowNo }}</a-button>
        </template>
      </template>
    </BasicTable>
    <DetailModal @register="registerModal" />
  </div>
</template>
<script setup lang="ts">
  import { getDataSourceFlow } from '/@/api/monitor'

  import { columns } from './dbFlowInfo.data'
  import { BasicTable, useTable } from '/@/components/Table'
  import { onMounted, ref } from 'vue'
  import dayjs, { Dayjs } from 'dayjs'
  import { getOrganizationOption } from '@/api/organizationalManagement'
  import { getDataSourceOptions } from '@/api/datasource/basic'
  import { getProductOptions } from '@/api/productManagement'
  import DetailModal from './detailModal.vue'
  import { useModal } from '@/components/Modal'

  const dateValue = ref<Dayjs>()
  const labelCol = { style: { width: '90px' } }
  const flowNo = ref()
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
  const [registerModal, { openModal }] = useModal()

  const [registerTable, { setLoading, setPagination }] = useTable({
    title: '数据源流水',
    columns,
    pagination: true,
    striped: false,
    showTableSetting: false,
    bordered: true,
    showIndexColumn: false,
    resizeHeightOffset: 38,
    dataSource,
  })
  const orgOptions = ref()
  const dsOptions = ref()
  const proOptions = ref()
  onMounted(() => {
    const today = new Date()
    dateValue.value = dayjs(today)
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
    pagination.value.current = 1
    const date = dayjs(dateValue.value).format('YYYY-MM-DD')
    const info = {
      orgAccount: orgAccount.value,
      startDateStr: date,
      endDateStr: date,
      dsId: dsId.value,
      productId: productId.value,
      flowNo: flowNo.value,
    }

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
  const queryDataList = () => {
    const { current, pageSize } = pagination.value
    const params = {
      startDateStr: dayjs(dateValue.value).format('YYYY-MM-DD'),
      endDateStr: dayjs(dateValue.value).format('YYYY-MM-DD'),
      page: current,
      pageSize,
      orgAccount: orgAccount.value,
      dsId: dsId.value,
      productId: productId.value,
      flowNo: flowNo.value,
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

  const reload = () => {
    const today = new Date()
    dateValue.value = dayjs(today)
    orgAccount.value = undefined
    productId.value = undefined
    dsId.value = undefined
    flowNo.value = undefined
    pagination.value.current = 1
    pagination.value.pageSize = 10
    queryDataList()
  }

  const goDetail = (record) => {
    openModal(true, {
      record,
    })
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

  // :deep(.ant-form-item-control) {
  //   width: calc(100% - 100px) !important;
  // }
</style>
