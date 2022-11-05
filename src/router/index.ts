import { createRouter, createWebHashHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

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
    component: () => import('@/views/main/Main.vue')
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

export default router
