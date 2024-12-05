<template>
  <div class="login-container">
    <div class="login-card">
      <h1>欢迎登录酒店管理系统</h1>
      <form @submit.prevent="handleLogin">
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

        <button type="submit" :disabled="isLoading">
          {{ isLoading ? "登录中..." : "登录" }}
        </button>
        <p v-if="error" class="error-message">{{ errorMessage }}</p>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: "",
      password: "",
      isLoading: false,
      error: false,
      errorMessage: "",
    };
  },
  methods: {
    async handleLogin() {
      if (!this.username || !this.password) {
        this.error = true;
        this.errorMessage = "用户名和密码不能为空";
        return;
      }

      this.error = false;
      this.isLoading = true;
    },
  },
};
</script>

<style scoped>

.login-container {
  overflow: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center; /* 改为顶部对齐 */
  width: 100vw;
  height: 100vh;
  background: #ffffff;
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
</style>
