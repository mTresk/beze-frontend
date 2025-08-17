<template>
  <div class="status">
    <slot />
  </div>
</template>

<style lang="scss" scoped>
.status {
  padding: rem(15) rem(20);
  line-height: 140%;
  text-align: center;
  background-color: var(--color-light);
  border-radius: rem(4);

  @include adaptive-value('font-size', 16, 14);
}
</style>
