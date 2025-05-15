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
        <ClientOnly>
            <swiper-container
                ref="containerRef" class="hero__slider" :init="false"
            >
                <swiper-slide class="hero__slide">
                    <NuxtImg class="hero__image hero__image--pc" width="1920" height="1080" src="/images/hero/1.webp" alt="" />
                    <NuxtImg class="hero__image hero__image--mobile" width="768" height="1152" src="/images/hero/1-mob.webp" alt="" />
                </swiper-slide>
                <swiper-slide class="hero__slide">
                    <NuxtImg class="hero__image hero__image--pc" width="1920" height="1080" src="/images/hero/2.webp" alt="" />
                    <NuxtImg class="hero__image hero__image--mobile" width="768" height="1152" src="/images/hero/2-mob.webp" alt="" />
                </swiper-slide>
                <swiper-slide class="hero__slide">
                    <NuxtImg class="hero__image hero__image--pc" width="1920" height="1080" src="/images/hero/3.webp" alt="" />
                    <NuxtImg class="hero__image hero__image--mobile" width="768" height="1152" src="/images/hero/3-mob.webp" alt="" />
                </swiper-slide>
                <swiper-slide class="hero__slide">
                    <NuxtImg class="hero__image hero__image--pc" width="1920" height="1080" src="/images/hero/4.webp" alt="" />
                    <NuxtImg class="hero__image hero__image--mobile" width="768" height="1152" src="/images/hero/4-mob.webp" alt="" />
                </swiper-slide>
                <swiper-slide class="hero__slide">
                    <NuxtImg class="hero__image hero__image--pc" width="1920" height="1080" src="/images/hero/1.webp" alt="" />
                    <NuxtImg class="hero__image hero__image--mobile" width="768" height="1152" src="/images/hero/1-mob.webp" alt="" />
                </swiper-slide>
                <swiper-slide class="hero__slide">
                    <NuxtImg class="hero__image hero__image--pc" width="1920" height="1080" src="/images/hero/2.webp" alt="" />
                    <NuxtImg class="hero__image hero__image--mobile" width="768" height="1152" src="/images/hero/2-mob.webp" alt="" />
                </swiper-slide>
                <swiper-slide class="hero__slide">
                    <NuxtImg class="hero__image hero__image--pc" width="1920" height="1080" src="/images/hero/3.webp" alt="" />
                    <NuxtImg class="hero__image hero__image--mobile" width="768" height="1152" src="/images/hero/3-mob.webp" alt="" />
                </swiper-slide>
                <swiper-slide class="hero__slide">
                    <NuxtImg class="hero__image hero__image--pc" width="1920" height="1080" src="/images/hero/4.webp" alt="" />
                    <NuxtImg class="hero__image hero__image--mobile" width="768" height="1152" src="/images/hero/4-mob.webp" alt="" />
                </swiper-slide>
            </swiper-container>
        </ClientOnly>

        <div class="hero__content">
            <div class="hero__container">
                <div class="hero__body">
                    <h1 class="hero__title">
                        <span>BEZE Studio</span> – <br>ОДЕЖДА, СОЗДАЮЩАЯ <span>ОСОБОЕ</span> НАСТРОЕНИЕ
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
    background-color: $extraColor;

    @media (max-width: $tablet) {
        min-height: calc(100vh - rem(65));
        min-height: calc(100svh - rem(65));
    }

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

        &::before {
            position: absolute;
            inset: 0;
            z-index: 4;
            pointer-events: none;
            content: '';
            background-color: rgb(0 0 0 / 30%);
        }

        &::after {
            position: absolute;
            inset: 0;
            z-index: 5;
            height: rem(200);
            pointer-events: none;
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

    &__image {
        @include image;

        &--pc {
            display: block;
        }

        &--mobile {
            display: none;
        }

        @media (max-width: $mobile) {
            &--pc {
                display: none;
            }

            &--mobile {
                display: block;
            }
        }
    }

    // .hero__content
    &__content {
        position: relative;
        z-index: 10;
        padding-block: rem(300);

        @include adaptive-value('padding-block', 300, 100);
    }

    // .hero__body
    &__body {
        display: grid;
        justify-items: center;

        @include adaptive-value('gap', 50, 26);
    }

    // .hero__title
    &__title {
        font-family: 'Quincy CF', sans-serif;
        line-height: 150%;
        color: $whiteColor;
        text-align: center;
        letter-spacing: 0.01em;

        @include adaptive-value('font-size', 50, 30);

        span {
            color: $extraColor;
        }
    }
}
</style>
