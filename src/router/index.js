//createRouter：创建router实例对象
//createWebHistory：创建history模式的路由
import { createRouter, createWebHistory } from 'vue-router'
import MemberLogin from '@/views/front/login/index.vue'
import ManagerLogin from '@/views/backend/login/index.vue'
import Front from '@/views/front/layout/index.vue'
import Backend from '@/views/backend/layout/index.vue'
import ManageClub from '@/views/backend/chairman/ManageClub.vue'
import AdminIden from '@/views/backend/top/AdminIden.vue'
import ManageAdmin from '@/views/backend/top/MangeAdmin.vue'
import ManageAdminAdd from '@/views/backend/top/MangeAdmin_add.vue'
import Reg from '@/views/front/login/register.vue'
import ManageUser from '@/views/backend/top/MangeUser.vue'
import ManageUserAdd from '@/views/backend/top/MangeUser_add.vue'
import ManageApplyForClub from '@/views/backend/top/ApplyForClub.vue'
import ManageApplyForEvent from '@/views/backend/top/ApplyForEvent.vue'
import HomePage from '@/views/front/home/components/HomePage.vue'
import HomeAllClubs from '@/views/front/home/components/HomeAllClubs.vue'
import HomeMyClub from '@/views/front/home/components/HomeMyClub.vue'
import HomeAnnouCenter from '@/views/front/home/components/HomeAnnouCenter.vue'
import HomePerCen from '@/views/front/home/components/HomePerCen.vue'
import ChairManManageApply from '@/views/backend/chairman/ManageApply.vue'
import ManageClubIden from '@/views/backend/top/ManageClub.vue'
import UserApplyForm from '@/views/backend/chairman/UserApplyforClub.vue'
import ApplyClubform from '@/views/front/home/components/apply_clubform.vue'
import MyAnnou from '@/views/front/home/components/my_announ.vue'
import ManageApplyforEvent from '@/views/backend/chairman/MangeApplyForEvent.vue'
import EchartsComponent  from '@/views/front/home/components/Echarts.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {//用户登录为一级路由，路径为空表示项目启动即进入登录页
      path: '/',
      component: MemberLogin,
      name: 'userlogin',
    },
    {
      path: '/reg',
      component: Reg
    },
    {//管理员登录为一级路由
      path: '/login',
      component: ManagerLogin
    },
    {//用户首页为一级路由，预备在首页有head，body和foot，body设置为二级路由，参考acwing 网站，无论去哪个交互页面，head和footer是不变的，使body改变
      //我们一级路由放共同组件如head和footer
      path: '/front',
      component: Front,
      meta: {requiresAuth: true},
      children: [
        {
          path: '',
          component: HomePage
        },
        {
          path: '/allclubs',
          component: HomeAllClubs
        },
        {
          path: '/myclub',
          component: HomeMyClub
        },
        {
          path: '/annou',
          component: HomeAnnouCenter
        },
        {
          path: '/per',
          component: HomePerCen
        },
        {
          path: '/applyclub',
          component: ApplyClubform
        },
        {
          path: '/myannou',
          component: MyAnnou
        },
        {
          path: '/echarts',
          component: EchartsComponent
        }
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
        },
        {
          path: '/manageuser',
          component: ManageUser
        },
        {
          path: '/manageruser_add',
          component: ManageUserAdd
        },
        {
          path: '/manageapply_club',
          component: ManageApplyForClub
        },
        {
          path: '/userapplyform',
          component: UserApplyForm
        },
        {
          path: '/manageapply_event',
          component: ManageApplyForEvent
        },
        {
          path: '/chairmanage_apply',
          component: ChairManManageApply
        },
        {
          path: '/manage_clubiden',
          component: ManageClubIden
        },
        {
          path: '/manageevent',
          component: ManageApplyforEvent
        }
      ]
    }
  ]
})

router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.getItem('loginData');

  if (to.meta.requiresAuth && !isAuthenticated) {
    // 路由需要登录但用户未认证，重定向到登录页面
    next({name: 'userlogin'});
  } else {
    next();
  }
});

export default router
