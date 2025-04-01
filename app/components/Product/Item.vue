<script setup lang="ts">
import type { IProduct } from '@/types/api'
import { computed, onMounted } from 'vue'

const props = defineProps<{
    product: IProduct
}>()

const favorites = useState<string[]>('favorites', () => {
    const stored = localStorage.getItem('favorites')
    return stored ? JSON.parse(stored) : []
})

const cart = useState<string[]>('cart', () => {
    const stored = localStorage.getItem('cart')
    return stored ? JSON.parse(stored) : []
})

const isFavorite = computed(() => favorites.value.includes(String(props.product.id)))

const cartItem = computed(() => cart.value.includes(String(props.product.id)))

function handleFavoriteClick(): void {
    if (isFavorite.value) {
        favorites.value = favorites.value.filter(id => id !== String(props.product.id))

        useToastify(`${props.product.name} удален из избранного`, {
            type: 'success',
        })
    }
    else {
        favorites.value = [...favorites.value, String(props.product.id)]

        useToastify(`${props.product.name} добавлен в избранное`, {
            type: 'success',
        })
    }

    localStorage.setItem('favorites', JSON.stringify(favorites.value))
}

function handleCartClick(): void {
    if (cartItem.value) {
        cart.value = cart.value.filter(id => id !== String(props.product.id))

        useToastify(`${props.product.name} удален из корзины`, {
            type: 'success',
        })
    }
    else {
        cart.value = [...cart.value, String(props.product.id)]

        useToastify(`${props.product.name} добавлен в корзину`, {
            type: 'success',
        })
    }

    localStorage.setItem('cart', JSON.stringify(cart.value))
}

onMounted(() => {
    const storedFavorites = localStorage.getItem('favorites')
    const storedCart = localStorage.getItem('cart')

    if (storedFavorites) {
        favorites.value = JSON.parse(storedFavorites)
    }

    if (storedCart) {
        cart.value = JSON.parse(storedCart)
    }
})
</script>

<template>
    <article class="product-card">
        <a href="#" class="product-card__image">
            <img
                loading="lazy"
                :src="product.images[0]?.normal"
                :srcset="`${product.images[0]?.normal} 1x, ${product.images[0]?.retina} 2x`"
                :alt="product.name"
                width="420"
                height="630"
            >
            <img
                loading="lazy"
                :src="product.images[1]?.normal"
                :srcset="`${product.images[1]?.normal} 1x, ${product.images[1]?.retina} 2x`"
                :alt="product.name"
                width="420"
                height="630"
            >
        </a>
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
                    :class="{ 'product-card__action--selected': isFavorite }"
                    :aria-label="isFavorite ? 'Удалить из избранного' : 'Добавить в избранное'"
                    @click="handleFavoriteClick"
                >
                    <svg width="24" height="24">
                        <use href="/images/icons.svg#favorite" />
                    </svg>
                </button>
                <button
                    type="button"
                    class="product-card__action"
                    :class="{ 'product-card__action--selected': cartItem }"
                    :aria-label="cartItem ? 'Удалить из корзины' : 'Добавить в корзину'"
                    @click="handleCartClick"
                >
                    <svg width="24" height="24">
                        <use href="/images/icons.svg#cart" />
                    </svg>
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
                    <div v-for="color in product.colors" :key="color.id" :style="{ backgroundColor: color.code }" class="product-card__color" />
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

    // .product-card__image
    &__image {
        position: relative;
        display: block;
        aspect-ratio: 410 / 615;
        overflow: hidden;
        border-radius: rem(4);

        img {
            transition: opacity 0.3s ease-in-out;

            @include image;

            &:last-child {
                opacity: 0;
            }
        }

        @media (any-hover: hover) {
            &:hover {
                img {
                    &:first-child {
                        opacity: 0;
                    }

                    &:last-child {
                        opacity: 1;
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
    }

    // .product-card__info
    &__info {
        display: grid;
        gap: rem(6);
        padding-bottom: rem(20);
    }

    // .product-card__title
    &__title {
        font-size: 18px;
        line-height: 140%;
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
