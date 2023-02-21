<script setup lang="ts">
import { useStore } from '@/store'
import MenuItem from './menu-item.vue'
const store = useStore()
</script>

<template>
  <el-menu
    mode="horizontal"
    active-text-color="#fff"
    background-color="#001425"
    text-color="#929aa1"
    :default-active="store.menuActive"
    class="w-full"
  >
    <view class="h-14 flex items-center pr-4" style="margin-top: 2px">
      <img src="@/assets/images/logo.png" class="w-7 h-7" />
      <span class="ml-4 font-medium text-white text-lg"> Admin Pro </span>
    </view>
    <template v-for="item in store.menuData" :key="item.name">
      <menu-item :menus="item"></menu-item>
    </template>
  </el-menu>
</template>

<style scoped lang="scss">
.el-menu--horizontal {
  border-bottom: 0;
}
</style>
