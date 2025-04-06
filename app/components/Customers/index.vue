<script setup lang="ts">
import type { IInfoPageContent } from '@/types/api'
import { useQuery } from '@tanstack/vue-query'

const fetcher = async () => await useFetcher<IInfoPageContent>(`/api/pages/sizes`)

const {
    data: sizes,
    suspense,
} = useQuery({
    queryKey: ['sizes'],
    queryFn: fetcher,
})

await suspense()
const ctx = ref()

const isCompositionModalOpen = ref(false)

const isCareModalOpen = ref(false)

const isSizesModalOpen = ref(false)

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
                        <UiLink medium @click="isCompositionModalOpen = true">
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
                        <UiLink medium @click="isCareModalOpen = true">
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
                        <UiLink medium @click="isSizesModalOpen = true">
                            Размерная сетка
                        </UiLink>
                    </article>
                </div>
            </div>
        </div>

        <!-- Модальное окно с составом -->
        <LayoutDialog v-model="isCompositionModalOpen">
            <div class="content">
                <h2>
                    Атлас «Армани»
                </h2>
                <ul>
                    <li>Тонкая гладкая ткань с гладкокрашенной отделкой;</li>
                    <li>Поверхность полотна ровная, плотная, с матовым блеском;</li>
                    <li>Материал эластичный, при драпировке образует мягкие струящиеся складки;</li>
                </ul>
                <p>Вещи из шёлковой ткани настоящий подарок для тела!</p>
                <p>
                    Состав: 97% п/э, 3% спандекс
                    <br>
                    Плотность: 144 гр/м. пог
                    <br>
                    Без узора
                </p>
            </div>
        </LayoutDialog>

        <!-- Модальное окно с уходом -->
        <LayoutDialog v-model="isCareModalOpen">
            <div class="content">
                <h2>
                    Рекомендации по уходу за шёлком
                </h2>
                <ul>
                    <li>Стирайте изделия вручную или на деликатном режиме в растворе нейтральных моющих средств (гель подойдёт идеально) и в воде не выше 30 градусов;</li>
                    <li>Пожалуйста, без резких движений! Не трите отдельные участки изделия, не выкручивайте и не оставляйте в воде слишком долго;</li>
                    <li>После стирки изделие следует прополоскать в тёплой, а затем в холодной воде. Никаких скручиваний и отчаянных выжиманий;</li>
                    <li>После нехитрых манипуляций встряхиваем изделие и оставляем сушиться на плечиках, оставив нагревательные приборы подальше;</li>
                    <li>Гладить изделие при необходимости через увлажненную хлопчатобумажную ткань на деликатном режиме.</li>
                </ul>
            </div>
        </LayoutDialog>

        <!-- Модальное окно с размерами -->
        <LayoutDialog v-model="isSizesModalOpen">
            <div class="content">
                <h2>{{ sizes?.data.name }}</h2>
                <div v-html="sizes?.data.content" />
            </div>
        </LayoutDialog>
    </section>
</template>

<style lang="scss">
.customers {
    // .customers__wrapper
    &__wrapper {
        position: relative;
        padding-block: rem(100);
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
