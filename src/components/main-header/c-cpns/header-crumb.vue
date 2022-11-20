<template>
  <div class="header-crumb">
    <el-breadcrumb separator-icon="CaretRight">
      <template v-for="item in breadcrumbs" :key="item.name">
        <el-breadcrumb-item :to="item.path">
          {{ item.name }}
        </el-breadcrumb-item>
      </template>
    </el-breadcrumb>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import useLoginStore from '@/store/login/login'
import { mapPathToCrumbs } from '@/utils/map-menus'

// 从localCache中取到的Menus不知道类型
const userMenus = useLoginStore().userMenus
const route = useRoute()
const breadcrumbs = computed(() => mapPathToCrumbs(route.path, userMenus))
</script>

<style scoped lang="less"></style>
