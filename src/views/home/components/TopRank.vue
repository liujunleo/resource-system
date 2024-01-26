<template>
  <ul class="TopRank w-full flex flex-col" :style="{ height: height }">
    <li
      class="TopRank__row flex justify-between items-center"
      :class="{ bordered: bordered }"
      v-for="(item, index) in list"
      :key="item.id"
    >
      <p class="TopRank__title flex items-center">
        <span class="TopRank__index mr-2">{{ index + 1 }}</span>
        <span>{{ item.name }}</span>
      </p>
      <CountTo class="TopRank__number" :startVal="0" :endVal="+item.value" />
    </li>
  </ul>
</template>

<script setup lang="ts">
  import { CountTo } from '@/components/CountTo/index'

  defineProps({
    loading: Boolean,
    list: {
      type: Array as PropType<any>,
      default: () => [],
    },
    height: {
      type: String,
      default: 'auto',
    },
    bordered: {
      type: Boolean,
      default: false,
    },
  })
</script>

<style scoped lang="less">
  .TopRank {
    margin: 0;
    &__row {
      padding: 10px 12px;
      border-radius: 4px;
      &:nth-child(odd) {
        background: #f4f7fd;
      }
      &:nth-child(1) {
        .TopRank__index {
          color: #fff;
          background: #f9e465;
        }
      }
      &:nth-child(2) {
        .TopRank__index {
          color: #fff;
          background: #dbe5e8;
        }
      }
      &:nth-child(3) {
        .TopRank__index {
          color: #fff;
          background: #f4c9a7;
        }
      }
    }
    &__title {
      color: #666;
      font-size: 13px;
      margin: 0;
    }
    &__index {
      width: 18px;
      height: 18px;
      color: #bbb;
      font-size: 12px;
      font-weight: bold;
      text-align: center;
      border-radius: 50%;
    }
    &__number {
      font-size: 13px;
      font-weight: bold;
    }

    &.bordered {
      border-bottom: 1px solid #ddd;
    }
  }
</style>
