<template>
  <div class="home pl-4 pr-4 pb-4">
    <Section class="pt-4 pb-4" title="平台总览" size="18px">
      <SliderSelect v-model:value="queryType" :list="dateFilter" @change="onFilterChange" />
    </Section>

    <div class="flex flex-wrap md:flex-nowrap gap-3">
      <div class="flex flex-wrap w-full gap-3">
        <DataCard
          class="w-1/3 md:w-1/4 flex-auto"
          title="客户机构数量"
          :value="summaryRes.orgQty"
        />
        <DataCard
          class="w-1/3 md:w-1/4 flex-auto"
          title="平均响应时间"
          :value="summaryRes.avgResponseTime"
          suffix="ms"
        />
        <DataCard
          class="w-1/3 md:w-1/4 flex-auto"
          title="最长响应时间"
          :value="summaryRes.maxResponseTime"
          value-color="#f2aa4b"
          suffix="ms"
        />
        <DataCard class="w-1/3 md:w-1/4 flex-auto" title="调用总次数" :value="summaryRes.total" />
        <DataCard
          class="w-1/3 md:w-1/4 flex-auto"
          title="调用成功次数"
          :value="summaryRes.success"
          value-color="#4295a5"
        />
        <DataCard
          class="w-1/3 md:w-1/4 flex-auto"
          title="调用失败次数"
          :value="summaryRes.fail"
          value-color="#b5342a"
        />
      </div>
      <div class="flex w-full md:w-1/2 gap-3 flex-shrink-0 flex-wrap md:flex-nowrap">
        <DataCard class="w-full md:w-1/2" title="数据源接口总数" :value="dsApiRes.total">
          <ServiceInterfacePie :loading="dsApiRes.loading" :data="dsApiRes.list" height="100px" />
        </DataCard>
        <DataCard class="w-full md:w-1/2" title="产品接口总数" :value="productApiRes.total">
          <ProductInterfacePie
            :loading="productApiRes.loading"
            :data="productApiRes.list"
            height="100px"
          />
        </DataCard>
      </div>
    </div>

    <div class="flex flex-wrap md:flex-nowrap mt-4 gap-3">
      <DataCard class="w-full md:w-2/3" title="接口调用量" util="次" bordered>
        <UseTimesLine
          height="200px"
          :loading="apiByHourRes.loading"
          :name-list="apiByHourRes.nameList"
          :value-list="apiByHourRes.valueList"
        />
      </DataCard>
      <DataCard class="w-full md:w-1/3" title="接口故障量" util="次" bordered>
        <div
          class="flex items-center justify-center w-full h-50 text-gray-400 text-[13px]"
          v-if="apiFailureRateRes.nameList.length === 0"
          >无接口故障</div
        >
        <UseFailureBar
          v-else
          height="200px"
          :loading="apiFailureRateRes.loading"
          :name-list="apiFailureRateRes.nameList"
          :value-list="apiFailureRateRes.valueList"
        />
      </DataCard>
    </div>

    <div class="flex flex-wrap md:flex-nowrap mt-4 gap-3">
      <DataCard class="w-full md:w-1/3" title="机构调用排行" bordered>
        <TopRank class="min-h-52" :loading="topOrgRes.loading" :list="topOrgRes.list" />
      </DataCard>
      <DataCard class="w-full md:w-1/3" title="数据源调用排行" bordered>
        <TopRank class="min-h-52" :loading="topDsRes.loading" :list="topDsRes.list" />
      </DataCard>
      <DataCard class="w-full md:w-1/3" title="产品调用排行" bordered>
        <TopRank class="min-h-52" :loading="topProductRes.loading" :list="topProductRes.list" />
      </DataCard>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { onMounted, ref } from 'vue'
  import Section from './components/Section.vue'
  import SliderSelect from './components/SliderSelect.vue'
  import DataCard from './components/DataCard.vue'
  import ServiceInterfacePie from './components/ServiceInterfacePie.vue'
  import ProductInterfacePie from './components/ProductInterfacePie.vue'
  import UseFailureBar from './components/UseFailureBar.vue'
  import UseTimesLine from './components/UseTimesLine.vue'
  import TopRank from './components/TopRank.vue'
  import * as homeApi from '@/api/home/index'

  const loading = ref(true)

  setTimeout(() => {
    loading.value = false
  }, 1500)

  // 当前查询的数据范围
  const queryType = ref('d')
  // 查询数据范围
  const dateFilter = ref([
    {
      key: 'd',
      label: '昨天',
    },
    {
      key: 'w',
      label: '近一周',
    },
    {
      key: 'm',
      label: '近一月',
    },
    {
      key: 'all',
      label: '全部',
    },
  ])

  // 总览数据
  const summaryRes = ref({
    orgQty: undefined,
    total: undefined,
    success: undefined,
    fail: undefined,
    avgResponseTime: undefined,
    maxResponseTime: undefined,
  })
  // 获取总览数据
  const getSummary = () => {
    homeApi.getSummary({ queryType: queryType.value }).then((res) => {
      // 将res.data中的属性判断，为空的属性赋值为0
      for (const key in res.data) {
        if (!res.data[key]) {
          res.data[key] = 0
        }
      }
      summaryRes.value = res.data
    })
  }

  // 数据源接口总数
  const dsApiRes = ref({
    loading: true,
    total: 0,
    list: [],
  })
  // 获取数据源接口总数
  const getDsApi = () => {
    dsApiRes.value.loading = true
    homeApi
      .getDsApi({ queryType: queryType.value })
      .then((res) => {
        const { total, list } = res.data
        dsApiRes.value.total = total
        dsApiRes.value.list = list
      })
      .finally(() => {
        dsApiRes.value.loading = false
      })
  }

  // 产品接口总数
  const productApiRes = ref({
    loading: true,
    total: 0,
    list: [],
  })
  // 获取产品接口总数
  const getProductApi = () => {
    productApiRes.value.loading = true
    homeApi
      .getProductApi({ queryType: queryType.value })
      .then((res) => {
        const { total, list } = res.data
        productApiRes.value.total = total
        productApiRes.value.list = list
      })
      .finally(() => {
        productApiRes.value.loading = false
      })
  }

  // 接口调用量
  const apiByHourRes = ref({
    loading: true,
    nameList: [],
    valueList: [],
  })
  // 获取接口调用量
  const getApiByHour = () => {
    apiByHourRes.value.loading = true
    homeApi
      .getApiByHour({ queryType: queryType.value })
      .then((res) => {
        const { data } = res
        const nameList: string[] = []
        const valueList: number[] = []
        for (let i = 0; i < data.length; i++) {
          const item = data[i]
          nameList.push(item.name)
          valueList.push(+item.value)
        }
        apiByHourRes.value.nameList = nameList as any
        apiByHourRes.value.valueList = valueList as any
      })
      .finally(() => {
        apiByHourRes.value.loading = false
      })
  }

  // 接口故障率
  const apiFailureRateRes = ref({
    loading: true,
    nameList: [],
    valueList: [],
  })
  // 获取接口故障率
  const getApiFailureRate = () => {
    apiFailureRateRes.value.loading = true
    homeApi
      .getApiFailureRate({ queryType: queryType.value, page: 1, pageSize: 10 })
      .then((res) => {
        const { list } = res.data
        const nameList: string[] = []
        const valueList: number[] = []
        for (let i = 0; i < list.length; i++) {
          const item = list[i]
          nameList.push(item.name)
          valueList.push(+item.value)
        }
        apiFailureRateRes.value.nameList = nameList as any
        apiFailureRateRes.value.valueList = valueList as any
      })
      .finally(() => {
        apiFailureRateRes.value.loading = false
      })
  }

  // 机构调用排行
  const topOrgRes = ref({
    loading: true,
    list: [],
  })
  // 获取机构调用排行
  const getTopOrg = () => {
    topOrgRes.value.loading = true
    homeApi
      .getTopOrg({ queryType: queryType.value, page: 1, pageSize: 10 })
      .then((res) => {
        const { list } = res.data
        topOrgRes.value.list = list
      })
      .finally(() => {
        topOrgRes.value.loading = false
      })
  }

  // 数据源调用排行
  const topDsRes = ref({
    loading: true,
    list: [],
  })
  // 获取数据源调用排行
  const getTopDs = () => {
    topDsRes.value.loading = true
    homeApi
      .getTopDs({ queryType: queryType.value, page: 1, pageSize: 10 })
      .then((res) => {
        const { list } = res.data
        topDsRes.value.list = list
      })
      .finally(() => {
        topDsRes.value.loading = false
      })
  }

  // 产品调用排行
  const topProductRes = ref({
    loading: true,
    list: [],
  })
  // 获取产品调用排行
  const getTopProduct = () => {
    topProductRes.value.loading = true
    homeApi
      .getTopProduct({ queryType: queryType.value, page: 1, pageSize: 10 })
      .then((res) => {
        const { list } = res.data
        topProductRes.value.list = list
      })
      .finally(() => {
        topProductRes.value.loading = false
      })
  }

  // 初始化调用接口函数
  const init = () => {
    getSummary()
    getDsApi()
    getProductApi()
    getApiByHour()
    getApiFailureRate()
    getTopOrg()
    getTopDs()
    getTopProduct()
  }

  // 切换数据范围，重新调用接口
  const onFilterChange = () => {
    init()
  }

  // 页面加载完成后，调用接口
  onMounted(() => {
    init()
  })
</script>
