<template>
  <ul class="SliderSelect flex items-center">
    <li
      class="SliderSelect__item p-3"
      :class="{ active: item[fieldNames.key] === value }"
      :style="
        item[fieldNames.key] === value ? { ...defaultStyle, ...activeStyle } : { ...defaultStyle }
      "
      v-for="item in list"
      :key="item[fieldNames.key]"
      @click="onClick(item)"
    >
      {{ item[fieldNames.label] }}
    </li>
  </ul>
</template>

<script setup lang="ts">
  import type { PropType } from 'vue'

  defineProps({
    value: {
      type: [String, Number],
    },
    list: {
      type: Array as PropType<Object[]>,
      default: () => [],
    },
    fieldNames: {
      type: Object,
      default: () => {
        return {
          key: 'key',
          label: 'label',
        }
      },
    },
    defaultStyle: {
      type: Object,
      default: () => {
        return {
          color: '#666',
          backgroundColor: 'transparent',
          fontSize: '12px',
        }
      },
    },
    activeStyle: {
      type: Object,
      default: () => {
        return {
          //   color: '#096dd9',
          //   backgroundColor: '#e6f7ff',
          color: '#fff',
          backgroundColor: '#0960bd',
          fontSize: '12px',
          fontWeight: 'bold',
        }
      },
    },
  })

  const emits = defineEmits(['update:value', 'change'])

  const onClick = (e) => {
    emits('update:value', e.key)
    emits('change', e)
  }
</script>

<style scoped lang="less">
  .SliderSelect {
    margin: 0;
    padding: 4px;
    border-radius: 100px;
    background-color: #fff;
    box-shadow: #eee 0 0 8px;
    &__item {
      padding: 5px 15px;
      border-radius: 100px;
      user-select: none;
      transition: all 0.3s;
      cursor: pointer;
    }
  }
</style>
