<template>
  <div ref="chartRef" :style="{ width, height }"></div>
</template>
<script lang="ts" setup>
  import { Ref, ref, watch } from 'vue'
  import { useECharts } from '/@/hooks/web/useECharts'

  const props = defineProps({
    loading: Boolean,
    width: {
      type: String as PropType<string>,
      default: '100%',
    },
    height: {
      type: String as PropType<string>,
      default: '300px',
    },
    data: {
      type: Array as PropType<any>,
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
          trigger: 'item',
        },
        legend: {
          top: '10%',
          left: '2%',
          orient: 'vertical',
          textStyle: {
            fontSize: '11px',
            color: '#333',
          },
          itemHeight: 10,
          itemWidth: 15,
        },
        series: [
          {
            // color: ['#3f68f0', '#bac9f9', '#e5e5e5'],
            color: [
              'rgba(63, 104, 240, 1)',
              'rgba(63, 104, 240, 0.65)',
              'rgba(63, 104, 240, 0.45)',
              'rgba(63, 104, 240, 0.25)',
              'rgba(63, 104, 240, 0.1)',
            ],
            name: '',
            type: 'pie',
            radius: ['45%', '90%'],
            center: ['70%', '50%'],
            avoidLabelOverlap: false,
            itemStyle: {
              borderRadius: 5,
              borderColor: '#fff',
              borderWidth: 2,
            },
            label: {
              show: false,
              position: 'center',
            },
            emphasis: {
              label: {
                show: true,
                fontSize: '12',
                fontWeight: 'bold',
              },
            },
            labelLine: {
              show: false,
            },
            // data: [
            //   { value: 1257, name: '实名认证' },
            //   { value: 903, name: '二要素认证' },
            //   { value: 600, name: '三要素认证' },
            // ],
            data: props.data,
            animationType: 'scale',
            animationEasing: 'exponentialInOut',
            animationDelay: function () {
              return Math.random() * 100
            },
          },
        ],
      })
    },
    { immediate: true },
  )
</script>
