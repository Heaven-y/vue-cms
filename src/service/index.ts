import { LOGIN_TOKEN } from '@/global/constans'
import { localCache } from '@/utils/cache'
import MYRequest from './request'
import { BASE_URL, TIME_OUT } from './request/config'

const myRequest = new MYRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  interceptors: {
    requestInterceptor(config) {
      const token = localCache.getCache(LOGIN_TOKEN)
      if (token && config.headers) {
        config.headers.Authorization = 'Bearer ' + token
      }
      return config
    }
  }
})

export default myRequest
