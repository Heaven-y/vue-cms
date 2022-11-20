<template>
  <div class="main-header">
    <div class="menu-icon" @click="handleMenuIconClick">
      <el-icon size="28px">
        <component :is="isFold ? 'Expand' : 'Fold'" />
      </el-icon>
    </div>
    <div class="content">
      <header-crumb />
      <header-info />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import HeaderInfo from './c-cpns/header-info.vue'
import HeaderCrumb from './c-cpns/header-crumb.vue'

const emit = defineEmits(['foldChange'])

const isFold = ref(false)
function handleMenuIconClick() {
  // 内部状态改变
  isFold.value = !isFold.value

  emit('foldChange', isFold.value)
}
</script>

<style scoped lang="less">
.main-header {
  height: 100%;
  display: flex;
  align-items: center;

  .menu-icon {
    cursor: pointer;
  }
  .content {
    display: flex;
    justify-content: space-between;
    flex: 1;
    align-items: center;
    padding: 0 18px;
  }
}
</style>
