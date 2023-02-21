import { User } from '@element-plus/icons-vue'

const meta: Array<AuthRoute.RouteMeta> = [
  {
    title: '个人中心',
    icon: markRaw(User),
    sort: 1
  },
  {
    title: '设置'
  },
  {
    title: '消息',
    href: 'http://www.baidu.com'
  }
]

const userRoute: AuthRoute.Route = {
  name: 'user',
  path: 'user',
  meta: meta[0],
  children: [
    {
      name: 'user-set',
      path: 'user-setting',
      component: () => import('@/views/user/children/user-setting/index.vue'),
      meta: meta[1]
    },
    {
      name: 'user-msg',
      path: 'user-msg',
      component: () => import('@/views/user/children/user-msg/index.vue'),
      meta: meta[2]
    }
  ]
}

export default userRoute
