//createRouter：创建router实例对象
//createWebHistory：创建history模式的路由
import { createRouter, createWebHistory } from 'vue-router'
import MemberLogin from '@/views/front/login/index.vue'
import ManagerLogin from '@/views/backend/login/index.vue'
import Front from '@/views/front/layout/index.vue'
import FrontHome from '@/views/front/home/index.vue'
import Backend from '@/views/backend/layout/index.vue'
import ManageClub from '@/views/backend/home/ManageClub.vue'
import AdminIden from '@/views/backend/home/AdminIden.vue'
import ManageAdmin from '@/views/backend/home/MangeAdmin.vue'
import ManageAdminAdd from '@/views/backend/home/MangeAdmin_add.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {//用户登录为一级路由，路径为空表示项目启动即进入登录页
      path: '/',
      component: MemberLogin
    },
    {//管理员登录为一级路由
      path: '/login',
      component: ManagerLogin
    },
    {//用户首页为一级路由，预备在首页有head，body和foot，body设置为二级路由，参考acwing 网站，无论去哪个交互页面，head和footer是不变的，使body改变
      //我们一级路由放共同组件如head和footer
      path: '/front',
      component: Front,
      children: [
        {
          path: '',
          component: FrontHome
        },

      ]
    },
    {
      path: '/backend',
      component: Backend,
      children: [
        {
          path: '',
          component: ManageClub
        },
        {
          path: '/iden',
          component: AdminIden
        },
        {
          path: '/manageadmin',
          component: ManageAdmin
        },
        {
          path: '/manageadmin_add',
          component: ManageAdminAdd
        }
      ]
    }
  ]
})

export default router
