export interface State {
  token: string // 登录验证
  isRoute: boolean // 是否已动态添加路由表
  menuData: Array<AuthRoute.Route> // 侧边菜单表
  userInfo: {
    // 个人信息
    name?: string
    grade?: string
    avatarUrl?: string
  }
  isLoading: boolean // 登录按钮加载状态
  menuActive: string // 选中的菜单项
  tabsList: Array<{
    title: string
    name: string
    label: string
  }> // 顶部tabs列表
}

export interface T_account {
  account: string
  password: string
}
