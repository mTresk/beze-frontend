<script setup lang="ts">
const ctx = ref()

onMounted(() => {
    setTimeout(() => {
        ctx.value = gsap.context(() => {
            gsap.from('.about__image', {
                duration: 2,
                y: 110,
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
                y: 110,
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
    ctx.value.revert()
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
                    </div>
                    <div class="about__small-image">
                        <img src="/images/about/about-sm.webp" alt="" loading="lazy" srcset="/images/about/about-sm.webp 1x, /images/about/about-sm@2x.webp 2x">
                    </div>
                </div>
                <div class="about__image">
                    <img src="/images/about/about.webp" alt="" loading="lazy" srcset="/images/about/about.webp 1x, /images/about/about@2x.webp 2x">
                </div>
            </div>
        </div>
    </section>
</template>

<style lang="scss" scoped>
.about {
    padding-bottom: rem(80);

    // .about__body
    &__body {
        display: flex;
        gap: rem(120);
        align-items: flex-end;
    }

    // .about__wrapper
    &__wrapper {
        position: relative;
        flex: 0 1 rem(520);
        padding-top: rem(64);
        padding-bottom: rem(165);

        &::before {
            position: absolute;
            top: 0;
            left: 50%;
            width: rem(100000);
            height: 100%;
            content: '';
            background-color: $extraColor;
            transform: translateX(-50%);
        }
    }

    // .about__content
    &__content {
        display: grid;
        gap: rem(20);
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
        font-size: 18px;
        line-height: 140%;

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
        bottom: -80px;
        left: 0;
        width: 200px;
        height: 200px;

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
            transform: translateX(-50%);
        }
    }

    // .about__image
    &__image {
        position: relative;
        flex: 0 1 rem(520);
        aspect-ratio: 527 / 642;
        margin-bottom: rem(-80);

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
            transform: translateX(-50%);
        }
    }
}
</style>
