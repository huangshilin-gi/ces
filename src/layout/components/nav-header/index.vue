<script setup lang="ts">
import UserAvatar from './components/user-avatar.vue'

interface Props {
  leftShow?: boolean
}
withDefaults(defineProps<Props>(), {
  leftShow: true
})

const emit = defineEmits<{
  (e: 'switchChange', value: boolean): void
}>()

const iconName = ref('icons_flod')

// menu切换状态
const handleSwitchChange = () => {
  iconName.value =
    iconName.value === 'icons_flod' ? 'icons_unflod' : 'icons_flod'
  const flag = iconName.value === 'icons_unflod'
  emit('switchChange', flag)
}
</script>

<template>
  <div class="h-full flex justify-between overflow-hidden">
    <div class="left-content flex items-center" v-if="leftShow">
      <div
        class="cursor-pointer hover:bg-gray-100 h-full flex items-center pl-4 pr-4"
        @click="handleSwitchChange"
      >
        <c-icon :name="iconName" size="18px"></c-icon>
      </div>
    </div>
    <div class="right-content flex items-center">
      <user-avatar></user-avatar>
    </div>
  </div>
</template>

<style scoped>
.right-content {
  mix-blend-mode: screen;
}
</style>
