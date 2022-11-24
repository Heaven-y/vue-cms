<template>
  <div class="user-content">
    <div class="header">
      <h3 class="title">用户列表</h3>
      <el-button type="primary" @click="handleCreateUserClick">
        新建用户
      </el-button>
    </div>
    <!-- 表格展示 -->
    <div class="table">
      <el-table :data="usersList" border style="width: 100%">
        <el-table-column align="center" type="selection" />
        <el-table-column
          align="center"
          type="index"
          label="序号"
          width="60px"
        />
        <el-table-column
          align="center"
          label="用户名"
          prop="name"
          width="145px"
        />
        <el-table-column
          align="center"
          label="真实姓名"
          prop="realname"
          width="145px"
        />
        <el-table-column
          align="center"
          label="手机号码"
          prop="cellphone"
          width="150px"
        />
        <el-table-column
          align="center"
          label="状态"
          prop="enable"
          width="100px"
        >
          <template #default="scope">
            <el-button
              :type="scope.row.enable ? 'success' : 'info'"
              plain
              size="small"
            >
              {{ scope.row.enable ? '启用' : '禁用' }}
            </el-button>
          </template>
        </el-table-column>
        <el-table-column align="center" label="创建时间" prop="createAt">
          <template #default="scope">
            {{ formatUTC(scope.row.createAt) }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="更新时间" prop="updateAt">
          <template #default="scope">
            {{ formatUTC(scope.row.updateAt) }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作" width="150px">
          <template #default="scope">
            <el-button
              type="primary"
              size="small"
              icon="Edit"
              text
              @click="handleEditUserClick(scope.row)"
            >
              编辑
            </el-button>
            <el-popconfirm
              title="你确定要删除这个用户吗"
              @confirm="handleDeleteClick(scope.row.id)"
            >
              <template #reference>
                <el-button type="danger" size="small" icon="Delete" text>
                  删除
                </el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- 分页器 -->
    <div class="pagination">
      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSizge"
        :page-sizes="[10, 20, 30]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="usersTotalCount"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import useSystemStore from '@/store/main/system/system'
import { formatUTC } from '@/utils/format'

const emit = defineEmits(['createClick', 'editClick'])

// 1请求usersList数据
const systemStore = useSystemStore()
const currentPage = ref(1)
const pageSizge = ref(10)
fetchUserListData()
// 2获取数据进行展示
const { usersList, usersTotalCount } = storeToRefs(systemStore)

// 3定义函数发送网络请求
function fetchUserListData(formData: any = {}) {
  const size = pageSizge.value
  const offset = (currentPage.value - 1) * size
  const pageInfo = { offset, size }

  const queryInfo = { ...pageInfo, ...formData }
  systemStore.postUsersListAction(queryInfo)
}

// 4分页器的操作
function handleSizeChange() {
  fetchUserListData()
}
function handleCurrentChange() {
  fetchUserListData()
}

// 5删除/新建/编辑操作
function handleDeleteClick(id: number) {
  systemStore.deleteUserByIdAction(id)
}
function handleCreateUserClick() {
  emit('createClick')
}
function handleEditUserClick(forData: any) {
  emit('editClick', forData)
}

defineExpose({ fetchUserListData })
</script>

<style scoped lang="less">
.user-content {
  padding: 20px;
  background-color: #fff;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 10px;
  .title {
    font-size: 22px;
  }
}

.table {
  :deep(.el-table__cell) {
    padding: 12px 0;
  }
  .el-button {
    padding: 5px 8px;
  }
}

.pagination {
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
}
</style>
