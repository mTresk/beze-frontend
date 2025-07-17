<script setup lang="ts">
import type { IProduct } from '@/types/api'
import { getUniqueColors } from '@/helpers'

const props = defineProps<{
    product: IProduct
}>()

defineEmits<{
    (e: 'linkClick'): void
}>()

const { toggleWishlist, isInWishlist } = useWishlist()

const colors = computed(() => getUniqueColors(props.product.variants))

const limitedImages = computed(() => {
    return props.product.images?.slice(0, 6) || []
})

const paginationItemWidth = computed(() => {
    return `${100 / (limitedImages.value.length || 1)}%`
})

const wishlistStatus = isInWishlist(String(props.product.id))

const containerRef = ref(null)

const activeSlide = ref(0)

const imagesLoaded = ref(false)

let slideChangeTimer: NodeJS.Timeout | null = null

function handleSlideChange(index: number) {
    if (slideChangeTimer) {
        clearTimeout(slideChangeTimer)
    }

    slideChangeTimer = setTimeout(() => {
        if (!containerRef.value) {
            return
        }

        // @ts-expect-error - swiper методы доступны, но TS их не видит
        containerRef.value.swiper.slideTo(index)
    }, 200)
}

function handleSlideLeave() {
    if (slideChangeTimer) {
        clearTimeout(slideChangeTimer)
        slideChangeTimer = null
    }
}

function handleWishlistClick() {
    if (!props.product) {
        return
    }

    toggleWishlist(
        String(props.product.id),
    )
}

function handleImageLoad(event: Event) {
    if (event.target && event.target instanceof HTMLImageElement) {
        event.target.classList.add('loaded')
        imagesLoaded.value = true
    }
}

useSwiper(containerRef, {
    speed: 300,
    slidesPerView: 1,
    spaceBetween: 1,
    on: {
        slideChange: (swiper: any) => {
            activeSlide.value = swiper.activeIndex
        },
    },
})

onUnmounted(() => {
    if (slideChangeTimer) {
        clearTimeout(slideChangeTimer)
    }
})
</script>

<template>
    <article class="product-card">
        <NuxtLink
            title="Перейти на страницу товара"
            :to="`/catalog/${product.slug}`"
            class="product-card__picture"
            @click="$emit('linkClick')"
        >
            <div
                class="product-card__placeholder"
                :class="{ hidden: imagesLoaded }"
            >
                <UiIcon
                    name="image"
                    size="48"
                />
            </div>
            <ClientOnly>
                <swiper-container
                    ref="containerRef"
                    :init="false"
                    class="product-card__slider"
                    :class="{ loaded: imagesLoaded }"
                >
                    <swiper-slide
                        v-for="(image, index) in limitedImages"
                        :key="index"
                        class="product-card__slide"
                    >
                        <img
                            :src="image.normal"
                            :srcset="`${image.normal} 1x, ${image.retina} 2x`"
                            :alt="product.name"
                            width="420"
                            height="630"
                            decoding="async"
                            fetchpriority="high"
                            @load="handleImageLoad"
                        >
                    </swiper-slide>
                </swiper-container>
                <div class="product-card__pagination">
                    <div
                        v-for="(image, index) in limitedImages"
                        :key="index"
                        class="product-card__pagination-item"
                        :class="{ 'product-card__pagination-item--active': index === activeSlide }"
                        :style="{ width: paginationItemWidth }"
                        @mouseenter="handleSlideChange(index)"
                        @mouseleave="handleSlideLeave"
                    />
                </div>
            </ClientOnly>
        </NuxtLink>
        <div class="product-card__header">
            <div class="product-card__chips">
                <div
                    v-for="chip in product.chips"
                    :key="chip.slug"
                    class="chip"
                >
                    {{ chip.name }}
                </div>
            </div>
            <button
                type="button"
                class="product-card__action"
                :class="{ 'product-card__action--selected': wishlistStatus }"
                :aria-label="wishlistStatus ? 'Удалить из избранного' : 'Добавить в избранное'"
                @click="handleWishlistClick"
            >
                <UiIcon
                    name="favorite"
                    size="24"
                />
            </button>
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

    &__slider {
        height: 100%;
        opacity: 0;
        transition: opacity 0.3s ease;

        &.loaded {
            opacity: 1;
        }
    }

    &__picture {
        position: relative;
        display: block;
        aspect-ratio: 420 / 630;
        overflow: hidden;
        background-color: #f7f7f7;
        border-radius: rem(4);

        &::after {
            position: absolute;
            top: 0;
            left: 0;
            z-index: 5;
            width: 100%;
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

            @include adaptive-value('height', 100, 50);
        }

        &::before {
            position: absolute;
            bottom: 0;
            left: 0;
            z-index: 5;
            width: 100%;
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
                rgb(28 27 26 / 25.6%) 72%,
                rgb(28 27 26 / 40%)
            );
            border-radius: rem(4);
            opacity: 0.5;
            transform: rotate(180deg);

            @include adaptive-value('height', 80, 40);
        }
    }

    &__placeholder {
        position: absolute;
        z-index: 2;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
        color: #ccc;
        opacity: 1;
        transition: opacity 0.3s ease;

        &.hidden {
            pointer-events: none;
            opacity: 0;
        }
    }

    &__slide {
        position: relative;
        display: block;
        aspect-ratio: 420 / 630;

        img {
            opacity: 0;
            transition: opacity 0.3s ease;

            @include image;

            &.loaded {
                opacity: 1;
            }
        }
    }

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

    &__header {
        position: absolute;
        left: 0;
        z-index: 10;
        display: flex;
        gap: rem(40);
        align-items: center;
        justify-content: space-between;
        width: 100%;

        @include adaptive-value('top', 20, 10);
        @include adaptive-value('padding-inline', 20, 10);

        [small] & {
            top: rem(10);
            padding-inline: rem(10);
        }
    }

    &__chips {
        display: flex;
        flex-wrap: wrap;
        gap: rem(8);
        align-items: center;
    }

    &__action {
        color: $whiteColor;
        transition: color 0.3s ease-in-out;

        svg {
            height: auto;

            @include adaptive-value('max-width', 24, 18);
        }

        @media (any-hover: hover) {
            &:hover {
                color: $redColor;
            }
        }

        &--selected {
            color: $redColor;
        }

        [small] & {
            svg {
                @include adaptive-value('max-width', 20, 18);
            }
        }
    }

    &__info {
        display: grid;
        gap: rem(6);
    }

    &__title {
        overflow: hidden;
        text-overflow: ellipsis;
        line-height: 140%;
        white-space: nowrap;

        @include adaptive-value('font-size', 18, 14);

        [small] & {
            font-size: rem(16);
        }
    }

    &__line {
        display: flex;
        align-items: center;

        @include adaptive-value('gap', 16, 10);
    }

    &__price {
        font-weight: 500;
        line-height: 125%;

        @include adaptive-value('font-size', 18, 14);

        [small] & {
            @include adaptive-value('font-size', 16, 14);
        }
    }

    &__colors {
        display: flex;
        align-items: center;

        @include adaptive-value('gap', 6, 4);
    }

    &__color {
        border: rem(1) solid $lightColor;
        border-radius: 50%;

        @include adaptive-value('width', 8, 6);
        @include adaptive-value('height', 8, 6);
    }
}

.chip {
    padding: rem(4) rem(8);
    line-height: 136%;
    color: $whiteColor;
    text-transform: lowercase;
    white-space: nowrap;
    background-color: $redColor;
    border-radius: rem(20);

    @include adaptive-value('font-size', 12, 10);
}
</style>
