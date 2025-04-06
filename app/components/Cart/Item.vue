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
        <div class="cart-item__color">
            <span :style="`background-color: ${product.color.code};`" class="cart-item__icon" />
            <span>{{ product.color.name }}</span>
        </div>
        <div class="cart-item__size">
            <span>размер:</span> {{ product.size.name }}
        </div>
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
</template>

<style lang="scss" scoped>
.cart-item {
    display: grid;
    grid-template-columns:
        minmax(auto, rem(320)) minmax(auto, rem(110)) minmax(auto, rem(100)) minmax(auto, rem(100))
        minmax(auto, rem(120));
    align-items: center;
    justify-content: space-between;
    width: 100%;

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
        width: rem(60);
        aspect-ratio: 60 / 90;

        img {
            @include image;
        }
    }

    // .cart-item__block
    &__block {
        display: grid;
        gap: rem(2);
        margin-top: rem(8);
    }

    // .cart-item__sku
    &__sku {
        font-size: 14px;
        line-height: 140%;
        color: rgb(54 54 54 / 50%);
    }

    // .cart-item__title
    &__title {
        font-size: 18px;
        line-height: 140%;
    }

    // .cart-item__color
    &__color {
        display: flex;
        gap: rem(8);
        align-items: center;
        font-size: 14px;
        line-height: 140%;
        color: rgb(54 54 54 / 50%);
        white-space: nowrap;
    }

    // .cart-item__icon
    &__icon {
        flex-shrink: 0;
        width: rem(20);
        height: rem(20);
        border: 1px solid $lightColor;
        border-radius: 50%;
    }

    // .cart-item__size
    &__size {
        display: flex;
        gap: rem(5);
        align-items: center;
        font-size: rem(16);
        line-height: 125%;

        span {
            font-size: 14px;
            line-height: 140%;
            color: rgb(54 54 54 / 50%);
        }
    }

    // .cart-item__wrapper
    &__wrapper {
        display: flex;
        gap: rem(20);
        align-items: center;
        justify-content: space-between;
    }

    // .cart-item__price
    &__price {
        font-size: 18px;
        line-height: 140%;
        white-space: nowrap;
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
