<script setup lang="ts">
import type { IProduct } from '@/types/api'

const props = defineProps<{
    products: IProduct[]
    name: string
}>()

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
})
</script>

<template>
    <section class="featured spacer">
        <div class="featured__container">
            <h2 class="featured__title">
                <slot name="title" />
            </h2>
        </div>
        <div class="featured__inner">
            <div class="featured__body">
                <swiper-container ref="containerRef" :init="false" class="featured__slider">
                    <swiper-slide v-for="product in products" :key="product.id" class="featured__slide">
                        <ProductItem :product="product" />
                    </swiper-slide>
                </swiper-container>
                <nav class="featured__navigation slider-navigation">
                    <UiSliderButtonPrev class="featured__button featured__button--prev" :class="`${props.name}--prev`" />
                    <UiSliderButtonNext class="featured__button featured__button--next" :class="`${props.name}--next`" />
                </nav>
            </div>
        </div>
    </section>
</template>

<style lang="scss">
.featured {
    // .featured__title
    &__title {
        margin-bottom: rem(40);
        font-size: 40px;
        line-height: 140%;
    }

    // .featured__body
    &__body {
        position: relative;
    }

    // .featured__button
    &__button {
        position: absolute;
        top: 50%;
        z-index: 10;
        transform: translateY(-50%);

        // .featured__button--prev
        &--prev {
            left: -30px;
        }

        // .featured__button--next
        &--next {
            right: -30px;
        }
    }
}
</style>
