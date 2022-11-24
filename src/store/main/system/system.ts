import {
  createUser,
  deleteUserById,
  editUserData,
  postUsersListData
} from '@/service/main/system/system'
import { defineStore } from 'pinia'
import type { ISystemState } from './type'

const useSystemStore = defineStore('system', {
  state: (): ISystemState => ({
    usersList: [],
    usersTotalCount: 0,

    pageList: [],
    pageTotalCount: 0
  }),
  actions: {
    // 获取用户列表数据
    async postUsersListAction(queryInfo: any) {
      const usersListRes = await postUsersListData(queryInfo)
      const { totalCount, list } = usersListRes.data
      // console.log(usersListRes)

      this.usersList = list
      this.usersTotalCount = totalCount
    },
    // 删除/新建/修改某个用户
    async deleteUserByIdAction(id: number) {
      const deleteRes = await deleteUserById(id)
      console.log(deleteRes)

      // 删除后重新请求新数据
      this.postUsersListAction({ offset: 0, size: 10 })
    },
    async createUserAction(userInfo: any) {
      const createRes = await createUser(userInfo)
      console.log(createRes)

      this.postUsersListAction({ offset: 0, size: 10 })
    },
    async editUserDataAction(id: number, userInfo: any) {
      const editRes = await editUserData(id, userInfo)
      console.log(editRes)

      this.postUsersListAction({ offset: 0, size: 10 })
    }
  }
})

export default useSystemStore
