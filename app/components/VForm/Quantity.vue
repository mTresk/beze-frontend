<script setup lang="ts">
const props = defineProps<{
    modelValue: number
    min?: number
    max?: number
}>()

const emit = defineEmits<{
    (event: 'update:modelValue', value: number): void
}>()

const quantity = computed({
    get: () => props.modelValue,
    set: (value: number) => {
        let newValue = value
        if (props.min !== undefined && value < props.min)
            newValue = props.min
        if (props.max !== undefined && value > props.max)
            newValue = props.max
        emit('update:modelValue', newValue)
    },
})
</script>

<template>
    <div class="cart-item__quantity quantity">
        <button :disabled="quantity <= (min ?? 1)" type="button" class="quantity__button quantity__button_minus" @click="quantity--" />
        <div class="quantity__input">
            <input readonly :value="quantity" autocomplete="off" type="text" name="form[]">
        </div>
        <button :disabled="max !== undefined && quantity >= max" type="button" class="quantity__button quantity__button_plus" @click="quantity++" />
    </div>
</template>

<style lang="scss" scoped>
.quantity {
    display: flex;
    align-items: center;
    width: rem(100);
    height: rem(45);
    border: 2px solid $extraColor;
    border-radius: rem(4);

    // .quantity__button
    &__button {
        position: relative;
        display: flex;
        flex-shrink: 0;
        align-items: center;
        justify-content: center;
        width: rem(30);
        height: rem(30);
        cursor: pointer;

        &::before,
        &::after {
            position: absolute;
            width: rem(10);
            height: rem(1);
            content: '';
            background-color: $mainColor;
            transition: all 0.3s ease 0s;
        }

        @media (any-hover: hover) {
            &:hover {
                &::before,
                &::after {
                    background-color: $accentColor;
                }
            }
        }

        // .quantity__button_plus
        &_plus {
            &::before {
                transform: rotate(-90deg);
            }
        }

        &[disabled] {
            pointer-events: none;
        }
    }

    // .quantity__input
    &__input {
        flex: 1 1 auto;

        input {
            width: 100%;
            height: 100%;
            font-size: 16px;
            line-height: 115%;
            text-align: center;
        }
    }
}
</style>
