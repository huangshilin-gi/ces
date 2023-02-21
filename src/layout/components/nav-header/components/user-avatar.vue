<script setup lang="ts">
import { User, SwitchButton } from '@element-plus/icons-vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { useStore } from '@/store'

const store = useStore()

const { proxy } = getCurrentInstance() as any
const config = ref(proxy?.$setConfig)

const isLoading = ref(false)

onMounted(async () => {
  isLoading.value = true
  await store.userInfoDataAction()
  isLoading.value = false
})

// 退出登录
const handleLogOut = () => {
  ElMessageBox.confirm('确认退出登录？', '退出框', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    store.userLogOut().then(() => {
      ElMessage({
        type: 'info',
        message: '退出登录。'
      })
    })
  })
}
</script>

<template>
  <el-dropdown class="h-full">
    <div
      :class="`flex items-center pl-3 pr-3 ${
        config.Menu_Mode === 'vertical'
          ? 'hover:bg-gray-100'
          : 'hover:text-white'
      }`"
      v-loading="isLoading"
    >
      <el-avatar :size="34" :src="store.userInfo.avatarUrl" />
      <span class="pl-4 text-base">{{ store.userInfo.name }}</span>
    </div>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item :icon="User">个人中心</el-dropdown-item>
        <el-dropdown-item divided :icon="SwitchButton" @click="handleLogOut">
          退出登录
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<style scoped></style>
