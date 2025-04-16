<script setup lang="ts">
defineProps<{
    href?: string
    isLoading?: boolean
}>()
</script>

<template>
    <NuxtLink
        v-if="href"
        :to="href"
        class="button"
        :disabled="isLoading"
    >
        <slot />
        <UiButtonSpinner v-if="isLoading" size="20" />
    </NuxtLink>
    <button
        v-else
        class="button"
        :disabled="isLoading"
    >
        <slot />
        <UiButtonSpinner v-if="isLoading" size="20" />
    </button>
</template>

<style lang="scss">
.button {
    display: flex;
    gap: rem(8);
    align-items: center;
    justify-content: center;
    padding-block: rem(5);
    line-height: 130%;
    color: $whiteColor;
    text-align: center;
    white-space: nowrap;
    background-color: $accentColor;
    border-radius: rem(4);
    transition: all 0.3s ease-in-out;

    @include adaptive-value('height', 55, 45);
    @include adaptive-value('font-size', 16, 14);
    @include adaptive-value('padding-inline', 80, 60);

    &[active='true'] {
        background-color: $extraColor;
    }

    @media (any-hover: hover) {
        &:hover {
            background-color: $extraColor;
        }
    }

    &[outline] {
        color: $accentColor;
        background-color: transparent;
        border: 2px solid $accentColor;

        @media (any-hover: hover) {
            &:hover {
                color: $whiteColor;
                background-color: $extraColor;
                border-color: $extraColor;
            }
        }
    }

    &[white] {
        color: $whiteColor;
        border-color: $whiteColor;

        @media (any-hover: hover) {
            &:hover {
                background-color: $extraColor;
                border-color: $extraColor;
            }
        }
    }

    &[wide] {
        width: 100%;
        padding: rem(16) rem(20);

        &[active='true'] {
            color: $whiteColor;
            background-color: $extraColor;
            border-color: $extraColor;
        }
    }

    &[square] {
        flex-shrink: 0;
        width: rem(55);
        padding: rem(5);
    }

    &[lite] {
        background-color: $extraColor;

        @media (any-hover: hover) {
            &:hover {
                background-color: $accentColor;
            }
        }

        &[active='true'] {
            background-color: $accentColor;
        }
    }

    &[disabled='true'] {
        pointer-events: none;
        opacity: 0.4;
    }
}
</style>
