<template>
  <div class="pane-account">
    <el-form
      label-width="60px"
      :model="account"
      :rules="accountRules"
      size="large"
      ref="formRef"
    >
      <el-form-item label="帐号" prop="name">
        <el-input v-model="account.name" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="account.password" show-password />
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { ElMessage } from 'element-plus'
import type { ElForm, FormRules } from 'element-plus'
import type { IAccount } from '@/types'
import useLoginStore from '@/store/login/login'
import { localCache } from '@/utils/cache'

const account = reactive<IAccount>({
  name: localCache.getCache('name') ?? '',
  password: localCache.getCache('password') ?? ''
})

// 定义校验规则
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

// 登录逻辑
const formRef = ref<InstanceType<typeof ElForm>>()
const loginStore = useLoginStore()
function loginAction(isRemPwd: boolean) {
  // 先对整个表单验证
  formRef.value?.validate((isValid) => {
    if (isValid) {
      const name = account.name
      const password = account.password
      loginStore.LoginAction({ name, password }).then(() => {
        if (isRemPwd) {
          localCache.setCache('name', name)
          localCache.setCache('password', password)
        } else {
          localCache.setCache('name')
          localCache.removeCache('password')
        }
      })
    } else {
      ElMessage.error('请您先输入正确的格式再进行登录操作')
    }
  })
}

defineExpose({
  loginAction
})
</script>

<style lang="less" scoped>
.pane-account {
}
</style>
