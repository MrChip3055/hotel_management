<template>
  <div class="login-container">
    <div class="login-card">
      <h1 v-if="isLogin">欢迎登录酒店管理系统</h1>
      <h1 v-else>注册新账户</h1>
      <form @submit.prevent="isLogin ? handleLogin() : handleRegister()">
        <div class="form-group">
          <label for="username">用户名</label>
          <input
              id="username"
              v-model="username"
              type="text"
              placeholder="请输入用户名"
              :class="{ 'is-invalid': error && !username }"
          />
        </div>
        <div class="form-group">
          <label for="password">密码</label>
          <input
              id="password"
              v-model="password"
              type="password"
              placeholder="请输入密码"
              :class="{ 'is-invalid': error && !password }"
          />
        </div>
        <div v-if="!isLogin" class="form-group">
          <label for="confirm-password">确认密码</label>
          <input
              id="confirm-password"
              v-model="confirmPassword"
              type="password"
              placeholder="请再次输入密码"
              :class="{ 'is-invalid': error && !confirmPassword }"
          />
        </div>
        <div v-if="!isLogin" class="form-group">
          <label for="role">选择角色</label>
          <el-form-item>
            <el-select v-model="role" placeholder="请选择角色">
              <el-option
                  v-for="r in roles"
                  :key="r.name"
                  :label="r.fullName"
                  :value="r.name"
              />
            </el-select>
          </el-form-item>
        </div>

        <button type="submit" :disabled="isLoading">
          {{ isLoading ? (isLogin ? "登录中..." : "注册中...") : (isLogin ? "登录" : "注册") }}
        </button>
      </form>
      <p>
        {{ isLogin ? "没有账号？" : "已有账号？" }}
        <a href="#" @click.prevent="toggleMode">
          {{ isLogin ? "注册" : "登录" }}
        </a>
      </p>
    </div>

    <!-- 错误弹窗 -->
    <el-dialog
        class="showError-dialog"
        v-model="showErrorDialog"
        title="错误提示"
        :show-close="true"
        width="400px"
        center>
      <span>{{ errorMessage }}</span>
      <template #footer>
        <el-button type="primary" @click="showErrorDialog = false">确定</el-button>
      </template>
    </el-dialog>

  </div>
</template>


<script>
import { login, register } from '@/services/auth';
import router from "@/router/index.js";

export default {
  data() {
    return {
      roles: [
        {
          name: 'ADMIN',
          fullName: '管理员'
        },
        {
          name: 'RECEPTIONIST',
          fullName: '接待员'
        }
      ],
      role: null,
      isLogin: true,
      username: '',
      password: '',
      confirmPassword: '',
      isLoading: false,
      error: false,
      errorMessage: '',
      showErrorDialog: false, // 控制弹窗显示
    };
  },
  methods: {
    toggleMode() {
      this.isLogin = !this.isLogin;
      this.clearForm();
    },
    clearForm() {
      this.username = '';
      this.password = '';
      this.confirmPassword = '';
      this.error = false;
      this.errorMessage = '';
    },
    async handleLogin() {
      if (!this.username || !this.password) {
        this.errorMessage = '用户名和密码不能为空';
        this.showErrorDialog = true;
        return;
      }
      this.isLoading = true;
      try {
        const response = await login(this.username, this.password);
        this.isLoading = false;
        if (response.status === 200) {
          alert('登录成功');
          await router.push('/employee');
        } else {
          this.errorMessage = response.message || '登录失败';
          this.showErrorDialog = true;
        }
      } catch (err) {
        this.isLoading = false;
        this.errorMessage = err?.data || '服务器出错';
        this.showErrorDialog = true;
      }
    },
    async handleRegister() {
      if (!this.username || !this.password || !this.confirmPassword || !this.role) {
        this.errorMessage = '请填写所有字段';
        this.showErrorDialog = true;
        return;
      }
      if (this.password !== this.confirmPassword) {
        this.errorMessage = '两次输入的密码不一致';
        this.showErrorDialog = true;
        return;
      }
      this.isLoading = true;
      try {
        const response = await register(this.username, this.password, this.role);
        this.isLoading = false;
        alert(`注册成功：${response.message}`);
        this.toggleMode();
      } catch (err) {
        this.isLoading = false;
        this.errorMessage = err?.data || '注册失败';
        this.showErrorDialog = true;
      }
    },
  },
};

</script>


<style scoped>
::v-deep(.el-input__inner::placeholder),
::v-deep(.el-select__placeholder) {
  font-size: 1rem; /* 字体大小与输入框一致 */
  font-weight: normal; /* 字体粗细与其他提示信息一致 */
  color: rgb(117,117,117);
}


.login-container {
  user-select: none;
  overflow: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background: rgb(254, 247, 255);
}

.login-card {
  box-sizing: border-box;
  background: #fff;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;

  width: 65%;
  height: min-content;
  max-width: 520px;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}


h1 {
  margin-bottom: 1.5rem;
  font-size: 1.5rem;
  color: #333;
}

.form-group {
  margin-bottom: 1rem;
  text-align: left;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  color: #555;
}

input {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  box-sizing: border-box;
}

input.is-invalid {
  border-color: red;
}

button {
  width: 100%;
  padding: 0.75rem;
  font-size: 1rem;
  color: #fff;
  background: #007bff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:disabled {
  background: #aaa;
  cursor: not-allowed;
}

.error-message {
  color: red;
  margin-top: 1rem;
}

a {
  color: #007bff;
  cursor: pointer;
}

a:hover {
  text-decoration: underline;
}
</style>
