<template>
  <div class="dict-list">
    <div class="btn-item">
      <a-button type="link" @click="goBack">返回</a-button>
    </div>
    <BasicTable @register="registerTable" @change="onChange">
      <template #toolbar>
        <a-button type="primary" @click="handleCreate"> 新增字典 </a-button>
      </template>
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'action'">
          <TableAction
            :actions="[
              {
                icon: 'clarity:note-edit-line',
                onClick: handleEdit.bind(null, record),
              },
              {
                icon: 'ant-design:delete-outlined',
                color: 'error',
                popConfirm: {
                  title: '是否确认删除',
                  placement: 'left',
                  confirm: handleDelete.bind(null, record),
                },
              },
            ]"
          />
        </template>
      </template>
    </BasicTable>
    <DictModal @register="registerModal" @success="handleSuccess" />
  </div>
</template>
<script lang="ts">
  import { defineComponent, ref, onMounted } from 'vue'
  import { useRouter, useRoute } from 'vue-router'
  import { BasicTable, useTable, TableAction } from '/@/components/Table'
  import { deleteDict, getDictList } from '/@/api/sys/dict'

  import { useModal } from '/@/components/Modal'
  import DictModal from './DictModal.vue'
  import { useMessage } from '/@/hooks/web/useMessage'

  import { dictColumns } from './dict.data'

  export default defineComponent({
    name: 'DictList',
    components: { BasicTable, DictModal, TableAction },
    setup() {
      const { createMessage } = useMessage()
      const dataSource = ref([])
      const router = useRouter()
      const routers = useRoute()
      const pagination = ref({
        pageSize: 10,
        pageSizeOptions: ['10', '20', '50', '100', '200'],
        current: 1,
        total: 0,
      })
      const [registerModal, { openModal }] = useModal()
      const [registerTable, { setLoading, setPagination }] = useTable({
        title: '字典列表',
        columns: dictColumns,
        pagination: true,
        striped: false,
        useSearchForm: false,
        showTableSetting: false,
        bordered: true,
        showIndexColumn: false,
        resizeHeightOffset: 35,
        actionColumn: {
          width: 80,
          title: '操作',
          dataIndex: 'action',
          fixed: 'right',
        },
        dataSource,
      })
      function handleCreate() {
        openModal(true, {
          isUpdate: false,
          dictTypeId: routers.query.id as any,
        })
      }
      onMounted(() => {
        queryDictList()
      })
      function queryDictList() {
        const { current, pageSize } = pagination.value
        const dictTypeId = routers.query.id as any
        const params = {
          page: current,
          pageSize,
          dictTypeId,
        }

        setLoading(true)
        getDictList(params)
          .then((res) => {
            dataSource.value = res.data.list || []
            setPagination({ ...pagination.value, total: res?.data.total || 0 })
          })
          .finally(() => {
            setLoading(false)
          })
      }
      function handleEdit(record: Recordable) {
        openModal(true, {
          record,
          isUpdate: true,
          dictTypeId: routers.query.id as any,
        })
      }

      function handleDelete(record: Recordable) {
        deleteDict(record.id).then(() => {
          createMessage.success('删除成功')
          queryDictList()
        })
      }

      function handleSuccess() {
        queryDictList()
      }
      function goBack() {
        router.push({
          path: '/demo/system/dict',
        })
      }
      function onChange({ current, pageSize }) {
        pagination.value.current = current
        pagination.value.pageSize = pageSize
        queryDictList()
      }
      return {
        registerTable,
        registerModal,
        handleCreate,
        handleEdit,
        handleDelete,
        handleSuccess,
        goBack,
        onChange,
      }
    },
  })
</script>
<style lang="less" scoped>
  .dict-list {
    padding: 10px 20px;

    .btn-item {
      margin-bottom: 10px;
    }
  }
</style>
