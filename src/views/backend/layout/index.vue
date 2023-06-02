<script setup>
import TopNav from '@/views/backend/layout/components/LayoutTopNav.vue'
import LeftNav from '@/views/backend/layout/components/LayoutLeftNav.vue'
</script>

<template>
  <div class="common-layout">
    <el-container>
      <el-header><TopNav/></el-header>
      <el-container>
        <div class="sidebar-container"><el-aside><LeftNav/></el-aside></div>
        <div class="main-container"><el-main><router-view/></el-main></div>
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
  .sidebar-container {
    transition: width 0.28s;
    width: 200px !important;
    background: #f0f0f0;
    height: 100%;
    z-index: 1001;
    overflow: hidden;
  }
  .main-container {
    height: 100%;
    /*background: #f3f4f7;*/
    position: relative;
    width: calc(100% - 200px);
  }
</style>