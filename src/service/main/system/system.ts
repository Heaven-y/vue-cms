import myRequest from '@/service'

// 获取用户列表数据
export function postUsersListData(queryInfo: any) {
  return myRequest.post({
    url: '/users/list',
    data: queryInfo
  })
}

export function deleteUserById(id: number) {
  return myRequest.delete({
    url: `/users/${id}`
  })
}

export function createUser(userInfo: any) {
  return myRequest.post({
    url: '/users',
    data: userInfo
  })
}

export function editUserData(id: number, userInfo: any) {
  return myRequest.patch({
    url: `/users/${id}`,
    data: userInfo
  })
}
