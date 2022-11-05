import myRequest from '..'
import type { IAccount } from '@/types'

export function LoginRequest(account: IAccount) {
  return myRequest.post({
    url: '/login',
    data: account
  })
}

export function getUserInfoById(id: number) {
  return myRequest.get({
    url: `/users/${id}`
  })
}

export function getUserMenuByRoleId(id: number) {
  return myRequest.get({
    url: `/role/${id}/menu`
  })
}
