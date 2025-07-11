<script setup lang="ts">
defineProps<{
    modelValue?: string | number
    error?: string[]
}>()

defineEmits<{
    (event: 'update:modelValue', value: number | string): void
}>()
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
    border: rem(1) solid $extraColor;
    border-radius: rem(4);
    transition: all 0.3s ease-in-out;

    &::placeholder {
        color: rgb(54 54 54 / 50%);
    }

    &:focus {
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
