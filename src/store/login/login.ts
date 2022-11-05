import LoginRequest from '@/service/login/login'
import { defineStore } from 'pinia'

const useLoginStore = defineStore('login', {
  state: () => ({
    id: '',
    name: '',
    token: ''
  }),
  actions: {
    async LoginAction(account: IAccount) {
      const LoginRes = await LoginRequest(account)
      console.log(LoginRes)
    }
  }
})

export default useLoginStore
