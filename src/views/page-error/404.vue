<script setup lang="ts">
import { getAssetsFile } from '@/utils/image_url'
const url = getAssetsFile({ fileName: '404' })
</script>

<template>
  <el-result title="该页面不存在">
    <template #icon>
      <el-image :src="url" />
    </template>
    <template #extra>
      <el-button type="primary">返回</el-button>
    </template>
  </el-result>
</template>

<style scoped></style>
