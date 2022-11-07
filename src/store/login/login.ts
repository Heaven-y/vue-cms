import {
  getUserInfoById,
  getUserMenuByRoleId,
  LoginRequest
} from '@/service/login/login'
import { defineStore } from 'pinia'
import type { IAccount } from '@/types'
import { localCache } from '@/utils/cache'
import { LOGIN_TOKEN } from '@/global/constans'
import router from '@/router'

const useLoginStore = defineStore('login', {
  state: () => ({
    token: '',
    userInfo: localCache.getCache('userInfo') ?? {},
    userMenus: localCache.getCache('userMenus') ?? []
  }),
  actions: {
    async LoginAction(account: IAccount) {
      // 帐号登录，获取token信息
      const LoginRes = await LoginRequest(account)
      const id = LoginRes.data.id
      this.token = LoginRes.data.token
      localCache.setCache(LOGIN_TOKEN, this.token)

      // 根据id获取用户详细信息(role)
      const userInfoRes = await getUserInfoById(id)
      const userInfo = userInfoRes.data
      this.userInfo = userInfo
      // console.log(userInfo)

      // 根据角色请求用户权限(menu)
      const userMenusRes = await getUserMenuByRoleId(userInfo.role.id)
      const userMenus = userMenusRes.data
      this.userMenus = userMenus
      // console.log(userMenu)

      // 本地缓存
      localCache.setCache('userInfo', userInfo)
      localCache.setCache('userMenus', userMenus)

      router.push('/main')
    }
  }
})

export default useLoginStore
