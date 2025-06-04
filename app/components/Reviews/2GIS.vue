<script setup lang="ts">
import type { ITestimonial } from '@/types/api'
import 'vue3-perfect-scrollbar/style.css'

const client = useSanctumClient()

const containerRef = ref(null)

const fetcher = async () => await client<ITestimonial[]>(`/api/testimonials`)

const {
    data: testimonials,
    suspense,
    isLoading,
} = useQuery({
    queryKey: ['testimonials'],
    queryFn: fetcher,
})

await suspense()

useSwiper(containerRef, {
    speed: 1200,
    slidesPerView: 4,
    spaceBetween: 30,
    injectStyles: [
        `.swiper {overflow: visible;}`,
    ],
    watchSlidesProgress: true,
    navigation: {
        prevEl: '.reviews__button--prev',
        nextEl: '.reviews__button--next',
    },
    breakpoints: {
        320: {
            slidesPerView: 1.1,
            spaceBetween: 10,
        },
        480: {
            slidesPerView: 1.4,
            spaceBetween: 10,
        },
        768: {
            slidesPerView: 1.8,
            spaceBetween: 10,
        },
        992: {
            slidesPerView: 2.2,
            spaceBetween: 20,
        },
        1300: {
            slidesPerView: 3.4,
            spaceBetween: 20,
        },
        1550: {
            slidesPerView: 4,
            spaceBetween: 30,
        },
    },
})
</script>

<template>
    <div class="reviews__inner">
        <div class="reviews__body">
            <UiSpinner v-if="isLoading" />
            <ClientOnly v-else>
                <swiper-container ref="containerRef" :init="false" class="reviews__slider">
                    <swiper-slide v-for="testimonial in testimonials" :key="testimonial.id" class="testimonial">
                        <div class="testimonial__content">
                            <div class="testimonial__header">
                                <div class="testimonial__info">
                                    <h4 class="testimonial__name">
                                        {{ testimonial.name }}
                                    </h4>
                                    <div class="testimonial__date">
                                        {{ testimonial.date }}
                                    </div>
                                </div>
                                <div class="testimonial__rating">
                                    <UiIcon
                                        v-for="i in 5"
                                        :key="i"
                                        class="testimonial__star"
                                        name="star"
                                        size="20"
                                        :class="{ 'testimonial__star--inactive': i > testimonial.rating }"
                                    />
                                </div>
                            </div>
                            <PerfectScrollbar :options="{ suppressScrollX: true, wheelPropagation: true, wheelSpeed: 0.2 }">
                                <div class="testimonial__text" v-html="testimonial.text" />
                            </PerfectScrollbar>
                        </div>
                    </swiper-slide>
                </swiper-container>
            </ClientOnly>
            <nav class="reviews__navigation slider-navigation">
                <UiSliderButtonPrev class="reviews__button reviews__button--prev" />
                <UiSliderButtonNext class="reviews__button reviews__button--next" />
            </nav>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.testimonial {
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

    &__content {
        position: relative;
        display: flex;
        flex-direction: column;
        height: 100%;
        padding: rem(40) rem(30) rem(50);
        background: rgb(46 46 46 / 16%);
        background-color: $whiteColor;
        border: 1px solid $lightColor;
        border-radius: rem(4);

        @include adaptive-value('gap', 25, 15);
        @include adaptive-value('padding-top', 40, 30);
        @include adaptive-value('padding-bottom', 50, 30);
        @include adaptive-value('padding-inline', 30, 20);
    }

    &.swiper-slide-visible {
        opacity: 1;
    }

    // .testimonial__header
    &__header {
        display: flex;
        align-items: center;
        justify-content: space-between;

        @include adaptive-value('gap', 20, 6);

        @media (max-width: $mobileSmall) {
            display: grid;
            justify-content: unset;
        }
    }

    // .testimonial__info
    &__info {
        display: grid;
        gap: rem(2);
    }

    // .testimonial__name
    &__name {
        font-weight: 500;
        line-height: 140%;

        @include adaptive-value('font-size', 18, 16);
    }

    // .testimonial__date
    &__date {
        line-height: 140%;
        color: rgb(54 54 54 / 50%);

        @include adaptive-value('font-size', 14, 12);
    }

    // .testimonial__rating
    &__rating {
        display: flex;
        align-items: center;
    }

    // .testimonial__star
    &__star {
        height: auto;
        color: #ffb81c;

        @include adaptive-value('max-width', 20, 14);

        &--inactive {
            color: rgb(54 54 54 / 30%);
        }
    }

    // .testimonial__text
    &__text {
        position: relative;
        line-height: 140%;

        @include adaptive-value('font-size', 16, 14);
        @include adaptive-value('max-height', 180, 140);
    }
}
</style>
