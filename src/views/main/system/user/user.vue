<template>
  <div class="user">
    <user-search
      @query-click="handleQueryClick"
      @reset-click="handleResetClick"
    />
    <user-content
      @create-click="handleCreateClick"
      @edit-click="handleEditClick"
      ref="contentRef"
    />
    <user-modal ref="modalRef" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import userSearch from './c-cps/user-search.vue'
import userContent from './c-cps/user-content.vue'
import userModal from './c-cps/user-modal.vue'

// 对user-content组件进行操作
const contentRef = ref<InstanceType<typeof userContent>>()
// 查询/重置操作
function handleQueryClick(formData: any) {
  contentRef.value?.fetchUserListData(formData)
}
function handleResetClick() {
  contentRef.value?.fetchUserListData()
}

// 对user-modal组件进行操作
const modalRef = ref<InstanceType<typeof userModal>>()
// 新建/编辑操作
function handleCreateClick() {
  modalRef.value?.setModalVisible()
}
function handleEditClick(formData: any) {
  modalRef.value?.setModalVisible(false, formData)
}
</script>

<style scoped lang="less">
.user {
  border-radius: 8px;
  // 子元素超出部分隐藏,显示出圆角
  overflow: hidden;
}
</style>
