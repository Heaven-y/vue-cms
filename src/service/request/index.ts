import axios from 'axios'
import type { AxiosInstance } from 'axios'
import type { MYRequestConfig } from './type'

class MYRequest {
  instance: AxiosInstance
  constructor(config: MYRequestConfig) {
    this.instance = axios.create(config)

    // 全局拦截器：所有实例都有的拦截器
    this.instance.interceptors.request.use(
      (config) => {
        return config
      },
      (err) => {
        console.log('所有实例的请求拦截器： 请求失败拦截')
        return err
      }
    )
    this.instance.interceptors.response.use(
      (res) => {
        const data = res.data
        // 取到data后
        // .request<any, AxiosResponse>(config)
        // 变成.request<any, T>(config)
        return data
      },
      (err) => {
        console.log('所有实例的响应拦截器： 响应失败拦截')
        return err
      }
    )

    // 实例拦截器：针对特定实例的拦截器
    this.instance.interceptors.request.use(
      config.interceptors?.requestInterceptor,
      config.interceptors?.requestInterceptorCatch
    )
    this.instance.interceptors.response.use(
      config.interceptors?.responseInterceptor,
      config.interceptors?.responseInterceptorCatch
    )
  }

  request<T>(config: MYRequestConfig<T>): Promise<T> {
    // 单次请求拦截器：针对单次请求成功的拦截器
    if (config.interceptors?.requestInterceptor) {
      config.interceptors.requestInterceptor(config)
    }

    return new Promise((resolve, reject) => {
      this.instance
        .request<any, T>(config)
        .then((res) => {
          // 针对单次响应成功的拦截器
          if (config.interceptors?.responseInterceptor) {
            res = config.interceptors.responseInterceptor(res)
          }
          resolve(res)
        })
        .catch((err) => {
          reject(err)
        })
    })
  }

  get<T = any>(config: MYRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'GET' })
  }
  post<T = any>(config: MYRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'POST' })
  }
  delete<T = any>(config: MYRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'DELETE' })
  }
  patch<T = any>(config: MYRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'PATCH' })
  }
}

export default MYRequest
