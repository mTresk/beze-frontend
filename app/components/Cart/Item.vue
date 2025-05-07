<script setup lang="ts">
import type { ICartItem } from '@/types/api'

const props = defineProps<{
    cartItem: ICartItem
}>()

const { removeFromCart, updateCartItem } = useCart()

const quantity = ref(props.cartItem.quantity)

const updateTimeout = ref<NodeJS.Timeout | null>(null)

const selectedVariant = computed(() => {
    if (!props.cartItem.product?.variants)
        return null

    return props.cartItem.product.variants.find(
        variant => variant.id === props.cartItem.productVariant.id,
    )
})

const totalPrice = computed(() => {
    return props.cartItem.price * quantity.value
})

function handleCartRemove() {
    removeFromCart(props.cartItem.id)
}

function handleUpdateCartValues() {
    if (updateTimeout.value) {
        clearTimeout(updateTimeout.value)
    }

    updateTimeout.value = setTimeout(async () => {
        await updateCartItem(props.cartItem.id, quantity.value)
    }, 300)
}

watch(() => quantity.value, handleUpdateCartValues)
</script>

<template>
    <div class="cart-item">
        <div class="cart-item__section">
            <div class="cart-item__info">
                <NuxtLink
                    :to="`/catalog/${props.cartItem.product.slug}`"
                    class="cart-item__image"
                >
                    <img
                        v-if="props.cartItem.product.images?.length"
                        :src="props.cartItem.product.images[0]?.thumb"
                        :alt="props.cartItem.product.name"
                        loading="lazy"
                    >
                </NuxtLink>
                <div class="cart-item__block">
                    <div class="cart-item__sku">
                        Артикул: {{ selectedVariant?.sku }}
                    </div>
                    <h3 class="cart-item__title">
                        {{ props.cartItem.product.name }}
                    </h3>
                </div>
            </div>
            <div class="cart-item__options">
                <div v-if="selectedVariant?.color" class="cart-item__color">
                    <span
                        :style="`background-color: ${selectedVariant.color.code};`"
                        class="cart-item__icon"
                    />
                    <span>{{ selectedVariant.color.name }}</span>
                </div>
                <div v-if="selectedVariant?.size" class="cart-item__size">
                    <span>размер:</span> {{ selectedVariant.size.name }}
                </div>
            </div>
        </div>
        <div class="cart-item__actions">
            <VFormQuantity v-model="quantity" :min="1" :max="selectedVariant?.stock" />
            <div class="cart-item__wrapper">
                <div class="cart-item__price">
                    {{ totalPrice }} ₽
                </div>
                <button
                    type="button"
                    aria-label="Убрать из корзины"
                    class="cart-item__remove"
                    @click="handleCartRemove"
                >
                    <UiIcon name="can" size="20" />
                </button>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.cart-item {
    display: grid;
    grid-template-columns:
        minmax(rem(200), rem(320)) minmax(auto, rem(100)) minmax(auto, rem(100)) minmax(auto, rem(100))
        minmax(auto, rem(120));
    align-items: center;
    justify-content: space-between;
    width: 100%;

    @include adaptive-value('gap', 20, 10, 0, 1920, 992);

    @media (max-width: $mobile) {
        display: flex;
        gap: rem(20);
        align-items: start;
    }

    &__section {
        display: contents;

        @media (max-width: $mobile) {
            display: grid;
            gap: rem(10);
        }
    }

    &__options {
        display: contents;

        @media (max-width: $mobile) {
            display: flex;
            gap: rem(10);
            align-items: center;
        }
    }

    &__actions {
        display: contents;

        @media (max-width: $mobile) {
            display: flex;
            gap: rem(10);
            align-items: center;
        }

        @media (max-width: $mobileSmall) {
            display: grid;
            justify-items: end;
        }
    }

    // .cart-item__info
    &__info {
        display: flex;
        gap: rem(16);
        align-items: flex-start;
    }

    // .cart-item__image
    &__image {
        position: relative;
        display: block;
        flex-shrink: 0;
        aspect-ratio: 60 / 90;

        @include adaptive-value('width', 60, 50);

        img {
            @include image;
        }
    }

    // .cart-item__block
    &__block {
        display: grid;
        gap: rem(2);
        margin-top: rem(8);

        @media (max-width: $mobile) {
            margin-top: 0;
        }
    }

    // .cart-item__sku
    &__sku {
        line-height: 140%;
        color: rgb(54 54 54 / 50%);

        @include adaptive-value('font-size', 14, 12);
    }

    // .cart-item__title
    &__title {
        line-height: 140%;

        @include adaptive-value('font-size', 18, 16);
    }

    // .cart-item__color
    &__color {
        display: flex;
        gap: rem(8);
        align-items: center;
        font-size: rem(14);
        line-height: 140%;
        color: rgb(54 54 54 / 50%);
        white-space: nowrap;
    }

    // .cart-item__icon
    &__icon {
        flex-shrink: 0;
        border: 1px solid $lightColor;
        border-radius: 50%;

        @include adaptive-value('width', 20, 16);
        @include adaptive-value('height', 20, 16);
    }

    // .cart-item__size
    &__size {
        display: flex;
        gap: rem(5);
        align-items: center;
        font-size: rem(16);
        line-height: 125%;

        span {
            font-size: rem(14);
            line-height: 140%;
            color: rgb(54 54 54 / 50%);
        }
    }

    // .cart-item__wrapper
    &__wrapper {
        display: flex;
        align-items: center;
        justify-content: space-between;

        @include adaptive-value('gap', 20, 10);
    }

    // .cart-item__price
    &__price {
        line-height: 140%;
        white-space: nowrap;

        @include adaptive-value('font-size', 18, 16);
    }

    // .cart-item__remove
    &__remove {
        display: flex;
        align-items: center;
        justify-content: center;
        transition: color 0.3s ease-in-out;

        @media (any-hover: hover) {
            &:hover {
                color: $accentColor;
            }
        }
    }
}
</style>
