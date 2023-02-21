<script setup lang="ts">
import { ArrowUp, ArrowDown } from '@element-plus/icons-vue'
interface iProps {
  up: number
  down: number
}

const props = withDefaults(defineProps<iProps>(), {
  up: 8,
  down: 8
})

let isShow = ref(false)
const hanldeFoldAction = () => {
  isShow.value = !isShow.value
}
const hanldeScreenAction = () => {
  emits('confirm')
}
const hanldeResetAction = () => {
  emits('reset')
}

const emits = defineEmits<{
  (e: 'confirm'): void
  (e: 'reset'): void
}>()
</script>

<template>
  <el-form>
    <el-row :gutter="20">
      <slot name="fixed"></slot>
      <template v-if="isShow">
        <slot name="hide"></slot>
      </template>
      <el-col :span="isShow ? props.down : props.up">
        <div class="flex items-center justify-end h-full">
          <el-button type="primary" @click="hanldeScreenAction">
            筛选
          </el-button>
          <el-button @click="hanldeResetAction"> 重置 </el-button>
          <el-button
            :icon="isShow ? ArrowUp : ArrowDown"
            type="primary"
            link
            @click="hanldeFoldAction"
          >
            {{ isShow ? '收起' : '展开' }}
          </el-button>
        </div>
      </el-col>
    </el-row>
  </el-form>
</template>

<style scoped>
.el-row {
  margin-bottom: 20px;
}
.el-row:last-child {
  margin-bottom: 0;
}

.el-col {
  border-radius: 4px;
}
</style>
