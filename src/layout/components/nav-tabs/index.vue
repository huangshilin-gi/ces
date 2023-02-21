<script setup lang="ts">
import type { TabsPaneContext } from 'element-plus'
import { useStore } from '@/store'
const store = useStore()

const handleTabClick = (tab: TabsPaneContext) => {
  const { props } = tab
  store.menuSelectItem({ name: props.name })
}

// 删除tab
const handleRemoveTab = (targetName: string) => {
  const tabs = store.tabsList
  let activeName = store.menuActive
  if (activeName === targetName) {
    tabs.forEach((tab, index) => {
      if (tab.name === targetName) {
        // 当前tab删除后，新的tab需要重新获取  (取前或取后)
        const nextTab = tabs[index + 1] || tabs[index - 1]
        if (nextTab) {
          activeName = nextTab.name
        }
      }
    })
  }
  store.menuActive = activeName
  // 过滤当前删除的tab
  store.tabsList = tabs.filter((tab) => tab.name !== targetName)
  store.setStorageFn()
}
</script>

<template>
  <el-tabs
    v-model="store.menuActive"
    type="border-card"
    @tab-remove="handleRemoveTab"
    @tab-click="handleTabClick"
  >
    <el-tab-pane
      closable
      v-for="item in store.tabsList"
      :key="item.name"
      :label="item.label"
      :name="item.name"
    >
    </el-tab-pane>
  </el-tabs>
</template>

<style scoped lang="scss">
.el-tabs {
  --el-tabs-header-height: 32px;
  border: none;
}

:deep(.el-tabs__nav-wrap) {
  padding: 0 10px;
}
:deep(.el-tabs__item) {
  height: 32px;
  line-height: 32px;
  font-size: 12px;
}

:deep(.el-tabs__content) {
  height: 0px;
  padding: 0px;
}

:deep(.el-tabs__header) {
  border-bottom: none;
}
</style>
