<script setup lang="ts">
import LoginAccount from './components/login-account.vue'
import LoginPhone from './components/login-phone.vue'
import { useStore } from '@/store'
const store = useStore()

// 获取globaValue
const { proxy } = getCurrentInstance() as any
const config = ref(proxy?.$setConfig)
let current = ref(config.value.Is_Login_Account ? 'account' : 'pane')

const isChecked = ref(false)
const accountRef = ref<InstanceType<typeof LoginAccount> | null>(null)
const phoneRef = ref<InstanceType<typeof LoginPhone> | null>(null)
const handleLoginClick = () => {
  if (current.value == 'account') {
    //调用账号登录方法
    accountRef.value?.loginAccountAction(isChecked.value)
  } else if (current.value == 'pane') {
    //调用手机号登录方法
    phoneRef.value?.loginPhoneAction()
  }
}
</script>

<template>
  <div class="container-2xl mx-auto bg">
    <div class="login-fixed">
      <el-tabs type="border-card" stretch v-model="current">
        <el-tab-pane name="account" v-if="config.Is_Login_Account">
          <template #label>
            <span class="flex items-center justify-center">
              <el-icon :size="20"><i-ep-avatar /></el-icon>
              <span class="pl-2">账号登录</span>
            </span>
          </template>
          <login-account ref="accountRef"></login-account>
        </el-tab-pane>
        <el-tab-pane name="pane" v-if="config.Is_Login_Phone">
          <template #label>
            <span class="flex items-center justify-center">
              <el-icon :size="20"><i-ep-iphone /></el-icon>
              <span class="pl-2">手机号登录</span>
            </span>
          </template>
          <login-phone ref="phoneRef"></login-phone>
        </el-tab-pane>
      </el-tabs>
      <div class="flex justify-between items-center mt-2">
        <el-checkbox v-model="isChecked">记住我</el-checkbox>
        <div class="text">忘记密码</div>
      </div>
      <el-button
        type="primary"
        size="large"
        class="w-full mt-4"
        :loading="store.isLoading"
        @click="handleLoginClick"
        >登录</el-button
      >
    </div>
  </div>
</template>

<style scoped lang="scss">
.bg {
  background: #f0f2f5 url(@/assets/images/background.svg) no-repeat 50%;
  background-size: 100%;
  height: 100vh;
  position: relative;
}
.login-fixed {
  width: 450px;
  position: fixed;
  left: 50%;
  top: 24%;
  transform: translateX(-50%);
}

.text {
  font-size: 14px;
  color: #409eff;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
}
</style>
