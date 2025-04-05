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
    margin-inline: auto;

    @include adaptive-value('padding-inline', 40, 20);
}

[class*='__inner'] {
    max-width: rem(1920);
    margin-inline: auto;

    @include adaptive-value('padding-inline', 80, 20);

    @media (max-width: em(1600)) {
        @include adaptive-value('padding-inline', 40, 20);
    }
}

.spacer {
    @include adaptive-value('margin-bottom', 160, 80);
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

.content {
    h2 {
        line-height: 140%;

        @include adaptive-value('margin-bottom', 30, 20);
        @include adaptive-value('font-size', 28, 24);
        @include adaptive-value('margin-top', 30, 20);
    }

    h3 {
        line-height: 140%;

        @include adaptive-value('margin-bottom', 20, 16);
        @include adaptive-value('font-size', 24, 20);
        @include adaptive-value('margin-top', 30, 20);
    }

    p {
        line-height: 140%;

        @include adaptive-value('margin-bottom', 20, 16);
        @include adaptive-value('font-size', 18, 16);
    }

    a {
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
    }

    ul {
        display: grid;

        @include adaptive-value('gap', 20, 16);
        @include adaptive-value('margin-bottom', 20, 16);

        li {
            position: relative;
            padding-left: rem(18);
            line-height: 140%;

            @include adaptive-value('font-size', 18, 16);

            &::before {
                position: absolute;
                top: 9px;
                left: 0;
                width: rem(8);
                height: rem(8);
                content: '';
                background-color: $accentColor;
                transform: rotate(45deg);
            }
        }
    }

    strong {
        font-weight: 500;
    }

    table {
        width: 100%;
        border-spacing: 0;
        border-collapse: collapse;

        thead {
            tr {
                td {
                    padding-inline: rem(20);
                    padding-bottom: rem(20);
                    font-size: rem(16);
                    line-height: 140%;
                    color: rgb(54 54 54 / 60%);
                }
            }
        }

        tbody {
            tr {
                &:nth-child(odd) {
                    td {
                        background-color: $lightColor;
                    }
                }

                td {
                    padding-block: rem(20);
                    padding-inline: rem(20);
                    font-size: rem(16);
                    line-height: 140%;

                    &:first-child {
                        border-top-left-radius: rem(4);
                        border-bottom-left-radius: rem(4);
                    }

                    &:last-child {
                        border-top-right-radius: rem(4);
                        border-bottom-right-radius: rem(4);
                    }
                }
            }
        }
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
