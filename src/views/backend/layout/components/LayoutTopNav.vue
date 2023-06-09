<script setup>
import { ref } from "vue";
import { useRouter } from 'vue-router'
import { ElMessageBox, ElMessage } from 'element-plus'
import { useBackUserStore } from '@/stores/backend_userStore'
import {storeToRefs} from "pinia";
const router = useRouter()
const userStore = useBackUserStore()
const { username } = storeToRefs(userStore)

const logout = () => {
  ElMessageBox.confirm(
      '确定要退出系统吗',
      'Warning',
      {
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancel',
        type: 'warning',
      }
  ).then(() => {
        localStorage.removeItem('userInfo')
        localStorage.removeItem('userId')
        localStorage.removeItem('userInfo_pwd')
        // 2. 跳转首页
        router.replace({ path: '/login' })
        ElMessage({
          type: 'success',
          message: '退出成功',
        })
      })
      .catch(() => {
        router.replace({ path: '/backend' })
        ElMessage({
          type: 'info',
          message: '已取消',
        })
      })
}
</script>

<template>
  <el-menu
      router
      :default-active="$route.path"
      class="el-menu-demo"
      mode="horizontal"
      :ellipsis="false"
  >
    <el-menu-item index="/" class="title-header">高校社团管理系统</el-menu-item>
    <div class="flex-grow" />
    <el-sub-menu index="1">
      <template #title>
        <el-icon><User /></el-icon>
        {{ username }}
      </template>
      <el-menu-item index="/iden">用户信息</el-menu-item>
      <el-menu-item index="/1-2" @click="logout">退出系统</el-menu-item>
      <!--      <el-menu-item index="2-3">item three</el-menu-item>-->
      <!--      <el-sub-menu index="2-4">-->
      <!--        <template #title>item four</template>-->
      <!--        <el-menu-item index="2-4-1">item one</el-menu-item>-->
      <!--        <el-menu-item index="2-4-2">item two</el-menu-item>-->
      <!--        <el-menu-item index="2-4-3">item three</el-menu-item>-->
      <!--      </el-sub-menu>-->
    </el-sub-menu>
  </el-menu>
</template>


<style scoped>

</style>

<style>
.flex-grow {
  flex-grow: 1;
}
.title-header{
  font-size: 24px;
  font-weight: bold;
}
.el-menu-demo {
  background-color: #f0f0f0;
}
</style>