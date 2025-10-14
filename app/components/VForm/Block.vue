<script setup lang="ts">
interface IProps {
  error?: string[]
}

defineProps<IProps>()
</script>

<template>
  <div class="form-block">
    <slot />
    <small
      v-if="error"
      class="form-error"
    >{{ error[0] }}</small>
  </div>
</template>

<style lang="scss" scoped>
.form-block {
  position: relative;
}

.form-error {
  position: relative;
  top: rem(5);
  color: var(--color-red);

  @include adaptive-value('font-size', 12, 10);
}
</style>
