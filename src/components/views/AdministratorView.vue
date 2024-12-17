<template>
  <div class="account-management">
    <div class="account-management-container">
      <!-- 标题 -->
      <h2 class="account-page-title">账号管理</h2>
      <!-- 搜索框 -->
      <el-input
          v-model="search"
          size="large"
          placeholder="输入姓名查询"
          clearable
          class="search-bar"
      />
      <!-- 账号表格 -->
      <el-table
          class="display-account-table"
          :data="filteredAccounts"
          style="max-width: 960px; width: 100%"
      >
        <el-table-column prop="id" label="ID" width="80" />
        <!-- 姓名列 -->
        <el-table-column prop="username" label="账号" width="120" />
        <!-- 角色列 -->
        <el-table-column prop="role" label="角色" width="200" />
        <!-- 操作列 -->
        <el-table-column align="right">
          <template #header>操作</template>
          <template #default="scope">
            <el-button
                size="small"
                type="danger"
                :disabled="scope.row.role === 'ADMIN'"
                @click="confirmDelete(scope.row)"
            >
              删除账号
            </el-button>
            <el-button
                size="small"
                type="warning"
                @click="resetPassword(scope.row)"
            >
              重置密码
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script lang="ts">
import { ElMessage, ElMessageBox } from "element-plus";
import { listEmployee, deleteEmployee, resetPass, getId } from "@/services/admin";
import router from "@/router";

export default {
  name: "AccountManagement",
  data() {
    console.log(getId())
    return {
      localId: getId(),
      search: "", // 搜索关键字
      accountList: [], // 账号列表数据
    };
  },
  computed: {
    // 根据搜索条件过滤账号列表
    filteredAccounts() {
      return this.accountList.filter((account) =>
          account.username.toLowerCase().includes(this.search.toLowerCase())
      );
    },
  },
  created() {
    // 获取账号列表数据
    listEmployee()
        .then((response) => {
          console.log(response.data);
          this.accountList = response.data.map((employee) => ({
            id: employee.id,
            username: employee.username,
            role: employee.role,
          }));
        })
        .catch((error) => {
          console.error("获取账号数据失败:", error);
        });
  },
  methods: {
    // 重置密码
    resetPassword(account) {
      resetPass(account.id).then(response => {
        ElMessage.success(`密码已成功重置: ${account.name}`);
        if(getId().toString() === account.id.toString()){
          this.$router.push('/login');
        }
      }).catch(error => {
        console.error("重置密码失败:", error);
        ElMessage.error(`重置密码失败: ${account.username}`);
      })
    },
    // 确认删除账号
    confirmDelete(account) {
      ElMessageBox.confirm(
          `确定要删除账号 \"${account.username}\" 吗？`,
          "删除确认",
          {
            confirmButtonText: "删除",
            cancelButtonText: "取消",
            type: "warning",
          }
      )
          .then(() => this.deleteAccount(account))
          .catch(() => {
            ElMessage.info("取消删除操作");
          });
    },
    // 删除账号
    async deleteAccount(account) {
      try {
        const id = account.id
        const accountName = account.username;
        if(id === getId()){
          ElMessage.error(`删除账号失败: 你不能删除自己`);

        }
        await deleteEmployee(id); // 调用后端删除接口
        this.accountList = this.accountList.filter(
            (account) => account.username !== accountName
        );
        ElMessage.success(`账号 \"${accountName}\" 已删除`);
      } catch (error) {
        console.error("删除账号失败:", error);
        ElMessage.error(`删除账号失败`);
      }
    },
  },
};
</script>

<style scoped>
.account-management {
  user-select: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: transparent;
  box-sizing: border-box;
  height: 100%;
}

.account-management-container {
  border-radius: 0.5rem;
  padding: 2rem;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1); /* 添加阴影效果 */
  box-sizing: border-box;
  background: #ffffff;
  height: 90%;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.display-account-table {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 1rem;
  width: auto;
  height: auto;
  flex-grow: 1;
  overflow-y: auto;
  border-radius: 8px; /* 表格圆角 */
}

.account-page-title {
  font-size: 40px;
  text-align: center;
  margin-bottom: 20px;
}

.search-bar {
  margin-bottom: 10px;
  width: 800px;
  height: 45px;
  display: flex;
  justify-content: center;
}
</style>
