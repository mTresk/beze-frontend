<script setup lang="ts">
interface IProps {
  error?: string[]
  maska?: string
  type: string
}

defineProps<IProps>()

const model = defineModel<string | number>()
</script>

<template>
  <textarea
    v-if="type === 'textarea'"
    v-model="model"
    class="form-input form-input--textarea"
    :class="{ 'form-input--error': error }"
    autocomplete="off"
  />
  <input
    v-else
    v-model="model"
    v-maska="maska"
    :type="type"
    class="form-input"
    :class="{ 'form-input--error': error }"
    autocomplete="off"
  >
</template>

<style lang="scss" scoped>
.form-input {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: rem(5) rem(16);
  font-size: rem(14);
  line-height: 130%;
  border: rem(1) solid var(--color-extra);
  border-radius: rem(4);
  transition: all 0.3s ease-in-out;

  @include adaptive-value('height', 45, 40);

  &::placeholder {
    color: var(--color-gray);
  }

  &:focus {
    border-color: var(--color-accent);

    &::placeholder {
      opacity: 0;
    }
  }

  &--error {
    border-color: var(--color-red);
  }

  &--textarea {
    height: rem(100);
    resize: none;

    @include adaptive-value('padding-top', 12, 10);
  }
}
</style>
