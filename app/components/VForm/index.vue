<template>
  <form class="form">
    <div class="form__body">
      <slot />
    </div>
  </form>
</template>

<style lang="scss" scoped>
.form {
  position: relative;
  width: 100%;

  &[grid] {
    .form__body {
      grid-template-columns: 1fr 1fr;

      @media (max-width: $mobile) {
        grid-template-columns: 1fr;
      }
    }
  }

  &__body {
    display: grid;

    @include adaptive-value('gap', 20, 15);
  }
}
</style>
