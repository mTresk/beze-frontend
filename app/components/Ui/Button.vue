<script setup lang="ts">
defineProps<{
  href?: string
  isLoading?: boolean
}>()
</script>

<template>
  <NuxtLink
    v-if="href"
    :to="href"
    class="button"
    :disabled="isLoading ? true : undefined"
  >
    <slot />
    <UiButtonSpinner
      v-if="isLoading"
      size="20"
    />
  </NuxtLink>
  <button
    v-else
    class="button"
    :disabled="isLoading ? true : undefined"
  >
    <slot />
    <UiButtonSpinner
      v-if="isLoading"
      size="20"
    />
  </button>
</template>

<style lang="scss">
.button {
  position: relative;
  display: flex;
  gap: rem(8);
  align-items: center;
  justify-content: center;
  padding-block: rem(5);
  line-height: 130%;
  color: var(--color-white);
  text-align: center;
  white-space: nowrap;
  background-color: var(--color-accent);
  border-radius: rem(4);
  transition: all 0.3s ease-in-out;

  @include adaptive-value('height', 55, 45);
  @include adaptive-value('font-size', 16, 14);
  @include adaptive-value('padding-inline', 80, 60);

  &[small] {
    @include adaptive-value('height', 45, 30);
    @include adaptive-value('font-size', 14, 12);
    @include adaptive-value('padding-inline', 60, 40);
  }

  &[active='true'] {
    background-color: var(--color-extra);

    &:focus-visible {
      outline: rem(2) solid var(--color-accent);
    }
  }

  @media (any-hover: hover) {
    &:hover {
      background-color: var(--color-extra);
    }
  }

  &[outline] {
    color: var(--color-accent);
    background-color: transparent;
    border: rem(2) solid var(--color-accent);

    @media (any-hover: hover) {
      &:hover {
        color: var(--color-white);
        background-color: var(--color-extra);
        border-color: var(--color-extra);
      }
    }
  }

  &[white] {
    color: var(--color-white);
    border-color: var(--color-white);

    @media (any-hover: hover) {
      &:hover {
        background-color: var(--color-extra);
        border-color: var(--color-extra);
      }
    }
  }

  &[wide] {
    width: 100%;
    padding: rem(16) rem(20);

    &[active='true'] {
      color: var(--color-white);
      background-color: var(--color-extra);
      border-color: var(--color-extra);

      &:focus-visible {
        outline: rem(2) solid var(--color-accent);
      }
    }
  }

  &[square] {
    flex-shrink: 0;
    width: rem(55);
    padding: rem(5);
  }

  &[lite] {
    background-color: var(--color-extra);

    @media (any-hover: hover) {
      &:hover {
        background-color: var(--color-accent);
      }
    }

    &[active='true'] {
      background-color: var(--color-accent);

      &:focus-visible {
        outline: rem(2) solid var(--color-extra);
      }
    }
  }

  &[disabled='true'],
  &[disabled] {
    pointer-events: none;
    opacity: 0.4;
  }

  &:focus-visible {
    outline: rem(2) solid var(--color-extra);
  }
}
</style>
