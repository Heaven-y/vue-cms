import { createPinia } from 'pinia'
import type { App } from 'vue'
import useLoginStore from './login/login'

const pinia = createPinia()

function registerStore(app: App) {
  app.use(pinia)

  // 手动刷新后先加载本地数据(动态添加路由)
  const loginStore = useLoginStore()
  loginStore.loadLocalCacheAction()
}

export default registerStore
