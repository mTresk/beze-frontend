<script setup lang="ts">
const seoTitle = 'О нас'
const seoDescription = 'Одежда, создающая особенное настроение'
const canonicalUrl = computed(() => `${useRuntimeConfig().public.appUrl}/about`)
</script>

<template>
    <div>
        <Head>
            <Title>{{ seoTitle }}</Title>
            <Meta
                name="description"
                :content="seoDescription"
            />
            <Meta
                property="og:description"
                :content="seoDescription"
            />
            <Meta
                name="twitter:description"
                :content="seoDescription"
            />
            <Link
                rel="canonical"
                :href="canonicalUrl"
            />
        </Head>
        <section class="about-page spacer">
            <div class="about-page__hero spacer">
                <video
                    class="about-page__video"
                    src="~/assets/video/video.mp4"
                    autoplay
                    muted
                    loop
                    playsinline
                />
                <img
                    class="about-page__words"
                    src="/images/words.svg"
                    alt=""
                    loading="lazy"
                >
            </div>
            <div class="about-page__container">
                <div class="about-page__body">
                    <div class="about-page__content">
                        <h1 class="about-page__title">
                            О нас
                        </h1>
                        <div class="about-page__text">
                            <p>
                                BEZE — атмосфера красоты, уюта и вдохновения для самых нежных и важных моментов.
                                Мы создаём наряды на утро невесты, утончённую домашнюю одежду и изящные аксессуары — для женщин, которые ценят детали и умеют наслаждаться собой.
                            </p>
                            <p>
                                Каждая вещь — как маленькое произведение искусства: лёгкие ткани, воздушные силуэты, деликатный блеск. Всё, чтобы подчеркнуть женственность, свободу и внутреннее сияние.
                            </p>
                            <p>Мы верим, что особенные вещи должны идеально подходить. Поэтому каждую модель можно заказать в индивидуальном исполнении — с учётом ваших пожеланий и параметров.</p>
                            <p>Это больше, чем одежда. Это история о тебе — настоящей, чувственной, красивой.</p>
                        </div>
                    </div>
                    <div class="about-page__images">
                        <div class="about-page__image">
                            <NuxtImg
                                width="560"
                                height="560"
                                src="/images/about/hero/1.webp"
                                alt=""
                            />
                        </div>
                        <div class="about-page__image">
                            <NuxtImg
                                width="560"
                                height="560"
                                src="/images/about/hero/2.webp"
                                alt=""
                            />
                        </div>
                        <div class="about-page__image">
                            <NuxtImg
                                width="560"
                                height="560"
                                src="/images/about/hero/3.webp"
                                alt=""
                            />
                        </div>
                        <div class="about-page__image">
                            <NuxtImg
                                width="560"
                                height="560"
                                src="/images/about/hero/4.webp"
                                alt=""
                            />
                        </div>
                        <div class="about-page__image">
                            <NuxtImg
                                width="560"
                                height="560"
                                src="/images/about/hero/5.webp"
                                alt=""
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <LazyGallery hydrate-on-visible />
        <LazyReviews hydrate-on-visible />
    </div>
</template>

<style lang="scss" scoped>
.about-page {
    &__hero {
        position: relative;
        min-height: 100dvh;
        background-color: $extraColor;

        &::before {
            position: absolute;
            inset: 0;
            z-index: 1;
            content: '';
            background-color: rgb(0 0 0 / 40%);
        }

        @media (max-width: $tablet) {
            min-height: calc(100dvh - rem(65));
        }
    }

    &__video {
        @include image;
    }

    &__words {
        position: absolute;
        bottom: rem(50);
        left: 50%;
        z-index: 2;
        width: 95%;
        opacity: 0.3;
        transform: translateX(-50%);

        @include adaptive-value('bottom', 50, 20);
    }

    &__body {
        display: flex;
        align-items: center;

        @include adaptive-value('gap', 30, 20);

        @media (max-width: $tablet) {
            display: grid;
        }
    }

    &__content {
        display: grid;
        flex: 0 1 rem(500);
        gap: rem(15);
    }

    &__title {
        font-family: 'Quincy CF', sans-serif;
        line-height: 120%;
        letter-spacing: 0.01em;

        @include adaptive-value('font-size', 100, 50);
    }

    &__text {
        display: grid;

        @include adaptive-value('gap', 20, 15);

        p {
            line-height: 140%;

            @include adaptive-value('font-size', 18, 14);
        }
    }

    &__images {
        display: grid;
        flex: 0 1 rem(900);
        grid-template-columns: repeat(3, 1fr);

        @include adaptive-value('gap', 20, 5);
    }

    &__image {
        position: relative;
        aspect-ratio: 285 / 285;
        overflow: hidden;
        border-radius: rem(4);

        img {
            transition: transform 0.3s ease-in-out;

            @include image;
        }

        &:nth-child(4) {
            grid-column: span 2;
            aspect-ratio: 570 / 275;

            @media (max-width: $tablet) {
                aspect-ratio: 570 / 278;
            }
        }

        @media (any-hover: hover) {
            &:hover {
                img {
                    transform: scale(1.1);
                }
            }
        }
    }
}
</style>
