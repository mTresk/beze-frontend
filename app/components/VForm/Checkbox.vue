<script setup lang="ts">
const props = defineProps<{
    checked: boolean
    value?: string
}>()

const emit = defineEmits(['update:checked'])

const proxyChecked = computed({
    get() {
        return props.checked
    },

    set(val) {
        emit('update:checked', val)
    },
})
</script>

<template>
    <div class="checkbox">
        <label class="checkbox">
            <input v-model="proxyChecked" class="checkbox__input" type="checkbox" value="1" name="form[]">
            <span class="checkbox__text"><slot name="text" /></span>
        </label>
    </div>
</template>

<style lang="scss">
.checkbox {
    display: flex;
    gap: rem(10);
    align-items: flex-start;
    cursor: pointer;

    &:has(input:checked) {
        .checkbox__text {
            color: $mainColor;
        }
    }

    // .checkbox__input
    &__input {
        position: relative;
        display: flex;
        flex-shrink: 0;
        align-items: center;
        justify-content: center;
        width: rem(18);
        height: rem(18);
        appearance: none;
        cursor: pointer;
        content: '';
        border: 1px solid $accentColor;
        border-radius: rem(4);

        &:checked {
            background-color: $accentColor;

            &::before {
                position: absolute;
                width: rem(12);
                height: rem(12);
                content: '';
                background-image: url("data:image/svg+xml,%3Csvg width='12' height='12' viewBox='0 0 12 12' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M3 6L5.1213 8.1213L9.3635 3.87866' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E%0A");
                background-size: cover;
            }
        }
    }
}
</style>
