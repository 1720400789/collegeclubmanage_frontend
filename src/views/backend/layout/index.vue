<script setup>
import TopNav from '@/views/backend/layout/components/LayoutTopNav.vue'
import LeftNav from '@/views/backend/layout/components/LayoutLeftNav.vue'
</script>

<template>
  <div class="common-layout">
    <el-container>
      <el-header><TopNav/></el-header>
      <el-container>
        <el-aside><LeftNav/></el-aside>
        <el-main><router-view/></el-main>
      </el-container>
    </el-container>
  </div>
</template>

<style scoped>
  .el-container{
    height: 100vh;
    width: 100%;
  }
  .el-aside{
    background: #f0f0f0;
  }
</style>