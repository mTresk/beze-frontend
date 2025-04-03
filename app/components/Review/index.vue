<script setup lang="ts">
const containerRef = ref(null)

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
})
</script>

<template>
    <section class="reviews spacer">
        <div class="reviews__container">
            <UiTitle class="reviews__title">
                Отзывы клиентов
            </UiTitle>
        </div>
        <div class="reviews__inner">
            <div class="reviews__body">
                <swiper-container ref="containerRef" :init="false" class="reviews__slider">
                    <swiper-slide class="review">
                        <div class="review__content">
                            <div class="review__image">
                                <img src="/images/reviews/1.jpg" alt="" loading="lazy">
                            </div>
                        </div>
                    </swiper-slide>
                    <swiper-slide class="review">
                        <div class="review__content">
                            <div class="review__image">
                                <img src="/images/reviews/2.jpg" alt="" loading="lazy">
                            </div>
                        </div>
                    </swiper-slide>
                    <swiper-slide class="review">
                        <div class="review__content">
                            <div class="review__image">
                                <img src="/images/reviews/3.jpg" alt="" loading="lazy">
                            </div>
                        </div>
                    </swiper-slide>
                    <swiper-slide class="review">
                        <div class="review__content">
                            <div class="review__image">
                                <img src="/images/reviews/4.jpg" alt="" loading="lazy">
                            </div>
                        </div>
                    </swiper-slide>
                    <swiper-slide class="review">
                        <div class="review__content">
                            <div class="review__image">
                                <img src="/images/reviews/5.jpg" alt="" loading="lazy">
                            </div>
                        </div>
                    </swiper-slide>
                </swiper-container>
                <nav class="reviews__navigation slider-navigation">
                    <UiSliderButtonPrev class="reviews__button reviews__button--prev" />
                    <UiSliderButtonNext class="reviews__button reviews__button--next" />
                </nav>
            </div>
        </div>
    </section>
</template>

<style lang="scss" scoped>
.reviews {
    // .reviews__title
    &__title {
        margin-bottom: rem(40);
    }

    // .reviews__body
    &__body {
        position: relative;
    }

    // .reviews__button
    &__button {
        position: absolute;
        top: 50%;
        z-index: 10;
        transform: translateY(-50%);

        // .reviews__button--prev
        &--prev {
            left: -30px;
        }

        // .reviews__button--next
        &--next {
            right: -30px;
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
        bottom: -20px;
        left: 50%;
        z-index: -1;
        width: 80%;
        height: 20%;
        content: '';
        background: rgb(46 46 46 / 10%);
        border-radius: rem(10);
        filter: blur(50px);
        transform: translateX(-50%);
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
            max-width: 100%;
        }
    }
}
</style>
