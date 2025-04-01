<script setup lang="ts">
const props = defineProps<{
    outline?: boolean
    white?: boolean
    wide?: boolean
    href?: string
}>()

const classes = [
    {
        'button--outline': props.outline,
        'button--white': props.white,
        'button--wide': props.wide,
    },
]
</script>

<template>
    <NuxtLink
        v-if="href"
        :to="href"
        class="button"
        :class="classes"
    >
        <slot />
    </NuxtLink>
    <button
        v-else
        class="button"
        :class="classes"
    >
        <slot />
    </button>
</template>

<style lang="scss">
.button {
    display: flex;
    gap: rem(8);
    align-items: center;
    justify-content: center;
    padding: rem(16) rem(80);
    font-size: 16px;
    line-height: 130%;
    color: $whiteColor;
    text-align: center;
    white-space: nowrap;
    background-color: $accentColor;
    border-radius: 4px;
    transition: all 0.3s ease-in-out;

    @media (any-hover: hover) {
        &:hover {
            background-color: $extraColor;
        }
    }

    &--outline {
        color: $accentColor;
        background-color: transparent;
        border: 2px solid $accentColor;

        @media (any-hover: hover){
            &:hover{
                color: $whiteColor;
                border-color: $extraColor;
            }
        }
    }

    &--white {
        color: $whiteColor;
        border-color: $whiteColor;

        @media (any-hover: hover) {
            &:hover {
                border-color: $extraColor;
            }
        }
    }

    &--wide {
        width: 100%;
        padding: rem(16) rem(20);
    }

    &[disabled] {
        pointer-events: none;
        opacity: 0.4;
    }
}
</style>
