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

<style lang="scss">
.link {
    font-size: rem(16);
    line-height: 140%;
    text-decoration: underline;
    text-decoration-thickness: 10%;
    text-decoration-style: dotted;
    text-underline-offset: rem(3);
    transition: color 0.3s ease-in-out;
    text-decoration-skip-ink: none;

    @media (any-hover: hover) {
        &:hover {
            color: $accentColor;
        }
    }

    &[medium] {
        font-size: rem(18);
    }

    @media (any-hover: hover) {
        &:hover {
            color: $accentColor;
        }
    }
}
</style>
