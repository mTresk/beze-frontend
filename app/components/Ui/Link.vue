<script setup lang="ts">
defineProps<{
    href?: string
}>()
</script>

<template>
    <NuxtLink
        v-if="href"
        :to="href"
        class="link"
    >
        <slot />
    </NuxtLink>
    <button
        v-else
        class="link"
        type="button"
    >
        <slot />
    </button>
</template>

<style lang="scss" scoped>
.link {
    display: inline-block;
    line-height: 140%;
    white-space: nowrap;
    text-decoration: underline;
    text-decoration-thickness: 10%;
    text-decoration-style: dotted;
    text-underline-offset: rem(3);
    transition: color 0.3s ease-in-out;
    text-decoration-skip-ink: none;

    @include adaptive-value('font-size', 16, 14);

    @media (any-hover: hover) {
        &:hover {
            color: $accentColor;
        }
    }

    &[medium] {
        @include adaptive-value('font-size', 18, 14);
    }

    @media (any-hover: hover) {
        &:hover {
            color: $accentColor;
        }
    }
}
</style>
