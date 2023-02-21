<script setup lang="ts">
import zhCn from 'element-plus/lib/locale/lang/zh-cn'
const attrs = useAttrs()
const slots = useSlots()

let isHide = ref(false)
let isLoading = ref(false)
let current = ref(1)
let pageSize = ref(10)

// 默认props属性
let pagination = {
  total: 0,
  layout: 'total, sizes, prev, pager, next, jumper',
  pagerCount: 7
}
if (attrs.pagination) {
  Object.assign(pagination, attrs.pagination as any)
}

// 当前总页数只有1页时 隐藏翻页组件
if (pagination.total <= pageSize.value) {
  isHide.value = true
}

watch(current, (newValue) => {
  // 测试
  console.log('当前页码', newValue)
  isLoading.value = true
  setTimeout(() => {
    isLoading.value = false
  }, 1000)
})

watch(pageSize, (newValue) => {
  // 测试
  console.log('当前条数', newValue)
  isLoading.value = true
  setTimeout(() => {
    isLoading.value = false
  }, 1000)
})
</script>

<template>
  <el-config-provider :locale="zhCn">
    <el-table v-loading="isLoading" v-bind="attrs">
      <template v-for="(item, key, i) in slots" :key="i" v-slot:[key]>
        <slot :name="key"></slot>
      </template>
    </el-table>
    <div class="mt-4 flex justify-end">
      <el-pagination
        v-bind="pagination"
        :hide-on-single-page="isHide"
        v-model:currentPage="current"
        v-model:page-size="pageSize"
      />
    </div>
  </el-config-provider>
</template>

<style scoped></style>
