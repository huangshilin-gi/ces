import { RouteRecordRaw } from 'vue-router'

// 动态路由
const RouterMenusMap = (): RouteRecordRaw[] => {
  // const routes: RouteRecordRaw[] = []
  //初始所有的路由表
  const allRoutes: RouteRecordRaw[] = []

  //遍历获取路由表文件路径
  const routeFiles = import.meta.globEager('/src/router/modules/*.ts')
  for (const key in routeFiles) {
    allRoutes.push(routeFiles[key].default)
  }

  // 路由排序 通过sort字段
  allRoutes.sort((a, b): number => {
    const asort = a.meta?.sort as number
    const bsort = b.meta?.sort as number
    return asort - bsort
  })

  // 路由权限-------------

  return allRoutes
}

export default RouterMenusMap
