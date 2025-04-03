<script setup>
const ctx = ref()

onMounted(() => {
    setTimeout(() => {
        ctx.value = gsap.context(() => {
            gsap.from('.customers-card', {
                duration: 2,
                y: 300,
                ease: 'cubic-bezier(0.25, 0.45, 0.45, 0.95)',
                stagger: 0.5,
                scrollTrigger: {
                    trigger: '.customers__body',
                    scrub: true,
                    start: '0% 100%',
                    end: 'bottom 50%',
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
    <section class="customers spacer">
        <div class="customers__container">
            <UiTitle class="customers__title">
                Покупателям
            </UiTitle>
        </div>
        <div class="customers__wrapper">
            <div class="customers__background">
                <video class="customers__video" autoplay muted loop playsinline src="/images/textile.mp4" />
            </div>
            <div class="customers__container">
                <div class="customers__body">
                    <article class="customers-card">
                        <div class="customers-card__content">
                            <h3 class="customers-card__title">
                                Состав наших изделий
                            </h3>
                            <p class="customers-card__text">
                                Для производства изделий мы используем шёлк Армани – он состоит из 97% полиэстера и 3% эластана, но это не мешает ткани быть легкой, нежной и приятной на ощупь.
                            </p>
                        </div>
                        <UiLink medium>
                            Подробнее о составе
                        </UiLink>
                    </article>
                    <article class="customers-card">
                        <div class="customers-card__content">
                            <h3 class="customers-card__title">
                                Уход за шёлком
                            </h3>
                            <p class="customers-card__text">
                                Наши изделия требуют не слишком сложного, но тем не менее бережного ухода.
                            </p>
                        </div>
                        <UiLink medium>
                            Рекомендации по уходу
                        </UiLink>
                    </article>
                    <article class="customers-card">
                        <div class="customers-card__content">
                            <h3 class="customers-card__title">
                                Размерный ряд
                            </h3>
                            <p class="customers-card__text">
                                Мы отшиваем изделия от 40 до 60 размера. Вы можете ознакомиться с размерной сеткой ниже.
                            </p>
                        </div>
                        <UiLink medium>
                            Размерная сетка
                        </UiLink>
                    </article>
                </div>
            </div>
        </div>
    </section>
</template>

<style lang="scss">
.customers {
    // .customers__wrapper
    &__wrapper {
        position: relative;
        padding-block: rem(100);

        // background-color: $extraColor;
    }

    // .customers__background
    &__background {
        position: absolute;
        inset: 0;

        &::before {
            position: absolute;
            inset: 0;
            z-index: 1;
            content: '';
            background-color: $accentColor;
            opacity: 0.7;
        }
    }

    // .customers__video
    &__video {
        filter: grayscale(1);

        @include image;
    }

    // .customers__title
    &__title {
        position: relative;
        z-index: 5;
        margin-bottom: rem(40);
    }

    // .customers__body
    &__body {
        position: relative;
        z-index: 5;
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: rem(120);
    }
}

.customers-card {
    display: flex;
    flex-direction: column;
    align-items: start;
    justify-content: space-between;
    aspect-ratio: 1;
    padding: rem(50) rem(30) rem(40);
    background: rgb(255 255 255 / 35%);
    border: 1px solid rgb(255 255 255 / 50%);
    backdrop-filter: blur(9px);

    // .customers-card__content
    &__content {
        display: grid;
        gap: rem(16);
    }

    // .customers-card__title
    &__title {
        font-family: 'Quincy CF', sans-serif;
        font-size: 24px;
        font-weight: 400;
        line-height: 120%;
        letter-spacing: 0.01em;
    }

    // .customers-card__text
    &__text {
        font-size: 18px;
        line-height: 140%;
    }
}
</style>
