import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import nprogress from '@/utils/nprogress'
import { useStore } from '@/store'
const routes: Array<RouteRecordRaw> = [
  {
    path: '/:pathMatch(.*)',
    component: () => import('@/views/page-error/404.vue')
  },
  {
    path: '/',
    redirect: '/layout'
  },
  {
    path: '/layout',
    name: 'layout',
    component: () => import('@/layout/index.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/index.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to) => {
  nprogress.start()
  const store = useStore()
  // 默认绑定的路由 (侧边菜单和顶部tabs)
  if (store.menuActive === '' && to.name) {
    store.menuSelectItem(to)
  }
  // 判断用户登录验证
  if (to.path !== '/login' && !store.token) {
    return '/login'
  }
  // 当页面刷新 重新添加动态路由表
  if (!store.isRoute && to.path !== '/login') {
    store.createRouterMap()
    return to.fullPath
  }
})

router.afterEach(() => {
  nprogress.close()
})

export default router
