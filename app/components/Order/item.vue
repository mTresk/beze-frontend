<script setup lang="ts">
import type { IOrderItem } from '@/types/api'

const props = defineProps<{
    item: IOrderItem
}>()

const { isProductInCart, toggleCartItem } = useCart()

const cartStatus = computed(() => {
    if (!props.item) {
        return false
    }

    return isProductInCart(props.item.variantId).value
})
</script>

<template>
    <div class="order-item">
        <div class="order-item__info">
            <NuxtLink
                :to="`/catalog/${item.product.category?.slug}/products/${item.product.slug}`"
                class="order-item__image"
            >
                <img
                    v-if="item.product.images?.length"
                    :src="item.product.images[0]?.thumb"
                    :alt="item.product.name"
                    loading="lazy"
                >
            </NuxtLink>
            <div class="order-item__block">
                <div class="order-item__sku">
                    Артикул: {{ item.sku }}
                </div>
                <h3 class="order-item__title">
                    {{ item.product.name }}
                </h3>
            </div>
        </div>
        <div v-if="item.color" class="order-item__color">
            <span
                :style="`background-color: ${item.color.code};`"
                class="order-item__icon"
            />
            <span>{{ item.color.name }}</span>
        </div>
        <div v-if="item?.size" class="order-item__size">
            <span>размер:</span> {{ item.size.name }}
        </div>
        <div v-if="item?.quantity" class="order-item__quantity">
            <span>количество:</span> {{ item.quantity }}
        </div>
        <div v-if="item?.price" class="order-item__price">
            <span>сумма:</span> {{ Number(item.price) * Number(item.quantity) }} ₽
        </div>
        <UiButton
            :title="cartStatus ? 'Убрать из корзины' : 'В корзину'"
            :active="cartStatus"
            wide
            class="product__action"
            @click="toggleCartItem(item.variantId, 1, item.product.id!)"
        >
            <span>{{ cartStatus ? 'Убрать из корзины' : 'В корзину' }}</span>
            <UiIcon name="cart" size="16" />
        </UiButton>
    </div>
</template>

<style lang="scss" scoped>
.order-item {
    display: grid;
    grid-template-columns:
        minmax(rem(200), rem(320)) minmax(auto, rem(100)) minmax(auto, rem(100)) minmax(auto, rem(100))
        minmax(auto, rem(100)) minmax(rem(170), rem(180));
    align-items: center;
    justify-content: space-between;
    width: 100%;

    @include adaptive-value('gap', 20, 10, 0, 1920, 992);

    &__info {
        display: flex;
        gap: rem(16);
        align-items: flex-start;
    }

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

    &__block {
        display: grid;
        gap: rem(2);
        margin-top: rem(8);

        @media (max-width: $mobile) {
            margin-top: 0;
        }
    }

    &__sku {
        line-height: 140%;
        color: rgb(54 54 54 / 50%);

        @include adaptive-value('font-size', 14, 12);
    }

    &__title {
        line-height: 140%;

        @include adaptive-value('font-size', 18, 16);
    }

    &__color {
        display: flex;
        gap: rem(8);
        align-items: center;
        font-size: rem(14);
        line-height: 140%;
        color: rgb(54 54 54 / 50%);
        white-space: nowrap;
    }

    &__icon {
        flex-shrink: 0;
        border: 1px solid $lightColor;
        border-radius: 50%;

        @include adaptive-value('width', 20, 16);
        @include adaptive-value('height', 20, 16);
    }

    &__size,
    &__quantity,
    &__price {
        display: flex;
        gap: rem(5);
        align-items: center;
        font-size: rem(16);
        line-height: 125%;
        white-space: nowrap;

        span {
            font-size: rem(14);
            line-height: 140%;
            color: rgb(54 54 54 / 50%);
        }
    }
}
</style>
