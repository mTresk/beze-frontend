<script setup lang="ts">
import type { IColor, IProduct } from '@/types/api'
import { useQuery } from '@tanstack/vue-query'
import { VueImageZoomer } from 'vue-image-zoomer'
import 'vue-image-zoomer/dist/style.css'

definePageMeta({
    pageTransition: {
        name: 'layout',
        mode: 'out-in',
    },
})

const route = useRoute()

const { isInCart, toggleCartItem } = useCart()

const { isFavorite, toggleFavorite } = useFavorites()

async function fetcher() {
    return await useFetcher<IProduct>(`/api/products/${route.params.slug}`)
}

const {
    data: product,
    suspense,
    isLoading,
} = useQuery({
    queryKey: [route.params.slug],
    queryFn: fetcher,
})

await suspense()

const colorId = ref()

const colorName = ref()

const size = ref()

const selectError = ref(false)

const cartStatus = computed(() => isInCart(String(product.value?.id), String(colorId.value), String(size.value?.id)).value)

const favoriteStatus = isFavorite(String(product.value?.id))

function setColor(color: IColor) {
    colorId.value = color.id
    colorName.value = color.name
}

function handleCartClick() {
    if (!size.value) {
        selectError.value = true
    }

    if (!product.value || !colorId.value || !size.value)
        return

    toggleCartItem(
        String(product.value.id),
        product.value.name,
        String(colorId.value),
        colorName.value,
        String(size.value.id),
        size.value.name,
        1,
    )
}

function handleFavoriteClick() {
    if (!product.value)
        return

    toggleFavorite(
        String(product.value.id),
        product.value.name,
    )
}

function clearError() {
    selectError.value = false
}

onMounted(() => {
    if (product.value?.colors.length) {
        colorId.value = product.value.colors[0]!.id
        colorName.value = product.value.colors[0]!.name
    }
})
</script>

<template>
    <div>
        <Head>
            <Title>{{ product?.name }}</Title>
            <Meta name="description" :content="product?.description" />
        </Head>
        <section class="product spacer">
            <div class="product__container">
                <ul class="breadcrumb">
                    <li>
                        <NuxtLink to="/">
                            Главная
                        </NuxtLink>
                    </li>
                    <li>
                        <NuxtLink to="/catalog">
                            Каталог
                        </NuxtLink>
                    </li>
                    <li><span>Костюм пижамный с перьями</span></li>
                </ul>
                <UiSpinner v-if="isLoading" />
                <div v-if="!isLoading" class="product__body">
                    <div class="product__images">
                        <ClientOnly>
                            <template v-for="(image, index) in product?.images" :key="index">
                                <VueImageZoomer
                                    :zoom-amount="3"
                                    :show-message="false"
                                    :show-message-touch="false"
                                    :alt="product?.name"
                                    :lazyload="true"
                                    img-class="product__zoom"
                                    :regular="image.retina"
                                    :zoom="image.original"
                                />
                            </template>
                        </ClientOnly>
                    </div>
                    <div class="product__content">
                        <div class="product__info">
                            <p class="product__sku">
                                Артикул: {{ product?.sku }}
                            </p>
                            <h1 class="product__title">
                                {{ product?.name }}
                            </h1>
                            <div class="product__price">
                                {{ product?.price }} ₽
                            </div>
                        </div>
                        <div class="product__colors product-colors">
                            <div class="product-colors__options">
                                <label
                                    v-for="(color, index) in product?.colors"
                                    :key="color.id"
                                    :style="`background-color: ${color.code};`"
                                    class="product-colors__item"
                                    @click="setColor(color)"
                                >
                                    <input :checked="index === 0 ? true : false" class="product-colors__input" type="radio" :value="color.id" name="color">
                                </label>
                            </div>
                            <p class="product-colors__label">
                                {{ colorName }}
                            </p>
                        </div>
                        <div class="product__size">
                            <VFormSelect v-model="size" :is-error="selectError" placeholder="Выберите размер" :options="product?.sizes" @clear-error="clearError" />
                            <UiLink>Размерная сетка</UiLink>
                        </div>
                        <div class="product__actions">
                            <UiButton :active="cartStatus" wide class="product__action" @click="handleCartClick">
                                <span>{{ cartStatus ? 'Убрать из корзины' : 'В корзину' }}</span>
                                <svg width="16" height="16">
                                    <use href="/images/icons.svg#cart" />
                                </svg>
                            </UiButton>
                            <UiButton :active="favoriteStatus" wide lite square aria-label="В избранное" class="product__action" @click="handleFavoriteClick">
                                <svg width="16" height="16">
                                    <use href="/images/icons.svg#favorite" />
                                </svg>
                            </UiButton>
                        </div>
                        <p class="product__description">
                            Комплект пижамный из шелка Армани. <br>
                            Рубашка с английским воротником. Длинный рукав с перьями в два слоя и боа на кнопках. <br>
                            Брюки на завязках с перьями в два слоя и боа на кнопках. <br>
                            Состав: 97% полиэстер 3% спандекс
                        </p>
                    </div>
                </div>
            </div>
        </section>
        <UiCursor />
    </div>
