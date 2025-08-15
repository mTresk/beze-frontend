<template>
  <div>
    <section class="auth spacer">
      <div class="auth__container">
        <slot
          v-if="$slots.header"
          name="header"
        />
        <div
          v-if="$slots.status"
          class="auth__status"
        >
          <slot name="status" />
        </div>

        <div
          v-if="$slots.body"
          class="auth__body"
        >
          <slot name="body" />
        </div>
        <div
          v-if="$slots.footer"
          class="auth__footer"
        >
          <slot name="footer" />
        </div>
      </div>
    </section>
  </div>
</template>

<style lang="scss">
.auth {
  &__body {
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: rem(360);
    margin-inline: auto;
  }

  &__status {
    display: grid;
    max-width: rem(800);
    margin-inline: auto;

    @include adaptive-value('margin-bottom', 30, 20);
    @include adaptive-value('gap', 20, 10);
  }

  &__form {
    width: 100%;
  }

  &__footer {
    display: grid;
    gap: rem(10);
    max-width: rem(360);
    margin-inline: auto;

    @include adaptive-value('margin-top', 20, 16);
  }

  &__links {
    display: flex;
    gap: rem(20);
    align-items: center;
    justify-content: space-between;
  }

  &__link {
    text-align: center;
  }
}
</style>
