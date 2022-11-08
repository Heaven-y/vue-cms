<template>
  <div class="login-panel">
    <h1 class="title">水果铺子</h1>

    <div class="tabs">
      <el-tabs type="border-card" stretch v-model="activeWays">
        <!-- 帐号登录 -->
        <el-tab-pane name="account">
          <template #label>
            <el-icon><UserFilled /></el-icon>
            <span class="text">帐号登录</span>
          </template>
          <pane-account ref="accountRef" />
        </el-tab-pane>

        <!-- 手机登录 -->
        <el-tab-pane name="phone">
          <template #label>
            <el-icon><Iphone /></el-icon>
            <span class="text">手机登录</span>
          </template>
          <pane-phone />
        </el-tab-pane>
      </el-tabs>
    </div>

    <div class="control">
      <el-checkbox v-model="isRemPwd" label="记住密码" />
      <div class="control-right">
        <el-link type="primary" class="register" @click="handleRegister">
          注册帐号
        </el-link>
        <el-link type="primary">忘记密码</el-link>
      </div>
    </div>

    <el-button
      class="login-btn"
      type="primary"
      size="large"
      @click="handleLoginBtnClick"
    >
      立即登录
    </el-button>
  </div>
</template>

<script setup lang="ts">
import router from '@/router'
import { localCache } from '@/utils/cache'
import { ref, watch } from 'vue'
import PaneAccount from './pane-account.vue'
import PanePhone from './pane-phone.vue'

const activeWays = ref('account')

const isRemPwd = ref<boolean>(localCache.getCache('isRemPwd') ?? false)
watch(isRemPwd, (newValue) => {
  localCache.setCache('isRemPwd', newValue)
})

const accountRef = ref<InstanceType<typeof PaneAccount>>()
function handleLoginBtnClick() {
  if (activeWays.value === 'account') {
    accountRef.value?.loginAction(isRemPwd.value)
  } else {
    console.log('当前使用的是手机登录')
  }
}

function handleRegister() {
  router.push('./register')
}
</script>

<style lang="less" scoped>
.login-panel {
  width: 330px;
  margin-bottom: 140px;

  .title {
    text-align: center;
    margin-bottom: 18px;
  }

  .tabs {
    .text {
      margin-left: 5px;
    }
  }

  .control {
    display: flex;
    margin-top: 3px;
    justify-content: space-between;
    .control-right {
      padding-top: 4px;
      .register {
        margin-right: 5px;
      }
    }
  }

  .login-btn {
    width: 100%;
    margin-top: 8px;
  }
}
</style>
