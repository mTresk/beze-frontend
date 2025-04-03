<script setup lang="ts">
defineProps<{
    modelValue?: string | number
    error?: string[]
    maska?: string
}>()

defineEmits<{
    (event: 'update:modelValue', value: number | string): void
}>()
</script>

<template>
    <input
        v-maska="maska"
        :value="modelValue"
        class="form-input"
        :class="{ 'form-input--error': error }"
        autocomplete="off"
        @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
    >
</template>

<style lang="scss" scoped>
.form-input {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: rem(45);
    padding: rem(5) rem(16);
    font-size: 14px;
    line-height: 130%;
    border: 2px solid $extraColor;
    border-radius: rem(4);
    transition: all 0.3s ease-in-out;

    &::placeholder{
        color: rgb(54 54 54 / 50%);
    }

    &:focus{
        border-color: $accentColor;

        &::placeholder {
            opacity: 0;
        }
    }

    &--error {
        border-color: $redColor;
    }
}
</style>
