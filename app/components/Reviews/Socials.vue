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
        <swiper-container
          ref="containerRef"
          :init="false"
          class="reviews__slider"
        >
          <swiper-slide
            v-for="(review, index) in reviews?.images"
            :key="index"
            class="review"
          >
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

<style lang="scss" scoped>
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
    filter: blur(rem(50));
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
    background-color: var(--color-white);
    border: rem(1) solid var(--color-light);
    border-radius: rem(4);
  }

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
</style>
