<script setup lang="ts">
import { useStore } from '@/store'
const store = useStore()
interface iProps {
  menus: any
}

withDefaults(defineProps<iProps>(), {
  menus: {}
})

const handleSelectItem = (route: AuthRoute.Route) => {
  store.menuSelectItem(route)
}
</script>

<template>
  <template v-if="menus && menus?.children">
    <template v-if="!menus.meta?.hide">
      <el-sub-menu :index="menus.name" class="c-sub-menu">
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
.is-active {
  background-color: #1879ff;
  &:hover {
    background-color: #1879ff !important;
  }
  .sub-color {
    color: #fff !important;
  }
  .el-icon {
    color: #fff !important;
  }
}
.sub-hover {
  width: 100%;
  overflow: hidden;
  &:hover {
    color: #fff;
  }
}

.el-menu-item {
  &:hover {
    color: #fff;
    background-color: transparent;
  }
}

.c-sub-menu {
  :deep(.el-menu) {
    background: #000b12;
  }
  :deep(.__title):hover {
    color: #fff;
  }
}
</style>
