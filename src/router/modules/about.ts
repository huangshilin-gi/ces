import { CollectionTag } from '@element-plus/icons-vue'

const meta: AuthRoute.RouteMeta = {
  title: '关于',
  icon: markRaw(CollectionTag),
  sort: 2
}

const aboutRoute: AuthRoute.Route = {
  name: 'about',
  path: '',
  component: () => import('@/views/about/index.vue'),
  meta
}

export default aboutRoute
