<script setup lang="ts">
import type { IColor, IInfoPageContent, IProduct, IProductVariant, IProductWithFeatured, ISize } from '@/types/api'
import { getUniqueColors } from '@/helpers'

const route = useRoute()

const { isInCart, toggleCartItem } = useCart()

const { isFavorite, toggleFavorite } = useFavorites()

const { addToViewed, viewedProductsIds } = useViewed()

const viewedProducts = ref<IProduct[]>([])

const isModalOpen = ref(false)

const productSlug = computed(() => route.params.id)

const categorySlug = computed(() => route.params.category)

async function fetcher() {
    const [productData, sizesData] = await Promise.all([
        useFetcher<IProductWithFeatured>(`/api/products/${categorySlug.value}/${productSlug.value}`),
        useFetcher<IInfoPageContent>(`/api/pages/sizes`),
    ])
    return { product: productData, sizes: sizesData }
}

const {
    data,
    suspense,
    isLoading,
} = useQuery({
    queryKey: ['product', categorySlug.value, productSlug.value],
    queryFn: fetcher,
})

await suspense()

const product = computed(() => data.value?.product)

const sizes = computed(() => data.value?.sizes)

async function getViewedProducts() {
    const filteredIds = viewedProductsIds.value.filter(id => id !== String(product.value?.data.id))
    if (!filteredIds.length)
        return
    viewedProducts.value = await useFetcher<IProduct[]>(`/api/products/favorites?ids=${filteredIds}`)
}

const colorId = ref()

const colorName = ref()

const size = ref()

const selectError = ref(false)

const colors = computed(() => product.value ? getUniqueColors(product.value.data.variants) : [])

const availableSizes = computed(() => {
    if (!product.value?.data.variants || !colorId.value)
        return []

    const sizesForColor = product.value.data.variants
        .filter((variant: IProductVariant) => variant.color.id === colorId.value)
        .map((variant: IProductVariant) => variant.size)

    const uniqueSizes = new Map<number, ISize>()
    sizesForColor.forEach((size: ISize) => {
        if (!uniqueSizes.has(size.id)) {
            uniqueSizes.set(size.id, size)
        }
    })

    return Array.from(uniqueSizes.values())
})

const selectedVariant = computed(() => {
    if (!product.value?.data.variants || !colorId.value || !size.value?.id)
        return null

    return product.value.data.variants.find(
        (variant: IProductVariant) => variant.color.id === colorId.value && variant.size.id === size.value.id,
    )
})

const cartStatus = computed(() => {
    const variant = selectedVariant.value
    if (!variant)
        return false
    return isInCart(String(variant.id)).value
})

const favoriteStatus = isFavorite(String(product.value?.data.id))

const currentPrice = computed(() => {
    const variant = selectedVariant.value
    return variant?.price || product.value?.data.price || ''
})

watch(cartStatus, (newStatus) => {
    if (!newStatus) {
        size.value = undefined
    }
    else {
        const variant = selectedVariant.value
        if (variant) {
            size.value = variant.size
        }
    }
})

function setColor(color: IColor) {
    colorId.value = color.id
    colorName.value = color.name
    size.value = undefined
}

function handleCartClick() {
    if (!size.value) {
        selectError.value = true
        return
    }

    const variant = selectedVariant.value
    if (!variant)
        return

    toggleCartItem(
        String(variant.id),
        1,
    )
}

function handleFavoriteClick() {
    if (!product.value)
        return

    toggleFavorite(
        String(product.value.data.id),
    )
}

function clearError() {
    selectError.value = false
}

onMounted(() => {
    if (colors.value?.length) {
        const firstColor = colors.value[0]
        if (firstColor) {
            colorId.value = firstColor.id
            colorName.value = firstColor.name
        }
    }

    if (product.value?.data.id) {
        addToViewed(String(product.value.data.id))
        getViewedProducts()
    }
})
</script>

<template>
    <div>
        <Head>
            <Title>{{ product?.data.name }}</Title>
            <Meta name="description" :content="product?.data.description" />
        </Head>
        <section class="product spacer">
            <div class="product__container">
                <LayoutBreadcrumb
                    :items="[
                        { title: 'Каталог', link: '/catalog' },
                        { title: product?.data.name || '' },
                    ]"
                />
                <UiSpinner v-if="isLoading" />
                <div v-if="!isLoading" class="product__body">
                    <div class="product__images">
                        <ClientOnly>
                            <template v-for="(image, index) in product?.data.images" :key="index">
                                <ProductImage
                                    :alt="product?.data.name || ''"
                                    :regular="image.retina"
                                    :zoom="image.original"
                                />
                            </template>
                        </ClientOnly>
                    </div>
                    <div class="product__content">
                        <div class="product__info">
                            <p class="product__sku">
                                Артикул: {{ product?.data.sku }}
                            </p>
                            <h1 class="product__title">
                                {{ product?.data.name }}
                            </h1>
                            <div class="product__price">
                                {{ currentPrice }} ₽
                            </div>
                        </div>
                        <div class="product__colors product-colors">
                            <div class="product-colors__options">
                                <label
                                    v-for="(color, index) in colors"
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
                            <VFormSelect
                                v-model="size"
                                :is-error="selectError"
                                placeholder="Выберите размер"
                                :options="availableSizes"
                                @clear-error="clearError"
                                @update:model-value="value => size = value"
                            />
                            <UiLink @click="isModalOpen = true">
                                Размерная сетка
                            </UiLink>
                        </div>
                        <div class="product__actions">
                            <UiButton
                                :title="cartStatus ? 'Убрать из корзины' : 'В корзину'"
                                :active="cartStatus"
                                wide
                                class="product__action"
                                @click="handleCartClick"
                            >
                                <span>{{ cartStatus ? 'Убрать из корзины' : 'В корзину' }}</span>
                                <UiIcon name="cart" size="16" />
                            </UiButton>
                            <UiButton
                                :title="favoriteStatus ? 'Убрать из вишлиста' : 'В вишлист'"
                                :active="favoriteStatus"
                                wide
                                square
                                aria-label="В вишлист" class="product__action"
                                @click="handleFavoriteClick"
                            >
                                <UiIcon name="favorite" size="16" />
                            </UiButton>
                        </div>
                        <div class="product__description" v-html="product?.data.description" />
                    </div>
                </div>
            </div>
        </section>
        <Featured name="featured" :products="product?.featured || []">
            <template #title>
                Возможно, вам понравится
            </template>
        </Featured>
        <Featured v-if="viewedProducts.length" name="viewed" :products="viewedProducts">
            <template #title>
                Вы недавно смотрели
            </template>
        </Featured>
        <UiCursor />
        <LayoutDialog v-model="isModalOpen">
            <div class="content">
                <h2>{{ sizes?.data.name }}</h2>
                <div v-html="sizes?.data.content" />
            </div>
        </LayoutDialog>
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
        border-bottom: 1px solid $extraColor;
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
