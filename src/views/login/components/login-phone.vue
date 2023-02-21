<script setup lang="ts">
import { phoneRules } from '../config/rules'
const formValue = reactive({
  phone: '',
  verifyCode: ''
})
let isBtnLoading = ref(false)
let isDisabled = ref(false)
let verifyTxt = ref('获取验证码')
const handleVerifyCodeGain = () => {
  isBtnLoading.value = true
  setTimeout(() => {
    isBtnLoading.value = false
    isDisabled.value = true
    timeFn()
  }, 1000)
}

const loginPhoneAction = () => {
  console.log('手机号码登录')
}

//获取验证码后倒计时
let time = 60
const timeFn = () => {
  if (time == 0) {
    time = 60
    isDisabled.value = false
    verifyTxt.value = '获取验证码'
  } else {
    time--
    verifyTxt.value = `重置(${time}s)`
    setTimeout(() => {
      timeFn()
    }, 1000)
  }
}

defineExpose({
  loginPhoneAction
})
</script>

<template>
  <div class="mt-4">
    <el-form size="large" :model="formValue" :rules="phoneRules">
      <el-form-item label="手机号" prop="phone">
        <el-input v-model="formValue.phone" placeholder="输入手机号"></el-input>
      </el-form-item>
      <el-form-item label="验证码" prop="verifyCode">
        <div class="flex-1 flex justify-between items-center">
          <el-input
            class="flex-1"
            v-model="formValue.verifyCode"
            placeholder="输入验证码"
          ></el-input>
          <div class="ml-4">
            <el-button
              type="primary"
              :disabled="isDisabled"
              :loading="isBtnLoading"
              @click="handleVerifyCodeGain"
              >{{ verifyTxt }}</el-button
            >
          </div>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<style lang="scss" scoped></style>
