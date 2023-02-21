import { RouteRecordRaw } from 'vue-router'

declare namespace AuthRoute {
  type RouteMeta = {
    // 路由icon
    icon?: any
    // 路由是否显示
    hide?: boolean
    // 第三方跳转链接
    href?: string
    // 路由排序
    sort?: number
    // 默认选中
    selected?: boolean
    // 路由标题
    title: string
  }
  type Route = RouteRecordRaw
}

export = AuthRoute
export as namespace AuthRoute
