<template>
  <div class="db-detail">
    <a-descriptions title="数据源流水详情" bordered>
      <a-descriptions-item label="流水号">{{ detailInfo.flowNo }}</a-descriptions-item>
      <a-descriptions-item label="产品名称">{{ detailInfo.productName }}</a-descriptions-item>
      <a-descriptions-item label="机构编码">{{ detailInfo.orgCode }}</a-descriptions-item>
      <a-descriptions-item label="机构账号">{{ detailInfo.orgAccount }}</a-descriptions-item>
      <a-descriptions-item label="机构名称">{{ detailInfo.orgName }}</a-descriptions-item>
      <a-descriptions-item label="数据源名称">{{ detailInfo.dsName }}</a-descriptions-item>
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
      <a-descriptions-item label="状态">{{ detailInfo.stateName }}</a-descriptions-item>
      <a-descriptions-item label="创建日期">{{ detailInfo.createdTime }}</a-descriptions-item>
    </a-descriptions>
  </div>
</template>
<script lang="ts">
  import { getDataSourceFlowDetail } from '@/api/monitor'
  import { onMounted, ref, defineComponent } from 'vue'
  import { useRoute } from 'vue-router'
  export default defineComponent({
    name: 'DictManagement',
    setup() {
      const routers = useRoute()
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
      })

      onMounted(() => {
        getInfo()
      })

      function getInfo() {
        const flowNo = routers.query.flowNo
        const partition = routers.query.partition
        const params = {
          flowNo,
          partition,
        }
        getDataSourceFlowDetail(params).then((res) => {
          detailInfo.value = res.data
        })
      }
      return {
        detailInfo,
      }
    },
  })
</script>
<style lang="less" scoped>
  .db-detail {
    margin: 20px 16px;
    background-color: #fff;
    padding: 20px 16px;
    height: calc(100vh - 90px);
  }
</style>
