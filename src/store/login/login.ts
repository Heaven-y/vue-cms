import { defineStore } from 'pinia'
import {
  getUserInfoById,
  getUserMenuByRoleId,
  LoginRequest
} from '@/service/login/login'
import type { IAccount } from '@/types'
import { localCache } from '@/utils/cache'
import { LOGIN_TOKEN } from '@/global/constans'
import router from '@/router'
import { mapMenusToRoutes } from '@/utils/map-menus'
import useMainStore from '../main/main'

interface MyLoginStore {
  token: string
  userInfo: any
  userMenus: any
}

const useLoginStore = defineStore('login', {
  state: (): MyLoginStore => ({
    token: '',
    userInfo: {},
    userMenus: []
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

      // 请求所有的角色/部门列表数据
      const mainStore = useMainStore()
      mainStore.fetchEntireRolesAction()
      mainStore.fetchEntireDepartmentsAction()

      // 动态添加路由
      const routes = mapMenusToRoutes(userMenus)
      routes.forEach((route) => router.addRoute('main', route))

      router.push('/main')
    },
    // 刷新后的动作
    loadLocalCacheAction() {
      const token = localCache.getCache(LOGIN_TOKEN)
      const userInfo = localCache.getCache('userInfo')
      const userMenus = localCache.getCache('userMenus')
      if (token && userInfo && userMenus) {
        this.userInfo = userInfo
        this.token = token
        this.userMenus = userMenus

        // 请求所有的角色/部门列表数据
        const mainStore = useMainStore()
        mainStore.fetchEntireRolesAction()
        mainStore.fetchEntireDepartmentsAction()

        // 动态添加路由
        const routes = mapMenusToRoutes(userMenus)
        routes.forEach((route) => router.addRoute('main', route))
      }
    }
  }
})

export default useLoginStore
