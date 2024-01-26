<template>
  <div class="flow-content">
    <a-form ref="formRef" class="search-item" :label-col="labelCol">
      <a-form-item label="机构" style="width: 20%">
        <a-select
          v-model:value="orgId"
          placeholder="请选择机构"
          allowClear
          :options="orgOptions"
          :field-names="{ label: 'orgName', value: 'id' }"
        />
      </a-form-item>
      <a-form-item label="认证产品" style="width: 20%">
        <a-select
          v-model:value="productId"
          placeholder="请选择认证产品"
          allowClear
          :options="proOptions"
          :field-names="{ label: 'name', value: 'id' }"
        />
      </a-form-item>
      <a-form-item label="统计月份">
        <a-date-picker v-model:value="dateValue" picker="month" @change="onDateChange" />
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
        <template v-if="column.key === 'action'">
          <TableAction
            :actions="[
              {
                icon: 'clarity:details-line',
                onClick: handleDetail.bind(null, record),
              },
            ]"
          />
        </template>
      </template>
    </BasicTable>
    <DetailModal @register="registerModal" />
  </div>
</template>
<script setup lang="ts">
  import { getListOrganizationDaily } from '/@/api/monitor'

  import { columns } from './data'
  import { BasicTable, useTable, TableAction } from '/@/components/Table'
  import { onMounted, ref } from 'vue'
  import dayjs, { Dayjs } from 'dayjs'
  import { getOrganizationOption } from '@/api/organizationalManagement'
  import { getProductOptions } from '@/api/productManagement'
  import { useModal } from '/@/components/Modal'
  import DetailModal from './DetailModal.vue'

  const dateValue = ref<Dayjs>()
  const labelCol = { style: { width: '100px' } }
  const orgId = ref()
  const productId = ref()
  const orgOptions = ref()
  const proOptions = ref()
  const dataSource = ref()
  const pagination = ref({
    pageSize: 10,
    pageSizeOptions: ['10', '20', '50', '100', '200'],
    current: 1,
    total: 0,
  })

  const [registerModal, { openModal }] = useModal()

  const [registerTable, { setLoading, setPagination }] = useTable({
    title: '机构认证统计',
    columns,
    pagination: true,
    striped: false,
    showTableSetting: false,
    bordered: true,
    showIndexColumn: false,
    resizeHeightOffset: 40,
    actionColumn: {
      title: '操作',
      width: 80,
      dataIndex: 'action',
    },
    dataSource,
  })
  onMounted(() => {
    queryDataList()
    getOrgList()
    getProList()
  })
  const getOrgList = () => {
    getOrganizationOption().then((res) => {
      orgOptions.value = res.data
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
      startDateStr = dayjs(dateValue.value).format('YYYY-MM-') + '01'
      endDateStr = dayjs(dateValue.value).format('YYYY-MM-') + '31'
    }
    pagination.value.current = 1

    const info = {
      orgId: orgId.value,
      productId: productId.value,
      startDateStr,
      endDateStr,
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
    getListOrganizationDaily(params)
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

    let startDateStr
    let endDateStr
    if (dateValue.value) {
      startDateStr = dayjs(dateValue.value).format('YYYY-MM-') + '01'
      endDateStr = dayjs(dateValue.value).format('YYYY-MM-') + '31'
    }

    const info = {
      orgId: orgId.value,
      startDateStr,
      endDateStr,
    }

    queryDataList(info)
  }

  const onDateChange = (val: Dayjs) => {
    dateValue.value = val
  }

  const reload = () => {
    orgId.value = undefined
    productId.value = undefined
    dateValue.value = undefined
    pagination.value.current = 1
    pagination.value.pageSize = 10
    queryDataList()
  }

  const handleDetail = (record) => {
    openModal(true, record)
  }
</script>
<style lang="less" scoped>
  .flow-content {
    padding: 20px 16px;

    .search-item {
      display: flex;
      width: 100%;
      margin-bottom: 16px;
      padding: 12px 10px 6px;
      border-radius: 2px;
      background-color: #fff;
      flex-flow: row wrap;

      .btn-item {
        margin-left: auto;
        margin-right: 10px;
      }
    }
  }

  :deep(.ant-form-item) {
    margin-bottom: 8px !important;
  }

  :deep(.ant-form-item-control) {
    width: calc(100% - 100px) !important;
  }
</style>
