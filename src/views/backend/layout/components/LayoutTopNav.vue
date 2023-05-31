<script>
// import { UserFilled } from '@element-plus/icons-vue'
</script>

<template>
  <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      :ellipsis="false"
      @select="handleSelect"
  >
    <el-menu-item index="0" class="title-header">高校社团管理系统</el-menu-item>
    <div class="flex-grow" />
    <!--    <el-menu-item index="1">Processing Center</el-menu-item>-->
    <el-sub-menu index="2">
      <template #title>
        <el-icon><UserFilled /></el-icon>Admin
      </template>
      <el-menu-item index="2-1">用户信息</el-menu-item>
      <el-menu-item index="2-2">退出系统</el-menu-item>
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