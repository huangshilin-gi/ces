import { defineStore } from 'pinia'
import { State, T_account } from './type'
import router from '@/router'
import newCache from '@/utils/cache'
import RouterMenusMap from '@/utils/route.map'
export const useStore = defineStore('main', {
  state: (): State => ({
    token: newCache.getStorage('TOKEN') ?? '',
    isRoute: false,
    menuData: [],
    userInfo: {},
    isLoading: false,
    menuActive: newCache.getStorage('MENU') ?? '',
    tabsList: JSON.parse(newCache.getStorage('LIST') ?? '[]')
  }),
  actions: {
    accountLoginAction(account: T_account) {
      //登录请求
      this.isLoading = true
      return new Promise((resolve) => {
        setTimeout(() => {
          const token = `token${account.account}${account.password}`
          newCache.setStorage('TOKEN', token)
          this.token = token
          this.createRouterMap()
          router.push('/layout')
          this.isLoading = false
          resolve(true)
        }, 2000)
      })
    },

    // 动态添加路由表
    createRouterMap() {
      const routeList = RouterMenusMap()
      this.menuData = routeList
      routeList.forEach((item) => {
        router.addRoute('layout', item)
      })
      this.isRoute = true
    },

    // 获取用户信息
    userInfoDataAction() {
      // 信息请求
      return new Promise((resolve) => {
        setTimeout(() => {
          this.userInfo = {
            name: 'admin',
            grade: '超级管理员',
            avatarUrl:
              'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png'
          }
          resolve(this.userInfo)
        }, 1500)
      })
    },

    // 退出登录
    userLogOut() {
      return new Promise((resolve) => {
        newCache.remove('TOKEN')
        router.push({ name: 'login' })
        resolve(true)
      })
    },

    // menu菜单点击缓存/tabs列表
    menuSelectItem(route: any) {
      // 如果存在href就跳转外部链接
      if (route?.meta?.href) {
        window.open(route.meta.href)
      } else {
        this.menuActive = route.name
        const flag = this.tabsList.some((item) => item.name === route.name)
        // 当tabsList中不存在当前菜单项的时候才添加新tab
        if (!flag) {
          this.tabsList.push({
            title: route.name,
            name: route.name,
            label: route.meta.title
          })
        }
        this.setStorageFn()
        router.push({ name: this.menuActive })
      }
    },

    setStorageFn() {
      newCache.setStorage('MENU', this.menuActive)
      newCache.setStorage('LIST', JSON.stringify(this.tabsList))
    }
  }
})
