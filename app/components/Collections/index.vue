<script setup lang="ts">
const containerRef = ref(null)

useSwiper(containerRef, {
    speed: 1200,
    slidesPerView: 4,
    injectStyles: [
        `.swiper {overflow: visible;}`,
    ],
    navigation: {
        prevEl: '.collections__button--prev',
        nextEl: '.collections__button--next',
    },
})
</script>

<template>
    <section class="collections spacer">
        <div class="collections__container">
            <UiTitle class="collections__title">
                Коллекции
            </UiTitle>
        </div>
        <div class="collections__inner">
            <div class="collections__body">
                <swiper-container ref="containerRef" :init="false" class="collections__slider">
                    <swiper-slide class="collection-card">
                        <a data-js-cursor href="#" class="collection-card__content">
                            <img
                                class="collection-card__image"
                                src="/images/collection/1.jpg"
                                alt="Утро невесты"
                                loading="lazy"
                            >
                            <h3 class="collection-card__title">Утро невесты</h3>
                        </a>
                    </swiper-slide>
                    <swiper-slide class="collection-card">
                        <a data-js-cursor href="#" class="collection-card__content">
                            <img
                                class="collection-card__image"
                                src="/images/collection/2.jpg"
                                alt="Утро невесты"
                                loading="lazy"
                            >
                            <h3 class="collection-card__title">Соблазн</h3>
                        </a>
                    </swiper-slide>
                    <swiper-slide class="collection-card">
                        <a data-js-cursor href="#" class="collection-card__content">
                            <img
                                class="collection-card__image"
                                src="/images/collection/3.jpg"
                                alt="Утро невесты"
                                loading="lazy"
                            >
                            <h3 class="collection-card__title">Для дома</h3>
                        </a>
                    </swiper-slide>
                    <swiper-slide class="collection-card">
                        <a data-js-cursor href="#" class="collection-card__content">
                            <img
                                class="collection-card__image"
                                src="/images/collection/4.jpg"
                                alt="Утро невесты"
                                loading="lazy"
                            >
                            <h3 class="collection-card__title">Отпуск</h3>
                        </a>
                    </swiper-slide>
                    <swiper-slide class="collection-card">
                        <a data-js-cursor href="#" class="collection-card__content">
                            <img
                                class="collection-card__image"
                                src="/images/collection/5.jpg"
                                alt="Утро невесты"
                                loading="lazy"
                            >
                            <h3 class="collection-card__title">Cotton</h3>
                        </a>
                    </swiper-slide>
                    <swiper-slide class="collection-card">
                        <a data-js-cursor href="#" class="collection-card__content">
                            <img
                                class="collection-card__image"
                                src="/images/collection/6.jpg"
                                alt="Утро невесты"
                                loading="lazy"
                            >
                            <h3 class="collection-card__title">Gold</h3>
                        </a>
                    </swiper-slide>
                </swiper-container>
                <nav class="collections__navigation slider-navigation">
                    <UiSliderButtonPrev class="collections__button collections__button--prev" />
                    <UiSliderButtonNext class="collections__button collections__button--next" />
                </nav>
            </div>
        </div>
    </section>
</template>

<style lang="scss">
.collections {
    // .collections__title
    &__title {
        margin-bottom: rem(40);
    }

    // .collections__body
    &__body {
        position: relative;
        overflow: visible;
    }

    // .collections__slider
    &__slider {
        position: relative;
        overflow: visible;
    }

    // .collections__button
    &__button {
		position: absolute;
        top: 50%;
		z-index: 10;
		transform: translateY(-50%);

		// .collections__button--prev
		&--prev {
			left: -30px;
		}

		// .collections__button--next
		&--next {
			right: -30px;
		}
	}
}

.collection-card {
    &__content{
    position: relative;
    display: flex;
    align-items: flex-end;
    aspect-ratio: 1;
    padding: rem(24);
    overflow: hidden;

    &::before {
        position: absolute;
        inset: 0;
        z-index: 2;
        content: '';
        background: linear-gradient(0deg, rgb(0 0 0 / 30%) 0%, rgb(0 0 0 / 0%) 100%);
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
            .collection-card__image {
                transform: scale(1.05);
            }

            &::after {
                opacity: 0.2;
            }
        }
    }
    }

    // .collection-card__image
    &__image {
        transition: transform 0.3s ease-in-out;

        @include image;
    }

    // .collection-card__title
    &__title {
        position: relative;
        z-index: 5;
        font-family: 'Quincy CF', sans-serif;
        font-size: 24px;
        line-height: 120%;
        color: $whiteColor;
        letter-spacing: 0.01em;
    }
}
</style>
