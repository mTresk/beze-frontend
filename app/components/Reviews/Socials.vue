<script setup lang="ts">
import type { IReview } from '@/types/api'

const client = useSanctumClient()

const containerRef = ref(null)

const fetcher = async () => await client<IReview>(`/api/reviews`)

const {
    data: reviews,
    suspense,
    isLoading,
} = useQuery({
    queryKey: ['reviews'],
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
            slidesPerView: 1.2,
            spaceBetween: 10,
        },
        480: {
            slidesPerView: 2.4,
            spaceBetween: 10,
        },
        768: {
            slidesPerView: 2.4,
            spaceBetween: 20,
        },
        992: {
            slidesPerView: 3,
            spaceBetween: 20,
        },
        1200: {
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
                    <swiper-slide v-for="(review, index) in reviews?.images" :key="index" class="review">
                        <div class="review__content">
                            <div class="review__image">
                                <img
                                    class="gallery__image"
                                    :src="review.normal"
                                    :srcset="`${review.normal} 1x, ${review.retina} 2x`"
                                    alt=""
                                    loading="lazy"
                                >
                            </div>
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
