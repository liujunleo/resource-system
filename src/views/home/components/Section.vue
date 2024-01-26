<template>
  <div class="Section flex justify-between items-center" :class="{ bordered: bordered }">
    <span class="font-bold" :style="{ fontSize: size }">{{ title }}</span>
    <div class="Section__tools flex items-center gap-1">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
  defineProps({
    title: {
      type: String,
      default: '100%',
    },
    size: {
      type: String,
      default: '14px',
    },
    bordered: {
      type: Boolean,
      default: false,
    },
  })
</script>

<style scoped lang="less">
  .Section {
    &.bordered {
      border-bottom: 1px solid #ddd;
    }
  }
</style>
