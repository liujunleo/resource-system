<template>
  <BasicModal
    v-bind="$attrs"
    @register="registerModal"
    showFooter
    :title="getTitle"
    width="50%"
    @ok="handleSubmit"
    :maskClosable="false"
  >
    <BasicForm @register="registerForm">
      <template #menu="{ model, field }">
        <BasicTree
          v-model:value="model[field]"
          :treeData="treeData"
          :fieldNames="{ title: 'menuName', key: 'id' }"
          checkable
          toolbar
          title="菜单分配"
        />
      </template>
    </BasicForm>
  </BasicModal>
</template>
<script lang="ts" setup>
  import { ref, computed, unref } from 'vue'
  import { BasicForm, useForm } from '/@/components/Form/index'
  import { formSchema } from './role.data'
  import { BasicModal, useModalInner } from '/@/components/Modal'
  import { BasicTree, TreeItem } from '/@/components/Tree'

  import { getMenuList } from '/@/api/sys/menu'
  import { addRole, updateRole, getRoleById } from '/@/api/sys/role'

  import { useMessage } from '/@/hooks/web/useMessage'

  const { createMessage } = useMessage()
  const emit = defineEmits(['success', 'register'])
  const isUpdate = ref(true)
  const treeData = ref<TreeItem[]>([])
  const menuIds = ref()
  const [registerForm, { resetFields, setFieldsValue, validate }] = useForm({
    labelWidth: 90,
    baseColProps: { span: 24 },
    schemas: formSchema,
    showActionButtonGroup: false,
  })

  const [registerModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
    resetFields()
    setModalProps({ confirmLoading: false })
    // 需要在setFieldsValue之前先填充treeData，否则Tree组件可能会报key not exist警告
    if (unref(treeData).length === 0) {
      treeData.value = await getMenuInfo()
    }
    isUpdate.value = !!data?.isUpdate
    if (unref(isUpdate)) {
      menuIds.value = await menuByRoleId(data.record.id)
      setFieldsValue({
        menuIds,
        ...data.record,
      })
    }
  })
  const getMenuInfo = () => {
    return getMenuList({}).then((res) => {
      return res.data
    })
  }
  const getTitle = computed(() => (!unref(isUpdate) ? '新增角色' : '编辑角色'))
  function menuByRoleId(id) {
    return getRoleById(id).then((res) => {
      return res.data.menuIds
    })
  }
  async function handleSubmit() {
    try {
      const values = await validate()
      setModalProps({ confirmLoading: true })

      if (values.id) {
        updateRole(values).then(() => {
          createMessage.success('修改角色成功')
          closeModal()
          emit('success')
        })
      } else {
        addRole(values).then(() => {
          createMessage.success('新增角色成功')
          closeModal()
          emit('success')
        })
      }
    } finally {
      setModalProps({ confirmLoading: false })
    }
  }
</script>
