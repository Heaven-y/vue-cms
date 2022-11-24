import myRequest from '..'

// 获取整个角色和部门列表
export function getEntireRoles() {
  return myRequest.post({
    url: '/role/list'
  })
}
export function getEntireDepartments() {
  return myRequest.post({
    url: '/department/list'
  })
}
