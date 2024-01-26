<template>
  <BasicModal
    v-bind="$attrs"
    @register="registerModal"
    title="权重明细"
    @ok="handleSubmit"
    width="50%"
    :maskClosable="false"
  >
    <BasicTable @register="registerDetailModalTable" />
  </BasicModal>
</template>
<script lang="ts">
  import { defineComponent, ref, unref } from 'vue'
  import { BasicModal, useModalInner } from '/@/components/Modal'
  import { BasicTable, useTable } from '/@/components/Table'
  import { detailColumns } from './shuntingRule.data'

  export default defineComponent({
    name: 'ShuntingRuleDetailModal',
    components: { BasicModal, BasicTable },
    emits: ['success', 'register'],
    setup(_) {
      const isUpdate = ref(true)
      const dataSource = ref([])

      const [registerDetailModalTable, { setTableData }] = useTable({
        columns: detailColumns,
        useSearchForm: false,
        pagination: false,
        striped: false,
        showTableSetting: false,
        bordered: true,
        showIndexColumn: false,
        maxHeight: 240,
        dataSource,
      })

      const [registerModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
        setModalProps({ confirmLoading: false })
        isUpdate.value = !!data?.isUpdate
        if (unref(isUpdate)) {
          setTableData(data.record.detailList)
        }
      })

      function handleSubmit() {
        closeModal()
      }
      return {
        registerModal,
        handleSubmit,
        registerDetailModalTable,
      }
    },
  })
</script>
