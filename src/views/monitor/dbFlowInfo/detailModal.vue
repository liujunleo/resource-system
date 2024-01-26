<template>
  <BasicModal
    v-bind="$attrs"
    @register="registerModal"
    title="数据源流水详情"
    @ok="handleSubmit"
    @cancel="onClose"
    :maskClosable="false"
    width="80%"
    :bodyStyle="{
      height: 'calc(100vh - 250px)',
    }"
    centered
  >
    <a-descriptions bordered :column="{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }">
      <a-descriptions-item label="流水号">{{ detailInfo.flowNo }}</a-descriptions-item>
      <a-descriptions-item label="产品名称">{{ detailInfo.productName }}</a-descriptions-item>
      <a-descriptions-item label="机构编码">{{ detailInfo.orgCode }}</a-descriptions-item>
      <a-descriptions-item label="机构账号">{{ detailInfo.orgAccount }}</a-descriptions-item>
      <a-descriptions-item label="机构名称">{{ detailInfo.orgName }}</a-descriptions-item>
      <a-descriptions-item label="数据源名称">{{ detailInfo.dsName }}</a-descriptions-item>
      <a-descriptions-item label="接口流水号">{{ detailInfo.apiNo }}</a-descriptions-item>
      <a-descriptions-item label="接口名称">{{ detailInfo.apiName }}</a-descriptions-item>
      <a-descriptions-item label="请求接口时间">
        {{ detailInfo.apiRequestTime }}
      </a-descriptions-item>
      <a-descriptions-item label="接口响应时间">
        {{ detailInfo.apiResponseTime }}
      </a-descriptions-item>
      <a-descriptions-item label="接口耗时">
        {{ `${detailInfo.apiDelayed}ms` }}
      </a-descriptions-item>

      <a-descriptions-item label="请求平台时间">{{ detailInfo.requestTime }}</a-descriptions-item>
      <a-descriptions-item label="平台响应时间">{{ detailInfo.responseTime }}</a-descriptions-item>
      <a-descriptions-item label="总耗时">
        {{ `${detailInfo.delayed}ms` }}
      </a-descriptions-item>
      <a-descriptions-item label="数据源应答码">
        {{ detailInfo.apiResponseCode }}
      </a-descriptions-item>
      <a-descriptions-item label="数据源应答信息">
        {{ detailInfo.apiResponseMessage }}
      </a-descriptions-item>
      <a-descriptions-item label="系统应答码">{{ detailInfo.sysResponseCode }}</a-descriptions-item>
      <a-descriptions-item label="系统应答信息">
        {{ detailInfo.sysResponseMessage }}
      </a-descriptions-item>
      <a-descriptions-item label="状态" :span="1">
        <a-tag v-if="detailInfo.state === '1'" color="green">{{ detailInfo.stateName }}</a-tag>
        <a-tag v-else color="red">{{ detailInfo.stateName }}</a-tag>
      </a-descriptions-item>
      <a-descriptions-item :span="2" label="创建日期">{{
        detailInfo.createdTime
      }}</a-descriptions-item>
      <a-descriptions-item label="接口返回结果" :span="3">
        {{ detailInfo.apiResult }}
      </a-descriptions-item>
    </a-descriptions>
  </BasicModal>
</template>
<script lang="ts">
  import { defineComponent, ref } from 'vue'
  import { BasicModal, useModalInner } from '/@/components/Modal'
  import { getDataSourceFlowDetail } from '@/api/monitor'

  export default defineComponent({
    name: 'DatasourceBasicModal',
    components: { BasicModal },
    emits: ['success', 'register'],
    setup(_, {}) {
      const [registerModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
        getInfo(data.record)
        setModalProps({ confirmLoading: false })
      })

      function handleSubmit() {
        closeModal()
      }
      function onClose() {
        closeModal()
      }
      const detailInfo = ref({
        flowNo: undefined,
        orgId: undefined,
        orgAccount: undefined,
        orgCode: undefined,
        orgName: undefined,
        Telephone: undefined,
        productId: undefined,
        dsId: undefined,
        dsName: undefined,
        apiId: undefined,
        apiName: undefined,
        apiDelayed: undefined,
        apiRequestTime: undefined,
        apiResponseCode: undefined,
        apiResponseMessage: undefined,
        apiResponseTime: undefined,
        createdTime: undefined,
        delayed: undefined,
        partition: undefined,
        productName: undefined,
        requestTime: undefined,
        responseTime: undefined,
        stateName: undefined,
        sysResponseCode: undefined,
        sysResponseMessage: undefined,
        apiNo: undefined,
        apiResult: undefined,
        state: undefined,
      })

      function getInfo(info) {
        const flowNo = info.flowNo
        const partition = info.partition
        const params = {
          flowNo,
          partition,
        }
        getDataSourceFlowDetail(params).then((res) => {
          detailInfo.value = res.data
        })
      }
      return { registerModal, handleSubmit, onClose, detailInfo }
    },
  })
</script>
<style scoped lang="less">
  :deep(.ant-descriptions-item-label) {
    width: 150px;
  }
</style>
