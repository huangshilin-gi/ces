<script setup lang="ts">
import NavHeader from './components/nav-header/index.vue'
import NavMenu from './components/nav-menu/index.vue'
import NavMenuHor from './components/nav-menu-hor/index.vue'
import NavTabs from './components/nav-tabs/index.vue'

const { proxy } = getCurrentInstance() as any
const config = ref(proxy?.$setConfig)

const isCollapse = ref(false)
const onSwitchChange = (value: boolean) => {
  isCollapse.value = value
}
</script>

<template>
  <div class="h-screen">
    <el-container class="h-full">
      <el-aside
        width="auto"
        class="bg-aside"
        v-if="config.Menu_Mode !== 'horizontal'"
      >
        <nav-menu :isCollapse="isCollapse" :mode="config.Menu_Mode"></nav-menu>
      </el-aside>
      <el-container>
        <el-header
          class="header-shadow header-p flex"
          v-if="config.Menu_Mode === 'horizontal'"
        >
          <nav-menu-hor></nav-menu-hor>
          <nav-header :leftShow="false"></nav-header>
        </el-header>
        <el-header height="52px" class="header-shadow" v-else>
          <nav-header @switch-change="onSwitchChange"></nav-header>
        </el-header>
        <div class="pt-3 pb-3 border-bottom">
          <nav-tabs></nav-tabs>
        </div>
        <el-main class="bg-gray-100">
          <router-view #default="{ Component, route }">
            <transition name="main" mode="out-in" :appear="true">
              <keep-alive>
                <component :is="Component" :key="route.path" />
              </keep-alive>
            </transition>
          </router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<style scoped lang="scss">
.header-shadow {
  box-shadow: 0 1px 4px rgb(0 21 41 / 8%);
  z-index: 9;
}

.header-p {
  background-color: #001425;
}

.bg-aside {
  background-color: #fff;
  box-shadow: 2px 0 8px 0 rgb(29 35 41 / 5%);
}

.border-bottom {
  border-bottom: 1px solid rgb(0 21 41 / 8%);
}

.main-leave-to,
.main-enter-from {
  /*定义进入开始和离开结束的透明度为0*/
  opacity: 0;
}

.main-enter-to {
  transform: translateX(-20px);
}
.main-leave-to {
  transform: translateX(20px);
}

.fade-leave-from,
.fade-enter-to {
  /*定义进入结束和离开开始的透明度为1*/
  opacity: 1;
}
.fade-leave-active,
.fade-enter-active {
  transition: all 0.5s ease-out;
}
</style>
