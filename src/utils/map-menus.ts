import type { RouteRecordRaw } from 'vue-router'

function loadLocalRoutes() {
  // 存储了本地所有路由
  const localRoutes: RouteRecordRaw[] = []
  // 获取router/main目录中的所有ts文件
  const files: Record<string, any> = import.meta.glob('@/router/main/**/*.ts', {
    eager: true
  })
  // console.log(files)
  for (const key in files) {
    const module = files[key]
    // 每个对象都放入localRoute中
    localRoutes.push(module.default)
  }
  // console.log(localRoutes)
  return localRoutes
}

export let firstMenu: any = null
export function mapMenusToRoutes(userMenus: any[]) {
  // 加载本地路由
  const localRoutes = loadLocalRoutes()
  // 遍历自身menus来添加正确路由
  const routes: RouteRecordRaw[] = []
  for (const menu of userMenus) {
    for (const submenu of menu.children) {
      const route = localRoutes.find((item) => item.path === submenu.url)
      if (route) {
        // 输入一级路由url进行重定向(只需添加一次即可)
        if (!routes.find((item) => item.path === menu.url)) {
          routes.push({ path: menu.url, redirect: submenu.url })
        }
        routes.push(route)
      }
      // 记录第一次进入时的菜单
      if (!firstMenu && route) firstMenu = submenu
    }
  }
  return routes
}

/**
 *
 * @param path 要匹配的路由
 * @param userMenus 用户菜单
 * @returns 返回某个匹配的路由菜单
 */
export function mapPathToMenus(path: string, userMenus: any[]) {
  for (const menu of userMenus) {
    for (const submenu of menu.children) {
      if (path === submenu.url) {
        return submenu
      }
    }
  }
}

export function mapPathToCrumbs(path: string, userMenus: any[]) {
  const breadcrumbs = []
  for (const menu of userMenus) {
    for (const submenu of menu.children) {
      if (path === submenu.url) {
        // 顶层菜单
        breadcrumbs.push({ name: menu.name, path: menu.url })
        // 匹配菜单
        breadcrumbs.push({ name: submenu.name, path: submenu.url })
        return breadcrumbs
      }
    }
  }
}
