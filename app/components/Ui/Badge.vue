<script setup lang="ts">
const props = defineProps<{
  variant: 'success' | 'warning' | 'error' | 'info'
}>()

const classList = computed(() => {
  if (props.variant === 'success') {
    return 'badge--success'
  }

  if (props.variant === 'warning') {
    return 'badge--warning'
  }

  if (props.variant === 'error') {
    return 'badge--error'
  }

  if (props.variant === 'info') {
    return 'badge--info'
  }

  return ''
})
</script>

<template>
  <div
    class="badge"
    :class="classList"
  >
    <slot />
  </div>
</template>

<style lang="scss" scoped>
.badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: rem(5) rem(10);
  font-size: rem(12);
  font-weight: 500;
  line-height: 120%;
  color: var(--color-white);
  background-color: var(--color-light);
  border-radius: rem(5);

  &--success {
    background-color: var(--color-green);
  }

  &--warning {
    background-color: var(--color-orange);
  }

  &--error {
    background-color: var(--color-red);
  }

  &--info {
    background-color: var(--color-blue);
  }
}
</style>
