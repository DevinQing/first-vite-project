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
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
