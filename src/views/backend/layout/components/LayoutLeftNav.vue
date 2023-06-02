<script setup>
import chairman_menu_datas from '@/directives/chairman.json'
import chairtec_menu_datas from '@/directives/chairteacher.json'
import { useBackUserStore } from "@/stores/backend_userStore"
import { storeToRefs } from "pinia"
import {onMounted, ref} from "vue";

const userStore = useBackUserStore()
const { admin_flag } = storeToRefs(userStore)
var menuData = ref({})
const initNav = () => {
  // console.log(admin_flag)
  // console.log(admin_flag.value)
  if (admin_flag.value == "社团负责人"){
    menuData.value = JSON.parse(JSON.stringify(chairman_menu_datas));
  }else {
    menuData.value = JSON.parse(JSON.stringify(chairtec_menu_datas));
  }
}

onMounted(() => { initNav() })
</script>
<template>
  <div class="sidebar-container">
    <el-menu
        router
        :default-active="$route.path"
        class="el-menu-vertical-demo"
        unique-opened="true"
    >
      <template v-for="item in menuData">
        <el-sub-menu v-if="item.children" :index="item.text">
          <template #title>
            <el-icon>
              <component :is="item.icon"></component>
            </el-icon>
            <span>{{ item.text }}</span>
          </template>
          <template v-for="child in item.children">
            <el-sub-menu v-if="child.grandChildren" :index="child.text">
              <template #title>
                <el-icon>
                  <component :is="child.icon"></component>
                </el-icon>
                <span>{{ child.text }}</span>
              </template>
              <template v-for="grandChild in child.grandChildren">
                <el-menu-item :index="grandChild.path">
                  <el-icon>
                    <component :is="grandChild.icon"></component>
                  </el-icon>
                  <span>{{ grandChild.text }}</span>
                </el-menu-item>
              </template>
            </el-sub-menu>
            <el-menu-item v-else :index="child.path">
              <el-icon>
                <component :is="child.icon"></component>
              </el-icon>
              <span>{{ child.text }}</span>
            </el-menu-item>
          </template>
        </el-sub-menu>
        <el-menu-item v-else :key="item.text" :index="item.path">
          <el-icon>
            <component :is="item.icon"></component>
          </el-icon>
          <span>{{ item.text }}</span>
        </el-menu-item>
      </template>
    </el-menu>
  </div>
</template>



<style scoped>

</style>

<style>
.el-menu-vertical-demo{
  background: #f0f0f0;
}
.sidebar-container {
  transition: width 0.28s;
  width: 200px !important;
  height: 100%;
  z-index: 1001;
  overflow: hidden;
}
</style>