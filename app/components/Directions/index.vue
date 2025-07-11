<script setup lang="ts">
import type { ICategory } from '@/types/api'

const client = useSanctumClient()

const containerRef = ref(null)

useSwiper(containerRef, {
    speed: 1200,
    slidesPerView: 2,
    injectStyles: [
        `.swiper {overflow: visible;}`,
    ],
    navigation: {
        prevEl: '.directions__button--prev',
        nextEl: '.directions__button--next',
    },
    breakpoints: {
        320: {
            slidesPerView: 1.1,
        },
        768: {
            slidesPerView: 1.4,
        },
        992: {
            slidesPerView: 2,
        },
    },
})

async function fetcher() {
    return await client<ICategory[]>(`/api/categories`)
}

const {
    data: categories,
    suspense,
    isLoading,
} = useQuery({
    queryKey: ['categories'],
    queryFn: fetcher,
})

await suspense()
</script>

<template>
    <section class="directions spacer">
        <div class="directions__inner">
            <div class="directions__body">
                <UiSpinner v-if="isLoading" />
                <swiper-container v-else ref="containerRef" :init="false" class="directions__slider">
                    <swiper-slide v-for="category in categories" :key="category.id" class="direction-card">
                        <NuxtLink :to="`/catalog/category/${category.slug}`" data-js-cursor class="direction-card__wrapper">
                            <img
                                class="direction-card__image"
                                loading="lazy"
                                :src="category.image.normal"
                                :srcset="`${category.image.normal} 1x, ${category.image.retina} 2x`"
                                :alt="category.name"
                                width="880"
                                height="880"
                            >
                            <div class="direction-card__content">
                                <div class="direction-card__header">
                                    <p class="direction-card__label">
                                        {{ category.label }}
                                    </p>
                                    <UiTitle class="direction-card__title">
                                        {{ category.name }}
                                    </UiTitle>
                                </div>
                                <div class="direction-card__description" v-html="category.description" />
                            </div>
                        </NuxtLink>
                    </swiper-slide>
                </swiper-container>

                <nav class="directions__navigation">
                    <UiSliderButtonPrev class="directions__button directions__button--prev" />
                    <UiSliderButtonNext class="directions__button directions__button--next" />
                </nav>
            </div>
        </div>
    </section>
</template>

<style lang="scss" scoped>
// ========================================================================================================================================================
.directions {
    &__body {
        position: relative;
        overflow: visible;
    }

    &__navigation {
        @media (max-width: $tablet) {
            display: none;
        }
    }

    &__button {
        position: absolute;
        top: 50%;
        z-index: 10;
        transform: translateY(-50%);

        &--prev {
            left: -30px;
        }

        &--next {
            right: -30px;
        }
    }
}

.direction-card {
    position: relative;
    aspect-ratio: 1;
    overflow: hidden;

    &::before {
        position: absolute;
        top: 0;
        left: 0;
        z-index: 2;
        width: 100%;
        content: '';
        background: linear-gradient(
            0deg,
            rgb(28 27 26 / 0%),
            rgb(28 27 26 / 0%) 4%,
            rgb(28 27 26 / 1.2%) 12%,
            rgb(28 27 26 / 3.6%) 24%,
            rgb(28 27 26 / 9%) 40%,
            rgb(28 27 26 / 18%) 56%,
            rgb(28 27 26 / 30.6%) 72%,
            rgb(28 27 26 / 60%)
        );

        @include adaptive-value('height', 200, 100);
    }

    &::after {
        position: absolute;
        bottom: 0;
        left: 0;
        z-index: 2;
        width: 100%;
        content: '';
        background: linear-gradient(
            180deg,
            rgb(28 27 26 / 0%),
            rgb(28 27 26 / 0%) 4%,
            rgb(28 27 26 / 1.2%) 12%,
            rgb(28 27 26 / 3.6%) 24%,
            rgb(28 27 26 / 9%) 40%,
            rgb(28 27 26 / 18%) 56%,
            rgb(28 27 26 / 30.6%) 72%,
            rgb(28 27 26 / 60%)
        );

        @include adaptive-value('height', 240, 150);
    }

    @media (any-hover: hover) {
        &:hover {
            .direction-card__image {
                transform: scale(1.05);
            }
        }
    }

    &__wrapper {
        position: relative;
        display: block;
        height: 100%;
    }

    &__image {
        transition: transform 0.3s ease-in-out;

        @include image;
    }

    &__content {
        position: relative;
        z-index: 5;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        height: 100%;

        @include adaptive-value('padding-block', 64, 20);
        @include adaptive-value('padding-inline', 32, 20);
    }

    &__header {
        display: grid;
    }

    &__label {
        line-height: 125%;
        color: rgb(255 255 255 / 80%);
        text-transform: uppercase;

        @include adaptive-value('font-size', 12, 10);
    }

    &__title {
        color: $whiteColor;
    }

    &__description {
        align-self: flex-end;
        max-width: rem(480);
        line-height: 140%;
        color: $whiteColor;
        background: rgb(255 255 255 / 14%);
        border: 1px solid rgb(255 255 255 / 34%);
        backdrop-filter: blur(6px);

        @include adaptive-value('font-size', 20, 14);
        @include adaptive-value('padding-block', 24, 16);
        @include adaptive-value('padding-inline', 40, 16);
        @include adaptive-value('min-height', 132, 100);
    }
}
</style>
