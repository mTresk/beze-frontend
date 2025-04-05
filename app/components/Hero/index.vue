<script setup lang="ts">
const containerRef = ref(null)

useSwiper(containerRef, {
    loop: true,
    speed: 1500,
    autoplay: {
        delay: 5000,
    },
    slidesPerView: 1,
})
</script>

<template>
    <section class="hero">
        <swiper-container
            ref="containerRef" class="hero__slider" :init="false"
        >
            <swiper-slide class="hero__slide">
                <img src="/images/hero-1.webp" alt="" loading="lazy" srcset="/images/hero-1.webp 1x, /images/hero-1@2x.webp 2x">
            </swiper-slide>
            <swiper-slide class="hero__slide">
                <img src="/images/hero-2.webp" alt="" loading="lazy" srcset="/images/hero-2.webp 1x, /images/hero-2@2x.webp 2x">
            </swiper-slide>
            <swiper-slide class="hero__slide">
                <img src="/images/hero-3.webp" alt="" loading="lazy" srcset="/images/hero-3.webp 1x, /images/hero-3@2x.webp 2x">
            </swiper-slide>
        </swiper-container>

        <div class="hero__content">
            <div class="hero__container">
                <div class="hero__body">
                    <h1 class="hero__title">
                        BEZE Exclusive Studio – <br>ОДЕЖДА, СОЗДАЮЩАЯ ОСОБОЕ НАСТРОЕНИЕ
                    </h1>
                    <UiButton href="/catalog" outline white>
                        В каталог
                    </UiButton>
                </div>
            </div>
        </div>
    </section>
</template>

<style lang="scss" scoped>
.hero {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    min-height: 100svh;

    // .hero__slider
    &__slider {
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
    }

    // .hero__slide
    &__slide {
        position: relative;
        display: block;
        height: 100%;

        img {
            @include image;
        }

        &::before {
            position: absolute;
            inset: 0;
            z-index: 4;
            content: '';
            background-color: rgb(0 0 0 / 30%);
        }

        &::after {
            position: absolute;
            inset: 0;
            z-index: 5;
            height: rem(200);
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
        }
    }

    // .hero__content
    &__content {
        position: relative;
        z-index: 10;
        padding-block: rem(300);
    }

    // .hero__body
    &__body {
        display: grid;
        gap: rem(50);
        justify-items: center;
    }

    // .hero__title
    &__title {
        font-family: 'Quincy CF', sans-serif;
        font-size: 50px;
        font-weight: 400;
        line-height: 150%;
        color: $whiteColor;
        text-align: center;
        letter-spacing: 0.01em;
    }
}
</style>
