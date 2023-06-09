<template>
  <div class="common-layout">
    <el-container>
      <el-header><Menu/></el-header>
      <el-main><router-view></router-view></el-main>
    </el-container>
  </div>
</template>

<script setup>
import Menu from './components/LayoutHeader.vue'
</script>

<style scoped>
.el-main {
  height: 730px;
}
.el-footer {
  height: 120px;
}
</style>