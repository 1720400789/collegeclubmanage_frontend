<script>
import {ElMessage} from "element-plus"
import { registerAPI } from "@/apis/front_user";

export default {
  data() {
    return {
      regForm:{
        mAccount: '',
        mPassword: '',
        mPhone: ''
      },
      confirmPassword: '',
      verificationCode: '',
    };
  },
  computed: {
    isFormValid() {
      return this.isAccountValid && this.isPasswordValid && this.isPasswordMatch && this.isPhoneValid;
    },
    isAccountValid() {
      const accountRegex = /^[a-zA-Z0-9]{3,16}$/;
      return accountRegex.test(this.regForm.mAccount);
    },
    isPasswordValid() {
      return this.regForm.mPassword.length >= 6 && this.regForm.mPassword.length <= 16;
    },
    isPasswordMatch() {
      return this.regForm.mPassword === this.confirmPassword;
    },
    isPhoneValid() {
      const phoneRegex = /^(13[0-9]{9})|(15[0-9]{9})|(17[0-9]{9})|(18[0-9]{9})|(19[0-9]{9})$/
      return phoneRegex.test(this.regForm.mPhone)
    }
  },
  methods: {
    generateVerificationCode() {
      this.verificationCode = Math.floor(Math.random() * 1000000).toString().padStart(6, '0');
    },
    async register() {
      console.log("注册中")
      if (this.isFormValid) {
        await registerAPI(this.regForm).then(res => {
          if(String(res.code) === '1') {
            ElMessage.success("注册成功！")
            this.$router.push({ path: '/' })
          }else {
            ElMessage.warning(res.msg || "请求错误，请重试")
          }
        }).catch(err => {
          console.log(err)
        })
      }else {
        ElMessage.info("请正确填写表单")
      }
    }
  }
};
</script>

<template>
  <div class="res">
    <div class="register-container">
      <h2>用户注册</h2>
      <div>
        <div class="form-group">
          <label for="username">用户名</label>
          <input id="username" v-model="regForm.mAccount" class="custom-input" type="text" placeholder="请输入用户名" required>
          <div class="error-message" v-if="!isAccountValid">用户名不符合规则</div>
        </div>
        <div class="form-group">
          <label for="password">密码</label>
          <input id="password" v-model="regForm.mPassword" class="custom-input" type="password" placeholder="请输入密码" required>
          <div class="error-message" v-if="!isPasswordValid">密码长度应为6到12个字符</div>
        </div>
        <div class="form-group">
          <label for="confirm-password">确认密码</label>
          <input id="confirm-password" v-model="confirmPassword" class="custom-input" type="password" placeholder="请再次输入密码" required>
          <div class="error-message" v-if="!isPasswordMatch">密码不匹配</div>
        </div>
        <div class="form-group">
          <label for="phone">手机号</label>
          <input id="phone" v-model="regForm.mPhone" class="custom-input" type="text" placeholder="请输入手机号" required>
          <div class="error-message" v-if="!isPhoneValid">手机号不合法</div>
        </div>
<!--        <div class="form-group">-->
<!--          <label for="verification-code">验证码</label>-->
<!--          <div class="verification-input">-->
<!--            <input id="verification-code" v-model="verificationCode" class="custom-input" type="text" placeholder="请输入验证码" required>-->
<!--            <button class="verification-button" @click="generateVerificationCode">获取验证码</button>-->
<!--          </div>-->
<!--        </div>-->
        <button class="register-button" @click="register">注册</button>
      </div>
      <div class="login-link">
        已有账号？<router-link to="/">立即登录</router-link>
      </div>
    </div>
  </div>
</template>

<style scoped>
.res {
  /*background-image: url("src/test_images/jswork.jfif");*/
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  background-image: url("src/assets/images/jswork.jfif");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
}
.register-container {
  width: 400px;
  margin: 60px auto;
  padding: 20px;
  background-color: #f2f2f2;
  border-radius: 5px;
  background-image: url("src/assets/images/780.jpg");
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
