<script setup lang="ts">
import type { NuxtError } from '#app'

defineProps<{
  error: NuxtError
}>()

const handleError = () => clearError({ redirect: '/catalog' })
</script>

<template>
  <main class="page">
    <div class="error">
      <div class="error__container">
        <div class="error__body">
          <LayoutEmpty>
            <template #icon>
              <UiIcon
                name="sad"
                size="48"
              />
            </template>
            <template #title>
              {{ error.statusCode }}
            </template>
            <template #text>
              {{ error.message }}
            </template>
            <template #button>
              <UiButton
                outline
                @click="handleError"
              >
                Перейти в каталог
              </UiButton>
            </template>
          </LayoutEmpty>
        </div>
      </div>
    </div>
  </main>
</template>

<style lang="scss">
.error {
  min-height: 100vh;
  min-height: 100dvh;

  &__body {
    position: relative;
    z-index: 10;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    min-height: 100dvh;
    padding-block: rem(120);
  }

  &__title {
    position: relative;
    font-family: Montserrat, sans-serif;
    font-weight: 700;
    animation: shake 0.6s ease-in-out infinite alternate;

    @include adaptive-value('margin-bottom', 50, 20);

    &::before {
      position: absolute;
      left: 50%;
      width: 100%;
      height: 0.1em;
      overflow: hidden;
      line-height: 0.5em;
      content: attr(data-error);
      opacity: 0.7;
      transform: translate(-50%, 0.34em);
      animation:
        scan 0.5s ease-in-out 275ms infinite alternate,
        glitch-anim 0.3s ease-in-out infinite alternate;
    }

    &::after {
      position: absolute;
      top: rem(8);
      left: 50%;
      width: 100%;
      height: 0.5em;
      overflow: hidden;
      line-height: 0.1em;
      content: attr(data-t);
      opacity: 0.8;
      transform: translate(-50%, 0.34em);
      animation:
        scan 665ms ease-in-out 0.59s infinite alternate,
        glitch-anim 0.3s ease-in-out infinite alternate;
    }

    @include adaptive-value('font-size', 400, 120);
  }

  &__status {
    max-width: rem(800);
    padding: rem(15) rem(20);
    margin-bottom: rem(30);
    line-height: 140%;
    text-align: center;
    background-color: var(--light-color);
    border-radius: rem(12);

    @include adaptive-value('font-size', 16, 14);
  }
}
</style>
