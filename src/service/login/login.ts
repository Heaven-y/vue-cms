import myRequest from '..'

export default function LoginRequest(account: IAccount) {
  return myRequest.post({
    url: '/login',
    data: account
  })
}
