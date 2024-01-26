<template>
  <ul class="ProgressRank w-full flex flex-col p-4" :style="{ height: height }">
    <li
      class="flex flex-col h-13"
      :class="{ bordered: bordered }"
      v-for="item in list"
      :key="item.id"
    >
      <span class="ProgressRank__title font-bold mr-4">{{ item.title }}</span>
      <Progress
        class="flex-1"
        :stroke-width="10"
        :stroke-color="strokeColor"
        :percent="item.number"
        :trail-color="trailColor"
      />
      <!-- <CountTo class="ProgressRank__number" :startVal="0" :endVal="item.number" /> -->
    </li>
  </ul>
</template>

<script setup lang="ts">
  import { CountTo } from '@/components/CountTo/index'
  import { Progress } from 'ant-design-vue'

  defineProps({
    list: {
      type: Array as PropType<any>,
      default: () => [],
    },
    height: {
      type: String,
      default: 'auto',
    },
    strokeColor: {
      type: Object,
      default: () => {
        return {
          '0%': '#108ee9',
          '100%': '#87d068',
        }
      },
    },
    trailColor: {
      type: String,
      default: '',
    },
    bordered: {
      type: Boolean,
      default: false,
    },
  })
</script>

<style scoped lang="less">
  .ProgressRank {
    margin: 0;
    &__title {
      width: 100%;
      color: #666;
      font-size: 13px;
      overflow: hidden; // 溢出隐藏
      text-overflow: ellipsis; // 溢出用省略号显示
      white-space: nowrap; // 规定段落中的文本不进行换行
    }
    &__number {
      font-size: 13px;
      font-weight: bold;
    }
    &.bordered {
      border-bottom: 1px solid #ddd;
    }
    /deep/ .ant-progress-text {
      font-weight: bold;
      font-size: 12px;
    }
  }
</style>
