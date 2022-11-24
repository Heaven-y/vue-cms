import { defineStore } from 'pinia'
import { getEntireDepartments, getEntireRoles } from '@/service/main/main'

interface IMainState {
  entireRoles: any[]
  entireDepartments: any[]
}

const useMainStore = defineStore('main', {
  state: (): IMainState => ({
    entireRoles: [],
    entireDepartments: []
  }),
  actions: {
    // 获取整个角色和部门列表,在登录时调用
    async fetchEntireRolesAction() {
      const rolesRes = await getEntireRoles()
      this.entireRoles = rolesRes.data.list
    },
    async fetchEntireDepartmentsAction() {
      const departmentsRes = await getEntireDepartments()
      this.entireDepartments = departmentsRes.data.list
    }
  }
})

export default useMainStore
