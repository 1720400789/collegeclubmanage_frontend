<template>
  <el-menu
      class="el-menu-demo"
      mode="horizontal"
      :router="true"
  >
    <el-menu-item index="/front">首页</el-menu-item>
    <el-menu-item index="/myclub">我的社团</el-menu-item>
    <el-menu-item index="/allclubs">其它社团</el-menu-item>
    <el-menu-item index="/annou">公告中心</el-menu-item>
    <el-menu-item index="/echarts">数据统计</el-menu-item>
    <el-menu-item index="/per">个人中心</el-menu-item>
    <el-icon size="30"><User /></el-icon>
    <div class="out" @click="outlogin">退出系统</div>

  </el-menu>
</template>

<script setup>
import {ElMessage, ElMessageBox} from "element-plus";
import router from "@/router";

const outlogin = () => {
  ElMessageBox.confirm(
      '确定要退出系统吗',
      'Warning',
      {
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancel',
        type: 'warning',
      }
  ).then(() => {
    localStorage.removeItem('u_Info')
    localStorage.removeItem('u_Id')
    // 2. 跳转首页
    router.replace({ path: '/' })
    ElMessage({
      type: 'success',
      message: '退出成功',
    })
  })
      .catch(() => {
        router.replace({ path: '/front' })
        ElMessage({
          type: 'info',
          message: '已取消',
        })
      })
}
</script>

<style scoped>
.el-menu-item {
  width: 150px;
}
.el-icon {
  margin-left: 420px;
  margin-top: 16px;
}
.out {
  margin-top: 25px;
  margin-left: 10px;
  font-size: 14px;
  /*background-color: red;*/
}
.out:hover {
  cursor: pointer;
}
</style>
