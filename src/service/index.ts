import MYRequest from './request'
import { BASE_URL, TIME_OUT } from './request/config'

const myRequest = new MYRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT
  // interceptors: {
  //   requestInterceptor(config) {
  //     console.log('单个实例的请求拦截器')
  //     return config
  //   }
  // }
})

export default myRequest
