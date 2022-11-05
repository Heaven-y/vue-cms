import { getUserInfoById, LoginRequest } from '@/service/login/login'
import { defineStore } from 'pinia'
import type { IAccount } from '@/types'
import { localCache } from '@/utils/cache'
import { LOGIN_TOKEN } from '@/global/constans'
import router from '@/router'

const useLoginStore = defineStore('login', {
  state: () => ({
    name: '',
    token: ''
  }),
  actions: {
    async LoginAction(account: IAccount) {
      // 帐号登录，获取token信息
      const LoginRes = await LoginRequest(account)
      this.token = LoginRes.data.token
      const id = LoginRes.data.id
      this.name = LoginRes.data.name

      localCache.setCache(LOGIN_TOKEN, this.token)

      // 根据id获取用户详细信息(role)
      const userInfoRes = await getUserInfoById(id)
      console.log(userInfoRes)
      const userInfo = userInfoRes.data

      // 根据角色请求用户权限(menu)

      router.push('/main')
    }
  }
})

export default useLoginStore
