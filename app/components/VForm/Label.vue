<template>
  <label class="form-label">
    <slot />
  </label>
</template>

<style lang="scss" scoped>
.form-label {
  line-height: 130%;

  @include adaptive-value('font-size', 16, 14);
}
</style>
