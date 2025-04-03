<script setup lang="ts">
const { direction } = useScrollDirection()

const scrollClass = computed(() => {
    if (direction.value === 'down')
        return 'scroll-down'
    if (direction.value === 'up')
        return 'scroll-up'
    return ''
})

gsap.config({
    nullTargetWarn: false,
})

useHead({
    htmlAttrs: {
        lang: 'ru',
    },
    titleTemplate: (titleChunk) => {
        return titleChunk ? `${titleChunk} — BEZE Exclusive Studio` : 'BEZE Exclusive Studio'
    },
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
        <LayoutFooter />
    </div>
</template>

<style lang="scss">
body {
    background-color: $whiteColor;

    .lock & {
        overflow: hidden;
        overscroll-behavior: none;
        touch-action: none;
    }
}

.wrapper {
    display: flex;
    flex-direction: column;
    min-height: 100dvh;
    overflow: hidden;

    @supports (overflow: clip) {
        overflow: clip;
    }

    > main {
        flex: 1 1 auto;
    }

    > * {
        min-width: 0;
    }
}

[class*='__container'] {
        max-width: rem(1480);
        padding-inline: rem(20);
        margin-inline: auto;
}

[class*='__inner'] {
    max-width: rem(1920);
    margin-inline: auto;

    @include adaptive-value('padding-inline', 80, 20);
}

.spacer {
    margin-bottom: rem(160);
}

.breadcrumb {
    display: flex;
    gap: rem(17);
    align-items: center;
    margin-bottom: rem(30);

    li {
        position: relative;
        font-size: 16px;
        line-height: 140%;
        transition: color 0.3s ease-in-out;

        &:not(:last-child) {
            &::before {
                position: absolute;
                right: -10px;
                font-size: 14px;
                line-height: 140%;
                color: rgb(54 54 54 / 50%);
                content:'/';
            }
        }

        &:last-child{
            color: rgb(54 54 54 / 50%);
            pointer-events: none;
        }

        @media (any-hover: hover){
            &:hover{
                color: $accentColor;
            }
        }
    }
}

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

.layout-enter-active,
.layout-leave-active {
    transition: all 0.4s cubic-bezier(0.25, 0.45, 0.45, 0.95);
}

.layout-enter-from,
.layout-leave-to {
    opacity: 0;
    filter: grayscale(1) blur(5px);
}
</style>
