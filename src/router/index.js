import { createRouter, createWebHashHistory } from 'vue-router'
const routes = [
  {
    name: 'home',
    path: '/',
    meta: {
      title: '首页'
    },
    component: () => import('@/views/Home.vue'),
    redirect: '/welcome',
    children: [
      {
        name: 'welcome',
        path: 'welcome',
        meta: {
          title: '欢迎界面'
        },
        component: () => import('@/views/Welcome.vue')
      }
    ]
  },
  {
    name: 'login',
    path: '/login',
    meta: {
      title: '登录'
    },
    component: () => import('@/views/Login.vue')
  },
  {
    name: 'system',
    path: '/system',
    meta: {
      title: '系统管理'
    },
    component: () => import('@/views/Home.vue'),
    children: [
      {
        name: 'user',
        path: 'user',
        meta: {
          title: '用户管理'
        },
        component: () => import('@/views/system/User.vue')
      },
      {
        name: 'menu',
        path: 'menu',
        meta: {
          title: '菜单管理'
        },
        component: () => import('@/views/system/Menu.vue')
      },
      {
        name: 'role',
        path: 'role',
        meta: {
          title: '角色管理'
        },
        component: () => import('@/views/system/Role.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
