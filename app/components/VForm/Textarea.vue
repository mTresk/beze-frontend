<script setup lang="ts">
interface IProps {
  modelValue?: string | number
  error?: string[]
}

interface IEmits {
  (event: 'update:modelValue', value: number | string): void
}

defineProps<IProps>()
defineEmits<IEmits>()
</script>

<template>
  <textarea
    :value="modelValue"
    class="form-textarea"
    :class="{ 'form-textarea--error': error }"
    autocomplete="off"
    @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
  />
</template>

<style lang="scss" scoped>
.form-textarea {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: rem(100);
  padding: rem(5) rem(16);
  font-size: rem(14);
  line-height: 130%;
  resize: none;
  border: rem(1) solid var(--color-extra);
  border-radius: rem(4);
  transition: all 0.3s ease-in-out;

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
}
</style>
