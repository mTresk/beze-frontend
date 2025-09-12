<script setup lang="ts">
interface IProps {
  name: string
  size: string
}

defineProps<IProps>()
</script>

<template>
  <svg
    :width="size"
    :height="size"
  >
    <use :href="`/images/icons.svg#${name}`" />
  </svg>
</template>
