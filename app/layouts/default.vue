<script setup lang="ts">
import type { IMenu, ISettings } from '@/types/api'

const client = useSanctumClient()

const { direction } = useScrollDirection()

const { isSearchOpen } = useSearch()

const isLoading = ref(true)

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
        return titleChunk ? `${titleChunk} — Beze Studio` : 'Beze Studio'
    },
})

useNuxtApp().hook('page:loading:end', () => {
    isLoading.value = false
})

async function fetcher() {
    const [menuData, settingsData] = await Promise.all([
        client<IMenu>('/api/menu'),
        client<ISettings>('/api/settings'),
    ])
    return { menu: menuData, settings: settingsData }
}

const {
    data,
    suspense,
} = useQuery({
    queryKey: ['app-data'],
    queryFn: fetcher,
})

await suspense()

useState('menu', () => data.value?.menu)

useState('settings', () => data.value?.settings)

const description = 'Одежда на утро невесты и для дома'
</script>

<template>
    <NuxtPwaManifest />
    <Head>
        <Meta name="viewport" content="width=device-width, initial-scale=1.0 user-scalable=0" />
        <Meta name="description" :content="description" />
        <link rel="icon" type="image/png" href="/favicon-96x96.png" sizes="96x96">
        <link rel="icon" type="image/svg+xml" href="/favicon.svg">
        <link rel="shortcut icon" href="/favicon.ico">
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
        <Meta property="og:description" :content="description" />
        <Meta property="og:image" content="/images/og.png" />
        <Meta name="twitter:description" :content="description" />
        <Meta name="twitter:image" content="/images/og.png" />
        <Meta name="yandex-verification" content="a3a666efa8aa2203" />
        <Meta name="google-site-verification" content="5uwasYAmi91aCWBYkuQhhcwMe5b_43-_iiHEqNAzRLg" />
    </Head>
    <NuxtLoadingIndicator color="#b79d83" />
    <div class="wrapper" :class="scrollClass">
        <LayoutHeader />
        <Transition name="search">
            <LayoutSearch v-if="isSearchOpen" />
        </Transition>
        <main class="page">
            <LayoutSmoothScroll>
                <slot />
            </LayoutSmoothScroll>
        </main>
        <LayoutFooter />
        <LayoutNavigation />
        <LayoutCookie />
        <UiPageLoader v-if="isLoading" />
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
    position: relative;
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

    &::before {
        position: absolute;
        inset: 0;
        z-index: 120;
        visibility: hidden;
        width: 100%;
        height: 100%;
        pointer-events: none;
        content: '';
        background-color: rgb(0 0 0 / 50%);
        opacity: 0;
        transition: opacity 0.3s ease-in-out;
        transition: all 0.3s ease-in-out;

        .menu-open & {
            visibility: visible;
            pointer-events: auto;
            opacity: 1;
        }
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
    @include adaptive-value('margin-bottom', 160, 70);
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

.icon-marker {
    transform: translate(-18px, -18px);
}

.content {
    h2 {
        line-height: 140%;

        @include adaptive-value('margin-bottom', 30, 20);
        @include adaptive-value('font-size', 28, 24);

        &:not(:first-child) {
            @include adaptive-value('margin-top', 30, 20);
        }
    }

    h3 {
        line-height: 140%;

        @include adaptive-value('margin-bottom', 20, 16);
        @include adaptive-value('font-size', 24, 20);

        &:not(:first-child) {
            @include adaptive-value('margin-top', 30, 20);
        }
    }

    p {
        line-height: 140%;

        @include adaptive-value('margin-bottom', 18, 14);
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
        @include adaptive-value('margin-bottom', 18, 14);

        li {
            position: relative;
            padding-left: rem(18);
            line-height: 140%;

            @include adaptive-value('font-size', 18, 16);

            &::before {
                position: absolute;
                top: rem(8);
                left: 0;
                content: '';
                background-color: $accentColor;
                transform: rotate(45deg);

                @include adaptive-value('width', 8, 6);
                @include adaptive-value('height', 8, 6);
            }
        }
    }

    strong {
        font-weight: 500;
    }

    table {
        display: block;
        width: 100%;
        max-width: 100%;
        height: 100% !important;
        overflow-x: auto;
        white-space: nowrap;
        border-spacing: 0;
        border-collapse: collapse;

        @include hide-scroll;

        thead {
            tr {
                td {
                    line-height: 140%;
                    color: rgb(54 54 54 / 60%);

                    @include adaptive-value('font-size', 16, 14);
                    @include adaptive-value('padding-block', 20, 16);
                    @include adaptive-value('padding-inline', 20, 16);
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
                    line-height: 140%;
                    white-space: nowrap;

                    @include adaptive-value('font-size', 16, 14);
                    @include adaptive-value('padding-block', 20, 16);
                    @include adaptive-value('padding-inline', 20, 16);

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

.search-enter-active,
.search-leave-active {
    transition: all 0.5s ease;
}

.search-enter-from,
.search-leave-to {
    opacity: 0;
    filter: grayscale(1) blur(5px);
}
</style>
