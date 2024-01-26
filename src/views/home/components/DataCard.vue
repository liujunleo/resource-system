<template>
  <div class="DataCard flex flex-col">
    <p
      class="DataCard__title flex justify-between"
      :class="{ bordered: bordered }"
      :style="{ fontSize: titleSize }"
    >
      <span> {{ title }}</span>
      <span v-if="util">{{ util }}</span>
    </p>
    <CountTo
      v-if="value !== undefined && value !== null"
      class="DataCard__value font-bold"
      :style="{ fontSize: valueSize, color: valueColor }"
      :startVal="0"
      :endVal="+value"
      :prefix="prefix"
      :suffix="suffix"
      :duration="500"
    />
    <div class="DataCard__body flex">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { CountTo } from '@/components/CountTo/index'

  defineProps({
    title: {
      type: String,
      default: '100%',
    },
    value: {
      type: Number,
      default: undefined,
    },
    titleSize: {
      type: String,
      default: '13px',
    },
    valueSize: {
      type: String,
      default: '20px',
    },
    valueColor: {
      type: String,
      default: '#333',
    },
    util: {
      type: String,
      default: '',
    },
    prefix: {
      type: String,
      default: '',
    },
    suffix: {
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
  .DataCard {
    padding: 12px;
    border-radius: 10px;
    background-color: #fff;
    &__title {
      color: #666;
    }
    .bordered {
      padding-bottom: 10px;
      margin-bottom: 10px;
      border-bottom: 1px solid #eee;
    }
  }
  p {
    margin: 0;
    padding: 0;
  }
</style>
