<template>
  <div class="res">
    <div class="register-container">
      <h2>用户注册</h2>
      <form @submit.prevent="register">
        <div class="form-group">
          <label for="username">用户名</label>
          <input id="username" v-model="username" class="custom-input" type="text" placeholder="请输入用户名" required>
          <div class="error-message" v-if="!isAccountValid">用户名不符合规则</div>
        </div>
        <div class="form-group">
          <label for="password">密码</label>
          <input id="password" v-model="password" class="custom-input" type="password" placeholder="请输入密码" required>
          <div class="error-message" v-if="!isPasswordValid">密码长度应为6到12个字符</div>
        </div>
        <div class="form-group">
          <label for="confirm-password">确认密码</label>
          <input id="confirm-password" v-model="confirmPassword" class="custom-input" type="password" placeholder="请再次输入密码" required>
          <div class="error-message" v-if="!isPasswordMatch">密码不匹配</div>
        </div>
        <div class="form-group">
          <label for="verification-code">验证码</label>
          <div class="verification-input">
            <input id="verification-code" v-model="verificationCode" class="custom-input" type="text" placeholder="请输入验证码" required>
            <button class="verification-button" @click="generateVerificationCode">获取验证码</button>
          </div>
        </div>
        <button class="register-button" :disabled="!isFormValid">注册</button>
      </form>
      <div class="login-link">
        已有账号？<router-link to="/">立即登录</router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      password: '',
      confirmPassword: '',
      verificationCode: '',
    };
  },
  computed: {
    isFormValid() {
      return this.isAccountValid && this.isPasswordValid && this.isPasswordMatch;
    },
    isAccountValid() {
      const accountRegex = /^[a-zA-Z0-9]{3,10}$/;
      return accountRegex.test(this.username);
    },
    isPasswordValid() {
      return this.password.length >= 6 && this.password.length <= 12;
    },
    isPasswordMatch() {
      return this.password === this.confirmPassword;
    },
  },
  methods: {
    generateVerificationCode() {
      this.verificationCode = Math.floor(Math.random() * 1000000).toString().padStart(6, '0');
    },
    register() {
      if (this.isFormValid) {
        // 执行注册逻辑
        // Registration logic goes here
      }
    }
  }
};
</script>

<style scoped>
.res {
  /*background-image: url("src/test_images/jswork.jfif");*/
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  background-image: url("src/test_images/jswork.jfif");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
}
.register-container {
  width: 400px;
  margin: 110px auto;
  padding: 20px;
  background-color: #f2f2f2;
  border-radius: 5px;
  background-image: url("src/test_images/780.jpg");
  background-repeat: no-repeat;
  background-size: 100% auto;
}

.register-container h2 {
  text-align: center;
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
}

.custom-input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.verification-input {
  display: flex;
}

.verification-button {
  margin-left: 10px;
}

.register-button {
  width: 100%;
  padding: 10px;
  background-color: #0085ff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
}

.login-link {
  text-align: center;
  margin-top: 20px;
}

.login-link a {
  color: #0085ff;
}

.error-message {
  color: red;
  font-size: 12px;
  margin-top: 5px;
}
</style>
