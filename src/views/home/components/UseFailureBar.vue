<template>
  <div ref="chartRef" :style="{ height, width }"></div>
</template>
<script lang="ts">
  import { basicProps } from './props'
</script>
<script lang="ts" setup>
  import { ref, Ref, watch } from 'vue'
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
      console.log('setOptions', props.nameList)
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
        grid: { left: '1%', right: '1%', top: '2%', bottom: 0, containLabel: true },
        xAxis: {
          type: 'category',
          // data: [...new Array(12)].map((_item, index) => `接口${index + 1}`),
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
        yAxis: {
          // max: 50,
          type: 'value',
          // splitNumber: 4,
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
        series: [
          {
            type: 'bar',
            color: ['#3f68f0', '#bac9f9', '#e5e5e5'],
            // data: [25, 23, 22, 21, 19, 11, 10, 9, 8, 7.5, 7.2, 5],
            data: props.valueList,
            barMaxWidth: 10,
            barMinWidth: 2,
            itemStyle: {
              borderRadius: 10,
              color: {
                type: 'linear',
                // x2=1,y=0,柱子的颜色在水平方向渐变
                x2: 0,
                y2: 1,
                colorStops: [
                  // 0%处的颜色
                  {
                    offset: 0,
                    color: '#bac9f9',
                    // color: '#e3739c',
                    // color: '#d39e98',
                    // color: '#e6b3ac',
                  },
                  // 100%处的颜色
                  {
                    offset: 1,
                    color: '#3f68f0',
                    // color: '#EA1D72',
                    // color: '#b5342a',
                    // color: '#D23224',
                  },
                ],
                global: false, // 缺省为 false
              },
            },
            showBackground: true, //是否显示柱条的背景色
            backgroundStyle: {
              color: '#f3f7fe',
              // shadowColor: '#fefefe', //阴影颜色
            },
          },
        ],
      })
    },
    { immediate: true },
  )
</script>
