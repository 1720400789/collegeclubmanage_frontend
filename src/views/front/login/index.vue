<script setup>
import { ref } from "vue";
import {storeToRefs} from "pinia";
import {ElMessage} from "element-plus";
import {useFrontUserStore} from "@/stores/front_userStore";
import {useRouter} from "vue-router";

const username = ref('')
const password = ref('')
const router = useRouter()
const userStore = useFrontUserStore()
//从store中得到登录接口的响应
const { user_res } = storeToRefs(userStore)
// 3. 获取form实例做统一校验
const login = async () => {
  const mAccount = username.value
  const mPassword = password.value
  console.log(mAccount)
  await userStore.getUserInfo({ mAccount, mPassword })
  // console.log(user_res.value.data)
  if(String(user_res.value.code) === '1'){
    // 1. 提示用户
    ElMessage({ type: 'success', message: '登录成功' })
    localStorage.setItem('u_Info',JSON.stringify(user_res.value.data.mAccount))
    localStorage.setItem('u_Id', user_res.value.data.id)
    const loginData = {
      username:mAccount,
      password:mPassword
    }
    localStorage.setItem('loginData', JSON.stringify(loginData));
    // router.replace({path: '/front'})
    router.push('/front');
  }
  else if(user_res.value.msg === '账号已禁用'){
    //提醒账号密码不匹配或被禁用
    ElMessage({ type: 'error', message: '账号已禁用，请联系管理员老师'})
  }
  else if(user_res.value.msg === '登录失败'){
    ElMessage({ type: 'error', message: '登录失败请检查用户名和密码'})
  }
}

</script>

<template>
  <div class="front_container">
  <div class="top">
    <div class="logo"><img src="../../../assets/images/shuanQ.jpg" ></div>
    <div class="adm-login"><router-link to="/login" class="textcolor">管理员登录>></router-link></div>
  </div>
  <div class="login-container">
    <div class="login-form">
      <h1>社团用户登录</h1>
      <!-- 登录表单 -->
      <div>
        <input type="text" v-model="username" placeholder="账号" required>
        <input type="password" v-model="password" placeholder="密码" required>
        <button @click="login">登录</button>
      </div>
      <p>没有账号? <router-link to="/reg" class="res-text">注册</router-link></p>
    </div>
  </div>
    <div class="footer">
      <div class="mess">
        <p>
          <a href="#">关于我们</a>|
          <a href="#">帮助中心</a>|
          <a href="#">售后服务</a>|
          <a href="#">联系老师</a>|
          <a href="#">搜索推荐</a>|
          <a href="#">友情链接</a>
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.front_container {
  width: 100%;
  height: 100vh;
  background-image: url("src/assets/images/980.jpg");
  background-repeat: no-repeat;
  background-size: 100% auto;
}
.top {
  display: flex;
  height: 100px;
  /*background-color: #fae2cd;*/
}
.logo {
  margin-left: 30px;
  display: flex;
  /*margin-left: 30px;*/
  width: 250px;
  height: 100px;
}
.logo img {
  width: 100%;
  height: 100%;
}
.adm-login {
  display: flex;
  margin-top: 55px;
  height: 20px;
  margin-left: 950px;
  font-size: 15px;
  /*background-color: #409eff;*/
}
.textcolor {
  color: #181818;
}
.login-container {
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 250px);
}

.login-form {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #f0f0f0;
}
.login-container input[type="text"],
.login-container input[type="password"] {
  padding: 10px;
  margin: 10px 0;
  width: 100%;
  border-radius: 5px;
  border: 1px solid #ccc;
  box-sizing: border-box;
}
.login-container button {
  padding: 10px;
  margin: 10px 0;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  width: 100%;
}

.login-container button:hover {
  background-color: #3e8e41;
}
.res-text {
  color: firebrick;
  text-decoration: underline;
}
.res-text:hover {
  color: #409eff;
  text-decoration: none;
}
.footer {
  display: flex;
  height: 150px;
  /*background-color: red;*/
}
.mess {
  display: flex;
  margin-left: 500px;
}
.mess p a {
  margin-right: 10px;
  margin-left: 10px;
  color: #181818;
}
</style>

