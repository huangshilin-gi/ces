<script setup lang="ts">
import { useStore } from '@/store'
const store = useStore()
interface Props {
  menus: any
}

withDefaults(defineProps<Props>(), {
  menus: {}
})

const handleSelectItem = (route: AuthRoute.Route) => {
  store.menuSelectItem(route)
}
</script>

<template>
  <template v-if="menus && menus?.children">
    <template v-if="!menus.meta?.hide">
      <el-sub-menu :index="menus.name">
        <template #title>
          <div class="sub-hover sub-color">
            <el-icon :size="16" v-if="menus.meta.icon">
              <component :is="menus.meta.icon" />
            </el-icon>
            <span>{{ menus.meta.title }}</span>
          </div>
        </template>
        <template v-for="chitem in menus.children" :key="chitem.name">
          <menu-item :menus="chitem"></menu-item>
        </template>
      </el-sub-menu>
    </template>
  </template>
  <template v-else>
    <template v-if="!menus.meta?.hide">
      <el-menu-item :index="menus.name" @click="handleSelectItem(menus)">
        <el-icon :size="16" v-if="menus.meta.icon">
          <component :is="menus.meta.icon" />
        </el-icon>
        <template #title>
          <span>{{ menus.meta.title }}</span>
        </template>
      </el-menu-item>
    </template>
  </template>
</template>

<style lang="scss" scoped>
.el-menu-item {
  &:not(.is-disabled):hover {
    background-color: #1879ff;
    color: #fff;
  }
}
</style>
