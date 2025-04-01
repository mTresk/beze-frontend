<script setup lang="ts">
const props = defineProps<{
    outline?: boolean
    white?: boolean
    href?: string
}>()

const classes = [
    {
        'button--outline': props.outline,
        'button--wite': props.white,
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
    padding: rem(16) rem(80);
    font-size: 16px;
    line-height: 130%;
    color: $whiteColor;
    text-align: center;
    background-color: $accentColor;
    border-radius: 4px;
    transition: all 0.3s ease-in-out;

    @media (any-hover: hover) {
        &:hover {
            background-color: $extraColor;
        }
    }

    &--outline {
        background-color: transparent;
        border: 2px solid $whiteColor;
    }

    &--white {
        color: $whiteColor;

        @media (any-hover: hover) {
            &:hover {
                border-color: $extraColor;
            }
        }
    }

    &[disabled] {
        pointer-events: none;
        opacity: 0.4;
    }
}
</style>
