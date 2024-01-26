<template>
  <div ref="chartRef" :style="{ height, width }"></div>
</template>
<script lang="ts">
  import { basicProps } from './props'
</script>
<script lang="ts" setup>
  import { watch, ref, Ref } from 'vue'
  import { useECharts } from '/@/hooks/web/useECharts'

  const props = defineProps({
    ...basicProps,
    loading: Boolean,
    nameList: {
      type: Array as PropType<string[]>,
      default: () => [],
    },
    valueList: {
      type: Array as PropType<number[]>,
      default: () => [],
    },
  })
  const chartRef = ref<HTMLDivElement | null>(null)
  const { setOptions } = useECharts(chartRef as Ref<HTMLDivElement>)

  watch(
    () => props.loading,
    () => {
      if (props.loading) {
        return
      }
      setOptions({
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            lineStyle: {
              width: 1,
              color: '#019680',
            },
          },
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          // data: [...new Array(24)].map((_item, index) => `${index + 6}:00`),
          data: props.nameList,
          axisLine: {
            show: false, //y轴线消失
          },
          splitLine: {
            show: false, // 网格线是否显示
          },
          axisTick: {
            show: false,
          },
        },
        yAxis: [
          {
            type: 'value',
            // max: 80000,
            splitNumber: 4,
            axisTick: {
              show: false,
            },
            splitArea: {
              show: false,
              areaStyle: {
                color: ['rgba(255,255,255,0.2)', 'rgba(226,226,226,0.2)'],
              },
            },
            axisLine: {
              show: false, //y轴线消失
            },
            splitLine: {
              show: false, // 网格线是否显示
            },
          },
        ],
        grid: { left: '1%', right: '1%', top: '2  %', bottom: 0, containLabel: true },
        series: [
          {
            smooth: true,
            // data: [
            //   1101, 3202, 1500, 1800, 2333, 7000, 3000, 2200, 10000, 6000, 7666, 11444, 12222, 11111,
            // ],
            data: props.valueList,
            type: 'line',
            // areaStyle: {
            //   color: 'transparent',
            // },
            symbol: 'circle', // 将圆点改成实心 不写symbol默认空心
            symbolSize: 0, // 圆点的大小
            itemStyle: {
              color: '#3f68f0',
            },
            areaStyle: {
              color: {
                //线性渐变
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: 'rgba(185, 210, 255, 0.43)', // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: 'rgba(237, 243, 255, 0)', // 100% 处的颜色
                  },
                ],
                global: false, // 缺省为 false
              },
            },
            lineStyle: {
              width: 4,
              color: {
                //线性渐变
                type: 'linear',
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: '#3f68f0', // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: '#bac9f9', // 100% 处的颜色
                  },
                ],
                global: false, // 缺省为 false
              },
            },
          },
        ],
      })
    },
    { immediate: true },
  )
</script>
