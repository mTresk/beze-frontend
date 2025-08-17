<script setup lang="ts">
import type { DaDataSuggestionAnyType, LocationOptions } from 'vue-dadata-3'
import { DaDataNext } from 'vue-dadata-3'

defineProps<{
  modelValue?: string | number
  placeholder?: string
  id?: string
  error?: string[]
  maska?: string
  locationOptions?: LocationOptions
}>()

defineEmits<{
  (event: 'update:modelValue', value: number | string): void
  (event: 'selected', value: DaDataSuggestionAnyType): void
}>()
</script>

<template>
  <DaDataNext
    :model-value="modelValue"
    :placeholder="placeholder"
    :input-id="id"
    :locations="locationOptions"
    :token="useRuntimeConfig().public.dadataApiKey"
    @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
    @on-selected="(suggestion: DaDataSuggestionAnyType) => {
      $emit('update:modelValue', suggestion.value)
      $emit('selected', suggestion)
    }"
  />
</template>

<style lang="scss">
.dadata {
  width: 100%;
  max-width: none;

  &__input {
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
  }

  &__list {
    position: absolute;
    top: calc(100% + rem(4));
    z-index: 10;
    display: grid;
    width: 100%;
    overflow: hidden;
    background-color: var(--color-white);
    border-radius: 0 0 rem(4) rem(4);
    box-shadow: 0 0 rem(14) 0 rgb(0 0 0 / 10%);

    @include adaptive-value('font-size', 16, 14);

    &__row {
      padding: rem(5) rem(16);
      font-size: rem(16);
      line-height: 125%;
      cursor: pointer;
      transition: all 0.3s ease-in-out;

      @media (any-hover: hover) {
        &:hover {
          color: var(--color-white);
          background-color: var(--color-accent);
        }
      }
    }
  }
}
</style>
