<script setup lang="ts">
import type { FormInstance } from 'element-plus'
import { useStore } from '@/store'
import newCache from '@/utils/cache'
import { accountRules } from '../config/rules'
const store = useStore()
const formValue = reactive({
  account: '',
  password: ''
})
const formRef = ref<FormInstance>()
const storageKey = 'ACCOUNT'
onMounted(() => {
  const value = newCache.getStorage(storageKey)
  if (value) {
    formValue.account = value.account
    formValue.password = value.password
  }
})
//账号密码登录方法
const loginAccountAction = (isChecked: Boolean) => {
  formRef.value?.validate(async (valid) => {
    if (!valid) return
    const res = await store.accountLoginAction(formValue)
    if (res) {
      if (isChecked) {
        //可自己对账号信息加密
        newCache.setStorage(storageKey, formValue)
      } else {
        newCache.remove(storageKey)
      }
    }
  })
}

defineExpose({
  loginAccountAction
})
</script>

<template>
  <div class="mt-4">
    <el-form
      ref="formRef"
      size="large"
      :rules="accountRules"
      :model="formValue"
    >
      <el-form-item label="账号" prop="account">
        <el-input
          v-model="formValue.account"
          placeholder="手机号/邮箱/其他"
        ></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input
          v-model="formValue.password"
          show-password
          placeholder="输入密码"
        ></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<style lang="scss" scoped></style>
