<template>
  <div class="form-field">
    <slot />
  </div>
</template>

<style lang="scss" scoped>
.form-field {
  display: grid;

  @include adaptive-value('gap', 6, 4);
}
</style>
