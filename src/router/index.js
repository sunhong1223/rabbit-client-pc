import { createRouter, createWebHashHistory } from 'vue-router'

// 路由规则
const routes = [
  // 首页
  {
    path: '/',
    component: () => import('@/views/Layout'), // 路由懒加载：动态导入，路由被访问的时候才加载对应组件
    children: [
      {
        path: '/',
        component: () => import('@/views/home')
      }
    ]
  }
]

// vue2.0 new VueRouter({}) 创建路由实例
// vue3.0 createRouter({}) 创建路由实例
const router = createRouter({
  // 使用hash的路由模式
  history: createWebHashHistory(),
  // 路由规则
  routes
})

export default router
