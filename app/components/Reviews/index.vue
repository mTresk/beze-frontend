<script setup lang="ts">
import { Reviews2GIS, ReviewsSocials } from '#components'

type TabType = 'socials' | '2gis'

const activeTab = ref<TabType>('2gis')

const components = {
    'socials': ReviewsSocials,
    '2gis': Reviews2GIS,
} as const

const currentComponent = computed(() => components[activeTab.value])

function handleTabClick(tabName: TabType) {
    activeTab.value = tabName
}
</script>

<template>
    <section class="reviews spacer">
        <div class="reviews__container">
            <div class="reviews__header">
                <UiTitle class="reviews__title">
                    Отзывы клиентов
                </UiTitle>
                <div class="reviews__tabs">
                    <UiButton
                        class="reviews__tab"
                        :class="{ 'reviews__tab--active': activeTab === '2gis' }"
                        small
                        :outline="activeTab !== '2gis' ? true : undefined"
                        tabindex="0"
                        @click="handleTabClick('2gis')"
                    >
                        2ГИС
                    </UiButton>
                    <UiButton
                        class="reviews__tab"
                        :class="{ 'reviews__tab--active': activeTab === 'socials' }"
                        small
                        :outline="activeTab !== 'socials' ? true : undefined"
                        tabindex="0"
                        @click="handleTabClick('socials')"
                    >
                        Соцсети
                    </UiButton>
                </div>
            </div>
        </div>
        <component :is="currentComponent" />
    </section>
</template>

<style lang="scss">
.reviews {
    // .reviews__header
    &__header {
        display: grid;
        gap: rem(20);

        @include adaptive-value('margin-bottom', 40, 20);
    }

    // .reviews__tabs
    &__tabs {
        display: flex;
        gap: rem(10);
        align-items: center;
    }

    // .reviews__tab
    &__tab {
        &--active {
            pointer-events: none;
        }
    }

    // .reviews__body
    &__body {
        position: relative;
    }

    // .reviews__navigation
    &__navigation {
        @media (max-width: $tablet) {
            display: none;
        }
    }

    // .reviews__button
    &__button {
        position: absolute;
        top: 50%;
        z-index: 10;
        transform: translateY(-50%);

        // .reviews__button--prev
        &--prev {
            left: rem(-30);
        }

        // .reviews__button--next
        &--next {
            right: rem(-30);
        }
    }
}

.review {
    position: relative;
    height: auto;
    opacity: 0.4;
    transition: opacity 0.3s ease-in-out;

    &::before {
        position: absolute;
        bottom: rem(-20);
        left: 50%;
        z-index: -1;
        width: 80%;
        height: 20%;
        content: '';
        background: rgb(46 46 46 / 10%);
        border-radius: rem(10);
        filter: blur(50px);
        transform: translateX(-50%) translateZ(0);
    }

    &.swiper-slide-visible {
        opacity: 1;
    }

    &__content {
        position: relative;
        height: 100%;
        padding: rem(20);
        background: rgb(46 46 46 / 16%);
        background-color: $whiteColor;
        border: 1px solid $lightColor;
        border-radius: rem(4);
    }

    // .review__image
    &__image {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        aspect-ratio: 370 / 500;

        img {
            max-height: 100%;
        }
    }
}

.ps__rail-y {
    width: 4px !important;
    background-color: transparent !important;
}

.ps__thumb-y {
    width: 4px !important;
    background-color: $accentColor !important;
}
</style>
