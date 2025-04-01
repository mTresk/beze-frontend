<script setup lang="ts">
const { direction } = useScrollDirection()

const scrollClass = computed(() => {
    if (direction.value === 'down')
        return 'scroll-down'
    if (direction.value === 'up')
        return 'scroll-up'
    return ''
})
</script>

<template>
    <NuxtLoadingIndicator color="#b79d83" />
    <div class="wrapper" :class="scrollClass">
        <LayoutHeader />
        <main class="page">
            <LayoutSmoothScroll>
                <slot />
            </LayoutSmoothScroll>
        </main>
    </div>
    <UiCursor />
</template>

<style lang="scss">
.toastify-toast {
    font-family: 'Tilda Sans', sans-serif;
    font-size: rem(14);
    color: $mainColor;
    background-color: $lightColor;
    box-shadow: 0 0 14px 0 rgb(0 0 0 / 10%);

    svg {
        fill: $extraColor;
    }
}
</style>
