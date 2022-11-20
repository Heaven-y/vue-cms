import { createRouter, createWebHashHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import { localCache } from '@/utils/cache'
import { LOGIN_TOKEN } from '@/global/constans'
import { firstMenu } from '@/utils/map-menus'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/main'
  },
  {
    path: '/login',
    component: () => import('@/views/login/Login.vue')
  },
  {
    path: '/main',
    name: 'main',
    component: () => import('@/views/main/main.vue')
  },
  {
    path: '/register',
    component: () => import('@/views/register/Register.vue')
  },
  {
    path: '/:pathMatch(.*)',
    component: () => import('@/views/not-found/NotFound.vue')
  }
]
const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to) => {
  const token = localCache.getCache(LOGIN_TOKEN)
  if (!token && to.path.startsWith('/main')) {
    return '/login'
  }

  if (to.path === '/main') {
    return firstMenu.url
  }
})

export default router
