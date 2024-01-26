<template>
  <div class="m-4 mr-0 overflow-hidden bg-white">
    <BasicTree
      title="部门列表"
      toolbar
      search
      treeWrapperClassName="h-[calc(100%-35px)] overflow-auto"
      :clickRowToExpand="false"
      :treeData="treeData"
      :fieldNames="{ key: 'id', title: 'deptName' }"
      @select="handleSelect"
    />
  </div>
</template>
<script lang="ts" setup>
  import { onMounted, ref } from 'vue'

  import { BasicTree, TreeItem } from '/@/components/Tree'
  import { getDeptList } from '/@/api/sys/dept'

  const emit = defineEmits(['select'])

  const treeData = ref<TreeItem[]>([])

  const fetch = async () => {
    await getDeptList({}).then((res) => {
      treeData.value = res.data || []
    })
  }

  const handleSelect = (keys) => {
    emit('select', keys[0])
  }

  onMounted(() => {
    fetch()
  })
</script>
