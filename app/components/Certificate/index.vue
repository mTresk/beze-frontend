<script setup lang="ts">
const ctx = ref()

onMounted(() => {
    const mm = gsap.matchMedia()

    mm.add('(min-width: 992px)', () => {
        setTimeout(() => {
            ctx.value = gsap.context(() => {
                gsap.from('.certificate__image', {
                    duration: 2,
                    y: 110,
                    ease: 'cubic-bezier(0.25, 0.45, 0.45, 0.95)',
                    stagger: 1,
                    scrollTrigger: {
                        trigger: '.certificate__image',
                        scrub: true,
                        start: '0% 100%',
                        end: 'bottom 30%',
                    },
                })
            })
        }, 100)
    })
})

onBeforeUnmount(() => {
    if (ctx.value) {
        ctx.value.revert()
    }
})
</script>

<template>
    <section class="certificate spacer">
        <div class="certificate__container">
            <div class="certificate__body">
                <div class="certificate__wrapper">
                    <div class="certificate__content">
                        <UiTitle class="certificate__title">
                            Подарочный сертификат
                        </UiTitle>
                        <ul class="certificate__list">
                            <li class="certificate__item">
                                Хотите сделать подарок любимому человеку, но боитесь ошибиться с размером? Закажите сертификат на нужную сумму.
                            </li>
                            <li class="certificate__item">
                                Порадуйте дорогого вам человека сертификатом в наш магазин. Сертификаты представлены номиналом от 1000&nbsp;₽.
                            </li>
                        </ul>
                    </div>
                    <UiButton href="/certificate" outline>
                        Заказать
                    </UiButton>
                </div>
                <div class="certificate__image">
                    <NuxtImg width="520" height="634" src="/images/cert.webp" alt="Сертификат Beze Studio" loading="lazy" />
                </div>
            </div>
        </div>
    </section>
</template>

<style lang="scss" scoped>
.certificate {
    // .certificate__body
    &__body {
        position: relative;
        display: flex;
        align-items: center;

        @include adaptive-value('gap', 120, 40);

        @media (max-width: $mobile) {
            display: block;
        }
    }

    // .certificate__wrapper
    &__wrapper {
        position: relative;
        z-index: 5;
        display: grid;
        flex: 0 1 rem(520);

        @include adaptive-value('gap', 32, 20);
    }

    // .certificate__content
    &__content {
        display: grid;
        gap: rem(20);
    }

    // .certificate__list
    &__list {
        display: grid;
        gap: rem(20);
    }

    // .certificate__item
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

    // .certificate__image
    &__image {
        position: relative;
        flex: 0 1 rem(520);
        min-width: rem(320);
        aspect-ratio: 527 / 642;

        img {
            @include image;
        }

        &::before {
            position: absolute;
            bottom: -20px;
            left: 50%;
            z-index: -1;
            width: 80%;
            height: 200px;
            content: '';
            background: rgb(0 0 0 / 40%);
            border-radius: rem(10);
            filter: blur(50px);
            transform: translateX(-50%);
        }

        @media (max-width: $mobile) {
            display: none;
        }
    }
}
</style>
