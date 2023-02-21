<script setup lang="ts">
interface Props {
  name: string
  color?: string
  size: string
}
const props = withDefaults(defineProps<Props>(), {
  name: '',
  color: '#000',
  size: '16px'
})
const iconName = computed(() => `#icon-${props.name}`)
</script>

<template>
  <svg class="c-icon" aria-hidden="true">
    <use :xlink:href="iconName" :fill="color" />
  </svg>
</template>

<style scoped lang="scss">
$width: v-bind(size);
$height: v-bind(size);
.c-icon {
  width: $width;
  height: $height;
  position: relative;
  fill: currentColor;
}
</style>
