<script setup lang="ts">
import { useStore } from '@/store'
import MenuItem from './menu-item.vue'
const store = useStore()
interface Props {
  isCollapse: boolean
}
withDefaults(defineProps<Props>(), {
  isCollapse: false
})
</script>

<template>
  <el-menu
    active-text-color="#fff"
    background-color="#001425"
    text-color="#929aa1"
    :default-active="store.menuActive"
    class="h-full"
    :collapse="isCollapse"
  >
    <view class="h-14 flex items-center pl-4">
      <img src="@/assets/images/logo.png" class="w-7 h-7" />
      <span v-show="!isCollapse" class="ml-4 font-medium text-white text-lg">
        Admin Pro
      </span>
    </view>
    <template v-for="item in store.menuData" :key="item.name">
      <menu-item :menus="item"></menu-item>
    </template>
  </el-menu>
</template>

<style scoped lang="scss">
.el-menu {
  border-right: none;
  &:not(.el-menu--collapse) {
    width: 220px;
  }
}
</style>
