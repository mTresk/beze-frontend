<template>
    <div>
        <section class="about-page spacer">
            <div class="about-page__container">
                <LayoutBreadcrumb
                    :items="[
                        { title: 'О нас' },
                    ]"
                />
                <div class="about-page__body">
                    <div class="about-page__content">
                        <h1 class="about-page__title">
                            О нас
                        </h1>
                        <div class="about-page__text">
                            <p>В BEZE мы создаём атмосферу красоты, уюта и вдохновения — для самых нежных и важных моментов. Наши коллекции — это наряды на утро невесты, утончённая домашняя одежда и изящные аксессуары, созданные для женщин, которые ценят детали и умеют наслаждаться собой.</p>
                            <p>Каждая вещь — как маленькое искусство. Лёгкие ткани, воздушные силуэты, деликатный блеск — всё, чтобы подчеркнуть женственность, свободу и внутреннее сияние. Это не просто одежда, это история о тебе — настоящей, чувственной, красивой.</p>
                        </div>
                    </div>
                    <div class="about-page__images">
                        <div class="about-page__image">
                            <NuxtImg densities="x1 x2" width="560" height="560" src="/images/about/hero/1.webp" alt="" />
                        </div>
                        <div class="about-page__image">
                            <NuxtImg densities="x1 x2" width="560" height="560" src="/images/about/hero/2.webp" alt="" />
                        </div>
                        <div class="about-page__image">
                            <NuxtImg densities="x1 x2" width="560" height="560" src="/images/about/hero/3.webp" alt="" />
                        </div>
                        <div class="about-page__image">
                            <NuxtImg densities="x1 x2" width="560" height="560" src="/images/about/hero/4.webp" alt="" />
                        </div>
                        <div class="about-page__image">
                            <NuxtImg densities="x1 x2" width="560" height="560" src="/images/about/hero/5.webp" alt="" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <Gallery />
        <Reviews />
    </div>
</template>

<style lang="scss" scoped>
.about-page {
    // .about-page__body
    &__body {
        display: flex;
        align-items: center;

        @include adaptive-value('gap', 30, 20);

        @media (max-width: $tablet) {
            display: grid;
        }
    }

    // .about-page__content
    &__content {
        display: grid;
        flex: 0 1 rem(500);
        gap: rem(15);
    }

    // .about-page__title
    &__title {
        font-family: 'Quincy CF', sans-serif;
        line-height: 120%;
        letter-spacing: 0.01em;

        @include adaptive-value('font-size', 100, 50);
    }

    // .about-page__text
    &__text {
        display: grid;

        @include adaptive-value('gap', 20, 15);

        p {
            line-height: 140%;

            @include adaptive-value('font-size', 18, 14);
        }
    }

    // .about-page__images
    &__images {
        display: grid;
        flex: 0 1 rem(900);
        grid-template-columns: repeat(3, 1fr);

        @include adaptive-value('gap', 20, 5);
    }

    // .about-page__image
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
