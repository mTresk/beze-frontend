<script setup lang="ts">
interface IProps {
  modelValue: string
  value: string
  label: string
  name?: string
}

interface IEmits {
  (event: 'update:modelValue', value: string): void
}

defineProps<IProps>()

const emit = defineEmits<IEmits>()

function handleChange(e: Event) {
  emit('update:modelValue', (e.target as HTMLInputElement).value)
}
</script>

<template>
  <label class="option">
    <input
      class="option__input"
      type="radio"
      :value="value"
      :checked="modelValue === value"
      :name="name"
      @change="handleChange"
    >
    <div class="option__text">{{ label }}</div>
  </label>
</template>

<style lang="scss" scoped>
.option {
  display: flex;
  gap: rem(10);
  align-items: center;
  cursor: pointer;

  &__input {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: rem(20);
    height: rem(20);
    appearance: none;
    cursor: pointer;
    content: '';
    border: rem(1) solid rgb(34 36 51 / 18%);
    border-radius: 50%;

    &:checked {
      border-color: var(--color-accent);

      &::before {
        position: absolute;
        width: rem(12);
        height: rem(12);
        content: '';
        background-color: var(--color-accent);
        border-radius: 50%;
      }
    }
  }

  &__text {
    font-size: rem(14);
    line-height: 130%;
  }
}
</style>
