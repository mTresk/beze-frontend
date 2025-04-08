<script setup lang="ts">
import type { IProduct } from '@/types/api'
import { getUniqueColors } from '@/helpers'

const props = defineProps<{
    product: IProduct
}>()

const { toggleFavorite, isFavorite } = useFavorites()

const favoriteStatus = isFavorite(String(props.product.id))

const colors = computed(() => getUniqueColors(props.product.variants))

const containerRef = ref(null)
const activeSlide = ref(0)

const paginationItemWidth = computed(() => {
    return `${100 / (props.product.images?.length || 1)}%`
})

function handleSlideChange(index: number) {
    if (!containerRef.value)
        return

    // @ts-expect-error - swiper методы доступны, но TS их не видит
    containerRef.value.swiper.slideTo(index)
}

function handleFavoriteClick() {
    if (!props.product)
        return

    toggleFavorite(
        String(props.product.id),
    )
}

useSwiper(containerRef, {
    speed: 300,
    slidesPerView: 1,
    on: {
        slideChange: (swiper: any) => {
            activeSlide.value = swiper.activeIndex
        },
    },
})
</script>

<template>
    <article class="product-card">
        <NuxtLink :to="`/catalog/${product.category.slug}/products/${product.slug}`" class="product-card__picture">
            <ClientOnly>
                <swiper-container
                    ref="containerRef"
                    :init="false"
                    class="product-card__slider"
                >
                    <swiper-slide v-for="(image, index) in product.images" :key="index" class="product-card__slide">
                        <img
                            loading="lazy"
                            :src="image.normal"
                            :srcset="`${image.normal} 1x, ${image.retina} 2x`"
                            :alt="product.name"
                            width="420"
                            height="630"
                        >
                    </swiper-slide>
                </swiper-container>
                <div class="product-card__pagination">
                    <div
                        v-for="(image, index) in product.images"
                        :key="index"
                        class="product-card__pagination-item"
                        :class="{ 'product-card__pagination-item--active': index === activeSlide }"
                        :style="{ width: paginationItemWidth }"
                        @mouseenter="handleSlideChange(index)"
                    />
                </div>
            </ClientOnly>
        </NuxtLink>
        <div class="product-card__header">
            <div class="product-card__chips">
                <div v-for="chip in product.chips" :key="chip.slug" class="chip">
                    {{ chip.name }}
                </div>
            </div>
            <div class="product-card__actions">
                <button
                    type="button"
                    class="product-card__action"
                    :class="{ 'product-card__action--selected': favoriteStatus }"
                    :aria-label="favoriteStatus ? 'Удалить из избранного' : 'Добавить в избранное'"
                    @click="handleFavoriteClick"
                >
                    <UiIcon name="favorite" size="24" />
                </button>
            </div>
        </div>
        <div class="product-card__info">
            <h3 class="product-card__title">
                {{ product.name }}
            </h3>
            <div class="product-card__line">
                <div class="product-card__price">
                    {{ product.price }} ₽
                </div>
                <div class="product-card__colors">
                    <div
                        v-for="color in colors"
                        :key="color.id"
                        :style="{ backgroundColor: color.code }"
                        class="product-card__color"
                    />
                </div>
            </div>
        </div>
    </article>
</template>

<style lang="scss" scoped>
.product-card {
    position: relative;
    display: grid;
    gap: rem(10);

    &::after {
        position: absolute;
        inset: 0;
        z-index: 5;
        height: rem(100);
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
        border-radius: rem(4);
    }

    &__slider {
        height: 100%;
    }

    &__picture {
        position: relative;
        display: block;
        overflow: hidden;
        border-radius: rem(4);
    }

    &__slide {
        position: relative;
        display: block;
        aspect-ratio: 410 / 615;

        img {
            @include image;
        }
    }

    // .product-card__pagination
    &__pagination {
        position: absolute;
        inset: 0;
        z-index: 10;
        display: flex;
        gap: rem(4);
        align-items: flex-end;
        justify-content: center;
        padding: 0 rem(5) rem(5);
        pointer-events: none;

        @media (any-hover: hover) {
            pointer-events: auto;
        }

        &-item {
            position: relative;
            height: 100%;

            @media (any-hover: hover) {
                cursor: pointer;
            }

            &::before {
                position: absolute;
                bottom: 0;
                left: 0;
                width: 100%;
                height: rem(2);
                content: '';
                background-color: rgb(255 255 255 / 30%);
                border-radius: rem(2);
                transition: background-color 0.3s ease-in-out;
            }

            &--active::before {
                background-color: $whiteColor;
            }

            @media (any-hover: hover) {
                &:hover {
                    &::before {
                        background-color: $whiteColor;
                    }
                }
            }
        }
    }

    // .product-card__header
    &__header {
        position: absolute;
        top: rem(20);
        left: 0;
        z-index: 10;
        display: flex;
        gap: rem(40);
        align-items: center;
        justify-content: space-between;
        width: 100%;
        padding-inline: rem(20);

        [small] & {
            top: rem(10);
            padding-inline: rem(10);
        }
    }

    // .product-card__chips
    &__chips {
        display: flex;
        flex-wrap: wrap;
        gap: rem(8);
        align-items: center;
    }

    // .product-card__actions
    &__actions {
        display: flex;
        gap: rem(20);
        align-items: center;
    }

    // .product-card__action
    &__action {
        color: $whiteColor;
        transition: color 0.3s ease-in-out;

        @media (any-hover: hover) {
            &:hover {
                color: $redColor;
            }
        }

        // .product-card__action--selected
        &--selected {
            color: $redColor;
        }

        [small] & {
            svg {
                width: rem(20);
                height: rem(20);
            }
        }
    }

    // .product-card__info
    &__info {
        display: grid;
        gap: rem(6);
    }

    // .product-card__title
    &__title {
        overflow: hidden;
        text-overflow: ellipsis;
        font-size: 18px;
        line-height: 140%;
        white-space: nowrap;

        [small] & {
            font-size: 16px;
        }
    }

    // .product-card__line
    &__line {
        display: flex;
        gap: rem(16);
        align-items: center;
    }

    // .product-card__price
    &__price {
        font-size: 18px;
        font-weight: 500;
        line-height: 125%;

        [small] & {
            font-size: 16px;
        }
    }

    // .product-card__colors
    &__colors {
        display: flex;
        gap: rem(6);
        align-items: center;
    }

    // .product-card__color
    &__color {
        width: rem(8);
        height: rem(8);
        border-radius: 50%;
    }
}

.chip {
    padding: rem(4) rem(8);
    font-size: rem(12);
    line-height: 136%;
    color: $whiteColor;
    text-transform: lowercase;
    white-space: nowrap;
    background-color: $redColor;
    border-radius: rem(20);
}
</style>
