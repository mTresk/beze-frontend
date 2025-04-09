<script setup lang="ts">
import type { ICartProduct } from '@/types/api'

const props = defineProps<{ product: ICartProduct }>()

const emit = defineEmits<{
    (event: 'updateQuantity'): void
}>()

const { toggleCartItem, updateCartItem } = useCart()

const quantity = ref(props.product.quantity)

const totalPrice = computed(() => {
    const price = props.product.price.replace(/\s+/g, '')
    return Number.parseFloat(price) * quantity.value
})

function handleCartClick() {
    if (!props.product)
        return

    toggleCartItem(
        String(props.product.id),
        1,
    )
}

function handleUpdateCartValues() {
    if (!props.product)
        return

    updateCartItem(
        String(props.product.id),
        quantity.value,
    )
}

watch(() => quantity.value, () => emit('updateQuantity'))
watch(() => quantity.value, () => handleUpdateCartValues())
</script>

<template>
    <div class="cart-item">
        <div class="cart-item__section">
            <div class="cart-item__info">
                <NuxtLink :to="`/catalog/${product.category.slug}/products/${product.slug}`" class="cart-item__image">
                    <img :src="product.image.thumb" :alt="product.name" loading="lazy">
                </NuxtLink>
                <div class="cart-item__block">
                    <div class="cart-item__sku">
                        Артикул: {{ product?.sku }}
                    </div>
                    <h3 class="cart-item__title">
                        {{ product?.name }}
                    </h3>
                </div>
            </div>
            <div class="cart-item__options">
                <div class="cart-item__color">
                    <span :style="`background-color: ${product.color.code};`" class="cart-item__icon" />
                    <span>{{ product.color.name }}</span>
                </div>
                <div class="cart-item__size">
                    <span>размер:</span> {{ product.size.name }}
                </div>
            </div>
        </div>
        <div class="cart-item__actions">
            <VFormQuantity v-model="quantity" :min="1" :max="10" />
            <div class="cart-item__wrapper">
                <div class="cart-item__price">
                    {{ totalPrice }} ₽
                </div>
                <button type="button" aria-label="Убрать из корзины" class="cart-item__remove" @click="handleCartClick">
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
