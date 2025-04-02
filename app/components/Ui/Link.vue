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
    font-size: 16px;
    line-height: 130%;
    text-decoration: underline;
    text-decoration-thickness: 10%;
    text-decoration-style: dotted;
    transition: color 0.3s ease-in-out;

    @media (any-hover: hover){
        &:hover{
            color: $accentColor;
        }
    }
}
</style>
