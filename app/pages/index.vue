<template>
    <Hero />
    <Advantages />
    <Directions />
    <section class="bestsellers">
        <div class="bestsellers__container">
            <UiTitle tag="h2" class="bestsellers__title">
                Хиты продаж
            </UiTitle>
        </div>
        <div class="bestsellers__inner">
            <div class="bestsellers__body">
                <ProductItem />
            </div>
            <div class="bestsellers__footer">
                <button type="button" class="bestsellers__more button">
                    Показать еще
                </button>
            </div>
        </div>
    </section>
    <Collections />
</template>

<style lang="scss">
.bestsellers {
    margin-bottom: rem(160);

    // .bestsellers__title
    &__title {
        margin-bottom: rem(40);
    }

    // .bestsellers__body
    &__body {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: rem(45) rem(25);
    }

    // .bestsellers__footer
    &__footer {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: rem(30);
    }

    // .bestsellers__more
    &__more {
    }
}
</style>
