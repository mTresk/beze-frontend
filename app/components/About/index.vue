<script setup lang="ts">
const ctx = ref()

onMounted(() => {
    let y = 110

    if (window.innerWidth < 768) {
        y = 40
    }

    setTimeout(() => {
        ctx.value = gsap.context(() => {
            gsap.from('.about__image', {
                duration: 2,
                y,
                ease: 'cubic-bezier(0.25, 0.45, 0.45, 0.95)',
                stagger: 1,
                scrollTrigger: {
                    trigger: '.about__image',
                    scrub: true,
                    start: '0% 100%',
                    end: 'bottom 30%',
                },
            })
            gsap.from('.about__small-image', {
                duration: 2,
                y,
                ease: 'cubic-bezier(0.25, 0.45, 0.45, 0.95)',
                stagger: 1,
                scrollTrigger: {
                    trigger: '.about__image',
                    scrub: true,
                    start: '0% 100%',
                    end: 'bottom 30%',
                },
            })
        })
    }, 100)
})

onBeforeUnmount(() => {
    if (ctx.value) {
        ctx.value.revert()
    }
})
</script>

<template>
    <section class="about spacer">
        <div class="about__container">
            <div class="about__body">
                <div class="about__wrapper">
                    <div class="about__content">
                        <UiTitle class="about__title">
                            О нас
                        </UiTitle>
                        <ul class="about__list">
                            <li class="about__item">
                                Бренд BEZE exclusive studio создан <strong>вдохновлять девушек</strong>
                                и&nbsp;женщин на заботу о себе.
                            </li>
                            <li class="about__item">
                                Наша одежда для <strong>роскошных, элегантных и женственных</strong> особ. Поэтому для производства изделий мы выбрали самую нежную ткань — шёлк Армани.
                            </li>
                        </ul>
                        <UiButton href="/about">
                            Подробнее
                        </UiButton>
                    </div>
                    <div class="about__small-image">
                        <NuxtImg width="400" height="400" src="/images/about/about-sm.webp" alt="" />
                    </div>
                </div>
                <div class="about__image">
                    <NuxtImg width="520" height="634" src="/images/about/about.webp" alt="" />
                </div>
            </div>
        </div>
    </section>
</template>

<style lang="scss" scoped>
.about {
    padding-bottom: rem(80);

    @include adaptive-value('padding-bottom', 80, 0);

    // .about__body
    &__body {
        display: flex;
        align-items: flex-end;

        @include adaptive-value('gap', 120, 40);

        @media (max-width: $tablet) {
            align-items: center;
        }

        @media (max-width: $mobile) {
            display: block;
        }
    }

    // .about__wrapper
    &__wrapper {
        position: relative;
        flex: 0 1 rem(520);

        @include adaptive-value('padding-top', 64, 30);
        @include adaptive-value('padding-bottom', 165, 70);

        &::before {
            position: absolute;
            top: 0;
            left: 50%;
            width: rem(100000);
            height: 100%;
            content: '';
            background: linear-gradient(90deg, #decebe 0%, #b79d83 100%);
            transform: translateX(-50%);
        }

        @media (max-width: $mobile) {
            padding-bottom: rem(100);
        }
    }

    // .about__content
    &__content {
        display: grid;

        @include adaptive-value('gap', 20, 10);
    }

    // .about__title
    &__title {
        position: relative;
    }

    // .about__list
    &__list {
        display: grid;
        gap: rem(20);
    }

    // .about__item
    &__item {
        position: relative;
        padding-left: rem(18);
        line-height: 140%;

        @include adaptive-value('font-size', 18, 14);

        &::before {
            position: absolute;
            top: 8px;
            left: 0;
            width: rem(8);
            height: rem(8);
            content: '';
            background-color: $accentColor;
            transform: rotate(45deg);
        }

        strong {
            font-weight: 500;
        }
    }

    // .about__small-image
    &__small-image {
        position: absolute;
        left: 0;
        z-index: 10;

        @include adaptive-value('width', 200, 120);
        @include adaptive-value('height', 200, 120);
        @include adaptive-value('bottom', -80, -40);

        img {
            @include image;
        }

        &::before {
            position: absolute;
            bottom: -30px;
            left: 50%;
            z-index: -1;
            width: 80%;
            height: 50%;
            content: '';
            background: rgb(46 46 46 / 16%);
            border-radius: rem(10);
            filter: blur(50px);
            transform: translateX(-50%) translateZ(0);
        }

        @media (max-width: $mobile) {
            right: 0;
            left: auto;
        }
    }

    // .about__image
    &__image {
        position: relative;
        z-index: 10;
        flex: 0 1 rem(520);
        aspect-ratio: 527 / 642;

        @include adaptive-value('margin-bottom', -80, -40);

        img {
            @include image;
        }

        &::before {
            position: absolute;
            bottom: -50px;
            left: 50%;
            z-index: -1;
            width: 80%;
            height: 50%;
            content: '';
            background: rgb(46 46 46 / 16%);
            border-radius: rem(10);
            filter: blur(50px);
            transform: translateX(-50%) translateZ(0);
        }

        @media (max-width: $mobile) {
            display: none;
        }
    }
}
</style>
