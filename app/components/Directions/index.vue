<script setup lang="ts">
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
})
</script>

<template>
    <section class="directions">
        <div class="directions__inner">
            <div class="directions__body">
                <swiper-container ref="containerRef" :init="false" class="directions__slider">
                    <swiper-slide class="direction-card">
                        <a data-js-cursor href="#" class="direction-card__wrapper">
                            <img
                                class="direction-card__image"
                                src="/images/directions/1.webp"
                                alt="Для невест"
                                loading="lazy"
                            >
                            <div class="direction-card__content">
                                <div class="direction-card__header">
                                    <p class="direction-card__label">Одежда</p>
                                    <UiTitle class="direction-card__title">Для невест</UiTitle>
                                </div>
                                <p class="direction-card__description">
                                    Wedding - наряды на утро невесты, как нашего собственного производства, так
                                    и других производителей.
                                </p>
                            </div>
                        </a>
                    </swiper-slide>
                    <swiper-slide class="direction-card">
                        <a data-js-cursor href="#" class="direction-card__wrapper">
                            <img
                                class="direction-card__image"
                                src="/images/directions/2.webp"
                                alt="Для невест"
                                loading="lazy"
                            >
                            <div class="direction-card__content">
                                <div class="direction-card__header">
                                    <p class="direction-card__label">Одежда</p>
                                    <UiTitle class="direction-card__title">Для дома</UiTitle>
                                </div>
                                <p class="direction-card__description">
                                    Home - домашняя одежда и аксессуары, которые мы разрабатываем и производим
                                    сами.
                                </p>
                            </div>
                        </a>
                    </swiper-slide>
                    <swiper-slide class="direction-card">
                        <a data-js-cursor href="#" class="direction-card__wrapper">
                            <img
                                class="direction-card__image"
                                src="/images/directions/1.webp"
                                alt="Для невест"
                                loading="lazy"
                            >
                            <div class="direction-card__content">
                                <div class="direction-card__header">
                                    <p class="direction-card__label">Одежда</p>
                                    <UiTitle class="direction-card__title">Для невест</UiTitle>
                                </div>
                                <p class="direction-card__description">
                                    Wedding - наряды на утро невесты, как нашего собственного производства, так
                                    и других производителей.
                                </p>
                            </div>
                        </a>
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
    margin-bottom: rem(160);

    // .directions__body
    &__body {
        position: relative;
        overflow: visible;
    }

    // .directions__button
	&__button {
		position: absolute;
        top: 50%;
		z-index: 10;
		transform: translateY(-50%);

		// .directions__button--prev
		&--prev {
			left: -30px;
		}

		// .directions__button--next
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
        inset: 0;
        z-index: 2;
        content: '';
        background: linear-gradient(180deg, rgb(0 0 0 / 30%) 0%, rgb(0 0 0 / 0%) 100%);
    }

    &::after {
        position: absolute;
        inset: 0;
        content: '';
        background-color: $mainColor;
        opacity: 0.05;
        transition: opacity 0.3s ease-in-out;
    }

    @media (any-hover: hover) {
        &:hover {
            .direction-card__image {
                transform: scale(1.05);
            }

            &::after {
                opacity: 0.2;
            }
        }
    }

    // .direction-card__wrapper
    &__wrapper {
        position: relative;
        display: block;
        height: 100%;
    }

    // .direction-card__image
    &__image {
        transition: transform 0.3s ease-in-out;

        @include image;
    }

    // .direction-card__content
    &__content {
        position: relative;
        z-index: 5;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        height: 100%;
        padding: rem(64) rem(32);
    }

    // .direction-card__header
    &__header {
        display: grid;
    }

    // .direction-card__label
    &__label {
        font-size: 12px;
        line-height: 125%;
        color: rgb(255 255 255 / 80%);
        text-transform: uppercase;
    }

    // .direction-card__title
    &__title {
        color: $whiteColor;
    }

    // .direction-card__description
    &__description {
        align-self: flex-end;
        max-width: rem(480);
        min-height: rem(132);
        padding: rem(24) rem(40);
        font-size: 20px;
        line-height: 140%;
        color: $whiteColor;
        background: rgb(255 255 255 / 14%);
        border: 1px solid rgb(255 255 255 / 34%);
        backdrop-filter: blur(6px);
    }
}
</style>
