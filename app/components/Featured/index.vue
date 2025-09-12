<script setup lang="ts">
import type { IProduct } from '@/types/api'

interface IProps {
  products: IProduct[]
  name: string
}

const props = defineProps<IProps>()

const containerRef = ref(null)

useSwiper(containerRef, {
  speed: 1200,
  slidesPerView: 4,
  spaceBetween: 25,
  injectStyles: [
    `.swiper {overflow: visible;}`,
  ],
  navigation: {
    prevEl: `.${props.name}--prev`,
    nextEl: `.${props.name}--next`,
  },
  breakpoints: {
    320: {
      slidesPerView: 1.6,
      spaceBetween: 10,
    },
    480: {
      slidesPerView: 2.2,
      spaceBetween: 10,
    },
    768: {
      slidesPerView: 3.2,
      spaceBetween: 15,
    },
    1100: {
      slidesPerView: 4,
      spaceBetween: 25,
    },
  },
})
</script>

<template>
  <section class="featured spacer">
    <div class="featured__container">
      <div class="featured__header">
        <h2 class="featured__title">
          <slot name="title" />
        </h2>
        <nav class="featured__navigation slider-navigation">
          <UiSliderButtonPrev
            class="featured__button featured__button--prev"
            :class="`${props.name}--prev`"
          />
          <UiSliderButtonNext
            class="featured__button featured__button--next"
            :class="`${props.name}--next`"
          />
        </nav>
      </div>
    </div>
    <div class="featured__inner">
      <div class="featured__body">
        <swiper-container
          ref="containerRef"
          :init="false"
          class="featured__slider"
        >
          <swiper-slide
            v-for="product in products"
            :key="product.id"
            class="featured__slide"
          >
            <ProductItem :product="product" />
          </swiper-slide>
        </swiper-container>
      </div>
    </div>
  </section>
</template>

<style lang="scss">
.featured {
  &__header {
    display: flex;
    gap: rem(20);
    align-items: center;
    justify-content: space-between;

    @include adaptive-value('margin-bottom', 40, 20);
  }

  &__title {
    line-height: 140%;

    @include adaptive-value('font-size', 40, 24);
  }

  &__navigation {
    display: flex;
    align-items: center;

    @include adaptive-value('gap', 10, 8);
  }

  &__body {
    position: relative;
  }
}
</style>
