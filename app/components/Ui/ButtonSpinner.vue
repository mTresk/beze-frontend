<script setup lang="ts">
defineProps<{
  size: string
}>()
</script>

<template>
  <UiIcon
    class="spinner"
    name="spinner"
    :size="size"
  />
</template>

<style lang="scss" scoped>
.spinner {
  animation: spin infinite 1s linear;

  path {
    fill: $whiteColor;
  }

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }

    to {
      transform: rotate(360deg);
    }
  }
}
</style>
