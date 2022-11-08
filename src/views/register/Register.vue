<template>
  <div class="register">
    <div class="register-content">
      <h2 class="title">注册帐号</h2>
      <div class="register-form">
        <el-form
          label-width="65px"
          :model="account"
          :rules="accountRules"
          size="large"
        >
          <el-form-item label="帐号" prop="name">
            <el-input v-model="account.name" />
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input v-model="account.password" show-password />
          </el-form-item>
        </el-form>
      </div>
      <div class="back">
        <el-link type="primary" @click="() => router.push('/login')">
          已有帐号?去登录
        </el-link>
      </div>
      <el-button
        class="register-btn"
        type="primary"
        size="large"
        @click="submitRegister"
      >
        注册
      </el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import type { IAccount } from '@/types'
import type { FormRules } from 'element-plus'
import router from '@/router'

const account = reactive<IAccount>({
  name: '',
  password: ''
})

const accountRules: FormRules = {
  name: [
    { required: true, message: '请输入您的帐号信息', trigger: 'blur' },
    {
      pattern: /^[a-zA-Z0-9]{3,10}$/,
      message: '帐号由3-10位的数字和字母组成',
      trigger: 'blur'
    }
  ],
  password: [
    { required: true, message: '请输入您的密码', trigger: 'blur' },
    { min: 3, message: '密码最少有三位及以上', trigger: 'blur' }
  ]
}

function submitRegister() {
  router.push('/login')
}
</script>

<style lang="less" scoped>
.register {
  background-image: url('@/assets/img/login-bg.svg');
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.register-content {
  width: 330px;
  margin-bottom: 140px;
  .title {
    text-align: center;
    margin-bottom: 18px;
  }

  .register-form {
    background-color: rgb(245, 247, 250);
    padding: 16px 10px 1px 0;
  }

  .back {
    margin-top: 4px;
    text-align: right;
  }

  .register-btn {
    width: 100%;
    margin-top: 16px;
  }
}
</style>
