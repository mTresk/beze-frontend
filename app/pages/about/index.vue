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
                            <img src="/images/about/hero/1.webp" srcset="/images/about/hero/1.webp 1x, /images/about/hero/1@2x.webp 2x" alt="" loading="lazy">
                        </div>
                        <div class="about-page__image">
                            <img src="/images/about/hero/2.webp" srcset="/images/about/hero/2.webp 1x, /images/about/hero/2@2x.webp 2x" alt="" loading="lazy">
                        </div>
                        <div class="about-page__image">
                            <img src="/images/about/hero/3.webp" srcset="/images/about/hero/3.webp 1x, /images/about/hero/3@2x.webp 2x" alt="" loading="lazy">
                        </div>
                        <div class="about-page__image">
                            <img src="/images/about/hero/4.webp" srcset="/images/about/hero/4.webp 1x, /images/about/hero/4@2x.webp 2x" alt="" loading="lazy">
                        </div>
                        <div class="about-page__image">
                            <img src="/images/about/hero/5.webp" srcset="/images/about/hero/5.webp 1x, /images/about/hero/5@2x.webp 2x" alt="" loading="lazy">
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
    padding-top: rem(130);

    // .about-page__body
    &__body {
        display: flex;
        gap: rem(30);
        align-items: center;
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
        font-size: 100px;
        line-height: 120%;
        letter-spacing: 0.01em;
    }

    // .about-page__text
    &__text {
        display: grid;
        gap: rem(20);

        p {
            font-size: 18px;
            line-height: 140%;
        }
    }

    // .about-page__images
    &__images {
        display: grid;
        flex: 0 1 rem(900);
        grid-template-columns: repeat(3, 1fr);
        gap: rem(20);
    }

    // .about-page__image
    &__image {
        position: relative;
        height: rem(285);
        overflow: hidden;
        border-radius: rem(4);

        img {
            transition: transform 0.3s ease-in-out;

            @include image;
        }

        &:nth-child(4) {
            grid-column: span 2;
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
