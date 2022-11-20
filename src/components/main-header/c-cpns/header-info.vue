<template>
  <div class="header-info">
    <!-- 图标 -->
    <div class="operation">
      <span>
        <el-icon> <Message /></el-icon>
      </span>
      <span>
        <span class="dot"></span>
        <el-icon> <ChatDotRound /></el-icon>
      </span>
      <span>
        <el-icon> <Search /></el-icon>
      </span>
    </div>

    <div class="info">
      <el-dropdown>
        <span class="user-info"> {{ name }}</span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="handleExitClick">
              <el-icon><CircleClose /></el-icon>
              <span>退出系统</span>
            </el-dropdown-item>
            <el-dropdown-item divided>
              <el-icon><InfoFilled /></el-icon>
              <span>个人信息</span>
            </el-dropdown-item>
            <el-dropdown-item>
              <el-icon><Unlock /></el-icon>
              <span>修改密码</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup lang="ts">
import { LOGIN_TOKEN } from '@/global/constans'
import { localCache } from '@/utils/cache'
import { useRouter } from 'vue-router'

const router = useRouter()
const name = localCache.getCache('name')
function handleExitClick() {
  localCache.removeCache(LOGIN_TOKEN)
  router.push('/login')
}
</script>

<style scoped lang="less">
.header-info {
  display: flex;
  align-items: center;
}

.operation {
  display: flex;
  margin-right: 20px;
  span {
    width: 40px;
    height: 35px;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    .dot {
      position: absolute;
      top: 6px;
      right: 9px;
      z-index: 999;
      width: 6px;
      height: 6px;
      background-color: red;
      border-radius: 100%;
    }

    &:hover {
      background-color: #f2f2f2;
    }
    i {
      font-size: 20px;
    }
  }
}

.info {
  .user-info {
    padding-right: 10px;
    cursor: pointer;
  }
}
.info {
  // 挂载在#app外
  :global(.el-dropdown-menu__item) {
    line-height: 36px !important;
    padding: 6px 22px;
  }
}
</style>