</template>

<style lang="scss">
.product {
    padding-top: rem(130);

    // .product__body
    &__body {
        display: flex;
        gap: rem(40);
        align-items: flex-start;
        justify-content: space-between;
    }

    // .product__images
    &__images {
        display: grid;
        flex: 0 1 rem(920);
        grid-template-columns: 1fr 1fr;
        gap: rem(20);
    }

    // .product__image
    &__image,
    .vh--outer {
        position: relative;
        aspect-ratio: 450 / 675;
        overflow: hidden;
        border-radius: rem(4);
    }

    &__zoom {
        @include image;
    }

    // .product__content
    &__content {
        position: sticky;
        top: rem(100);
        flex: 0 1 rem(460);
    }

    // .product__info
    &__info {
        display: grid;
        gap: rem(7);
        margin-bottom: rem(20);
    }

    // .product__sku
    &__sku {
        font-size: 16px;
        line-height: 140%;
        color: rgb(54 54 54 / 50%);
    }

    // .product__title
    &__title {
        font-size: 28px;
        line-height: 140%;
    }

    // .product__price
    &__price {
        font-size: 28px;
        font-weight: 500;
        line-height: 125%;
    }

    // .product__colors
    &__colors {
        margin-bottom: rem(20);
    }

    // .product__size
    &__size {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: rem(20);
        padding-bottom: rem(35);
        margin-bottom: rem(35);
        border-bottom: 1px solid rgb(54 54 54 / 10%);
    }

    // .product__actions
    &__actions {
        display: flex;
        gap: rem(20);
    }

    // .product__description
    &__description {
        margin-top: rem(25);
        font-size: 16px;
        line-height: 140%;
    }
}

.product-colors {
    display: grid;
    gap: rem(7);

    // .product-colors__options
    &__options {
        display: flex;
        gap: rem(8);
        align-items: center;
    }

    // .product-colors__item
    &__item {
        position: relative;
        width: 36px;
        height: 36px;
        cursor: pointer;
        border-radius: 50%;

        &:has(input:checked) {
            border: 3px solid $whiteColor;

            &::before {
                position: absolute;
                top: 50%;
                left: 50%;
                z-index: -1;
                width: calc(100% + 8px);
                height: calc(100% + 8px);
                content: '';
                background-color: $accentColor;
                border-radius: inherit;
                transform: translate(-50%, -50%);
            }
        }
    }

    // .product-colors__input
    &__input {
        appearance: none;
    }

    // .product-colors__label
    &__label {
        font-size: 14px;
        line-height: 140%;
        color: rgb(54 54 54 / 50%);
    }
}

.vh--holder {
    width: 100%;
    height: 100%;
}
</style>
