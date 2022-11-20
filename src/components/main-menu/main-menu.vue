<template>
  <div class="main-menu">
    <!-- 1.logo -->
    <div class="logo">
      <img class="img" src="@/assets/img/logo.svg" alt="" />
      <h2 class="title" v-show="!isFlod">管理系统</h2>
    </div>

    <!-- 2.menu -->
    <div class="menu">
      <el-menu
        :default-active="defaultActive"
        text-color="#b7bdc3"
        active-text-color="#fff"
        background-color="#001529"
        :collapse="isFlod"
      >
        <template v-for="item in userMenus" :key="item.id">
          <!-- 主菜单 -->
          <el-sub-menu :index="item.id + ''">
            <template #title>
              <!-- 动态图标展示 -->
              <el-icon>
                <component :is="item.icon.split('-icon-')[1]" />
              </el-icon>
              <span>{{ item.name }}</span>
            </template>

            <!-- 子菜单 -->
            <template v-for="subitem in item.children" :key="subitem.id">
              <el-menu-item
                :index="subitem.id + ''"
                @click="handleRouteChange(subitem)"
              >
                {{ subitem.name }}
              </el-menu-item>
            </template>
          </el-sub-menu>
        </template>
      </el-menu>
    </div>
  </div>
</template>

<script setup lang="ts">
import useLoginStore from '@/store/login/login'
import { useRoute, useRouter } from 'vue-router'
import { computed } from 'vue'
import { mapPathToMenus } from '@/utils/map-menus'

defineProps({
  isFlod: {
    type: Boolean,
    default: false
  }
})

// 获取动态菜单
const loginStore = useLoginStore()
const userMenus = loginStore.userMenus
// 点击后切换路由
const router = useRouter()
function handleRouteChange(item: any) {
  const url = item.url
  router.push(url)
}

// ElMenu的active的改变
// url直接输入一级路由时也需要改变(computed)
const route = useRoute()
const defaultActive = computed(() => {
  const pathMenu = mapPathToMenus(route.path, userMenus)
  return pathMenu.id + ''
})
</script>

<style lang="less" scoped>
.main-menu {
  height: 100%;
  background-color: #001529;
}

.logo {
  display: flex;
  height: 28px;
  padding: 12px 10px 8px;
  align-items: center;
  .img {
    height: 100%;
    margin: 0 10px;
  }
  .title {
    font-size: 20px;
    font-weight: 700;
    color: #fff;
    white-space: nowrap;
  }
}

.el-menu {
  // 去掉右边框
  border-right: none;
  // 不让用户选中文本
  user-select: none;
}

.el-sub-menu {
  .el-menu-item {
    padding-left: 55px !important;
    background-color: #0c2135;
    &:hover {
      color: #fff;
    }
    &.is-active {
      background-color: #0a60bd;
    }
  }
}
</style>
