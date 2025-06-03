<script setup lang="ts">
import type { IColor, IFeedback, IInfoPageContent, IProduct, IProductVariant, IProductWithFeatured, ISize, ValidationErrors } from '@/types/api'
import { getUniqueColors, sortSizes } from '@/helpers'

const client = useSanctumClient()

const route = useRoute()

const { isProductInCart, toggleCartItem } = useCart()

const { isInWishlist, toggleWishlist } = useWishlist()

const { addToViewed, viewedProductsIds } = useViewed()

const viewedProducts = ref<IProduct[]>([])

const isModalOpen = ref(false)

const isCustomOrderModalOpen = ref(false)

const containerRef = ref(null)

const colorId = ref()

const colorName = ref()

const size = ref()

const selectError = ref(false)

const isAgreementAccepted = ref(false)

const productSlug = computed(() => route.params.product)

async function fetchProduct() {
    return await client<IProductWithFeatured>(`/api/products/${productSlug.value}`, {
        async onResponseError({ response }) {
            if (response.status !== 422) {
                throw showError({
                    statusCode: response.status,
                    statusMessage: response.statusText,
                })
            }
        },
    })
}

async function fetchSizesTable() {
    return await client<IInfoPageContent>(`/api/pages/sizes`)
}

const {
    data: productData,
    suspense: productSuspense,
    isLoading: isProductLoading,
} = useQuery({
    queryKey: ['product', productSlug.value],
    queryFn: fetchProduct,
})

const {
    data: sizesTableData,
    suspense: sizesTableSuspense,
    isLoading: isSizesTableLoading,
} = useQuery({
    queryKey: ['sizes-table'],
    queryFn: fetchSizesTable,
})

await Promise.all([productSuspense(), sizesTableSuspense()])

const product = computed(() => productData.value)

const sizesTable = computed(() => sizesTableData.value)

const isLoading = computed(() => isProductLoading.value || isSizesTableLoading.value)

async function getViewedProducts() {
    const filteredIds = viewedProductsIds.value.filter(id => id !== String(product.value?.data.id))
    if (!filteredIds.length)
        return
    viewedProducts.value = await client<IProduct[]>(`/api/products/favorites?ids=${filteredIds}`)
}

const colors = computed(() => product.value ? getUniqueColors(product.value.data.variants) : [])

const availableSizes = computed(() => {
    if (!product.value?.data.variants || !colorId.value)
        return []

    const sizesForColor = product.value.data.variants
        .filter((variant: IProductVariant) => variant.color.id === colorId.value)
        .map((variant: IProductVariant) => ({
            ...variant.size,
            name: variant.size.name,
            disabled: variant.stock === 0,
        }))

    const uniqueSizes = new Map<number, ISize>()

    sizesForColor.forEach((size: ISize) => {
        if (!uniqueSizes.has(size.id)) {
            uniqueSizes.set(size.id, size)
        }
    })

    return sortSizes(Array.from(uniqueSizes.values()))
})

const selectedVariant = computed(() => {
    if (!product.value?.data.variants || !colorId.value || !size.value?.id) {
        return null
    }

    return product.value.data.variants.find(
        (variant: IProductVariant) => variant.color.id === colorId.value && variant.size.id === size.value.id,
    )
})

const cartStatus = computed(() => {
    const variant = selectedVariant.value
    if (!variant) {
        return false
    }

    return isProductInCart(variant.id).value
})

const wishlistStatus = isInWishlist(String(product.value?.data.id))

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

    nextTick(() => {
        if (availableSizes.value.length > 0) {
            const availableSize = availableSizes.value.find(s => !s.disabled)
            size.value = availableSize || availableSizes.value[0]
        }
        else {
            size.value = undefined
        }
    })
}

function handleCartClick() {
    if (!product.value?.data.id)
        return

    if (availableSizes.value.length > 0 && !size.value) {
        selectError.value = true
        return
    }

    const variant = selectedVariant.value

    toggleCartItem(
        variant ? variant.id : null,
        1,
        product.value.data.id,
    )
}

function handleWishlistClick() {
    if (!product.value)
        return

    toggleWishlist(
        String(product.value.data.id),
    )
}

function clearError() {
    selectError.value = false
}

useSwiper(containerRef, {
    speed: 1200,
    slidesPerView: 1,
    navigation: {
        prevEl: '.product__button--prev',
        nextEl: '.product__button--next',
    },
})

const form = reactive<IFeedback>({
    name: '',
    phone: '',
    email: '',
    message: '',
    product_variant: undefined,
})

const errors = ref<ValidationErrors>({})

function handleForm() {
    return client('/api/feedback', {
        body: form,
        method: 'post',
    })
}

const {
    submit: handleSubmit,
    isLoading: isFormSending,
    validationErrors,
} = useSubmit(
    () => handleForm(),
    {
        onSuccess: (response) => {
            useToastify(response, { type: 'success' })
            clearForm()
            isCustomOrderModalOpen.value = false
        },
    },
)

function clearForm() {
    form.name = ''
    form.phone = ''
    form.email = ''
    form.message = ''
    errors.value = {}
}

watch(validationErrors, (newErrors) => {
    errors.value = newErrors
})

watch(selectedVariant, (newVariant) => {
    form.product_variant = newVariant?.id
})

onMounted(() => {
    if (colors.value?.length) {
        const firstColor = colors.value[0]
        if (firstColor) {
            colorId.value = firstColor.id
            colorName.value = firstColor.name

            nextTick(() => {
                if (availableSizes.value.length > 0) {
                    const availableSize = availableSizes.value.find(s => !s.disabled)
                    size.value = availableSize || availableSizes.value[0]
                }
            })
        }
    }

    if (product.value?.data.id) {
        addToViewed(String(product.value.data.id))
        getViewedProducts()
    }
})

const seoTitle = computed(() => product.value?.data.seo.title ?? product.value?.data.name ?? null)
const seoDescription = computed(() => product.value?.data.seo.description ?? product.value?.data.description ?? null)
const seoImage = computed(() => product.value?.data.images[0]?.retina ?? null)
</script>

<template>
    <div>
        <Head>
            <Title>{{ seoTitle }}</Title>
            <Meta v-if="seoDescription" name="description" :content="seoDescription" />
            <Meta v-if="seoDescription" property="og:description" :content="seoDescription" />
            <Meta v-if="seoImage" property="og:image" :content="seoImage" />
            <Meta v-if="seoDescription" name="twitter:description" :content="seoDescription" />
            <Meta v-if="seoImage" name="twitter:image" :content="seoImage" />
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
                    <ClientOnly>
                        <div class="product__mobile">
                            <swiper-container ref="containerRef" :init="false" class="product__slider">
                                <swiper-slide v-for="(image, index) in product?.data.images" :key="index" class="product__slide">
                                    <img :src="image.retina" :alt="product?.data.name || ''" :srcset="`${image.normal} 1x, ${image.retina} 2x`">
                                </swiper-slide>
                            </swiper-container>
                            <nav class="product__navigation">
                                <button aria-label="Назад" type="button" class="product__button product__button--prev">
                                    <UiIcon name="arrow-left" size="45" />
                                </button>
                                <button aria-label="Вперед" type="button" class="product__button product__button--next">
                                    <UiIcon name="arrow-right" size="45" />
                                </button>
                            </nav>
                        </div>
                    </ClientOnly>
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
                                v-if="selectedVariant && selectedVariant.stock === 0"
                                title="Под заказ"
                                wide
                                class="product__action"
                                @click="isCustomOrderModalOpen = true"
                            >
                                <span>Под заказ</span>
                            </UiButton>
                            <UiButton
                                v-else
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
                                :title="wishlistStatus ? 'Убрать из вишлиста' : 'В вишлист'"
                                :active="wishlistStatus"
                                wide
                                square
                                aria-label="В вишлист" class="product__action"
                                @click="handleWishlistClick"
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
                <h2>{{ sizesTable?.data.name }}</h2>
                <div v-html="sizesTable?.data.content" />
            </div>
        </LayoutDialog>
        <LayoutDialog v-model="isCustomOrderModalOpen">
            <div class="modal-form">
                <div class="modal-form__header">
                    <h2 class="modal-form__title">
                        Напишите нам
                    </h2>
                    <p class="modal-form__description">
                        и мы сошьем то, что вам нужно в течении пяти дней
                    </p>
                </div>

                <div class="modal-form__body">
                    <VForm>
                        <VFormBlock :error="errors.name">
                            <VFormField>
                                <VFormLabel for="name">
                                    Ваше имя*
                                </VFormLabel>
                                <VFormInput
                                    id="name"
                                    v-model="form.name"
                                    :error="errors.name"
                                    type="text"
                                    placeholder="Введите имя"
                                />
                            </VFormField>
                        </VFormBlock>
                        <VFormBlock :error="errors.phone">
                            <VFormField>
                                <VFormLabel for="phone">
                                    Телефон*
                                </VFormLabel>
                                <VFormInput
                                    id="phone"
                                    v-model="form.phone"
                                    :error="errors.phone"
                                    type="tel"
                                    maska="+7 (###) ### ## ##"
                                    placeholder="Введите телефон"
                                />
                            </VFormField>
                        </VFormBlock>
                        <VFormBlock :error="errors.email">
                            <VFormField>
                                <VFormLabel for="email">
                                    Ваш email
                                </VFormLabel>
                                <VFormInput
                                    id="email"
                                    v-model="form.email"
                                    :error="errors.email"
                                    type="email"
                                    placeholder="Введите email"
                                />
                            </VFormField>
                        </VFormBlock>
                        <VFormBlock :error="errors.message">
                            <VFormField>
                                <VFormLabel for="message">
                                    Сообщение
                                </VFormLabel>
                                <VFormTextarea
                                    id="message"
                                    v-model="form.message"
                                    :error="errors.message"
                                    placeholder="Напишите нам сообщение"
                                />
                            </VFormField>
                        </VFormBlock>
                    </VForm>
                </div>
                <div class="modal-form__footer">
                    <VFormCheckbox
                        :checked="isAgreementAccepted"
                        @update:checked="isAgreementAccepted = $event"
                    >
                        <template #text>
                            <p class="modal-form__policy">
                                Подтвеждаю <NuxtLink target="_blank" to="/info/processing">
                                    согласие с обработкой моих персональных данных
                                </NuxtLink> и <NuxtLink target="_blank" to="/info/privacy">
                                    политикой конфиденциальности
                                </NuxtLink>
                            </p>
                        </template>
                    </VFormCheckbox>
                    <UiButton :disabled="!isAgreementAccepted" wide :is-loading="isFormSending" @click="handleSubmit">
                        Отправить
                    </UiButton>
                </div>
            </div>
        </LayoutDialog>
    </div>
</template>

<style lang="scss">
.product {
    .breadcrumb {
        @media (max-width: $mobile) {
            @include adaptive-value('padding-inline', 40, 20);
        }
    }

    &__container {
        @media (max-width: $mobile) {
            padding: 0 !important;
        }
    }

    // .product__body
    &__body {
        display: flex;
        align-items: flex-start;
        justify-content: space-between;

        @include adaptive-value('gap', 40, 20);

        @media (max-width: $mobile) {
            display: block;
        }
    }

    // .product__images
    &__images {
        display: grid;
        flex: 0 1 rem(920);
        grid-template-columns: 1fr 1fr;

        @include adaptive-value('gap', 20, 10);

        @media (max-width: $mobile) {
            display: none;
        }
    }

    // .product__mobile
    &__mobile {
        position: relative;
        display: none;

        @media (max-width: $mobile) {
            display: block;
        }
    }

    &__slider {
        width: 100%;
        min-width: 0;

        @media (max-width: $mobile) {
            margin-bottom: rem(20);
        }
    }

    // .product__navigation
    &__navigation {
        position: absolute;
        top: 50%;
        z-index: 10;
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        transform: translateY(-50%);
    }

    // .product__button
    &__button {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        width: rem(40);
        height: rem(40);
        color: $whiteColor;

        &.swiper-button-disabled {
            pointer-events: none;
            opacity: 0.4;
        }
    }

    // .product__image
    &__image,
    .vh--outer,
    &__slide {
        position: relative;
        aspect-ratio: 450 / 675;
        overflow: hidden;
        border-radius: rem(4);

        @media (max-width: $mobile) {
            border-radius: 0;
        }
    }

    &__slide {
        img {
            @include image;
        }
    }

    &__zoom {
        @include image;
    }

    // .product__content
    &__content {
        flex: 0 1 rem(460);

        @media (min-height: em(550)) {
            position: sticky;
            top: rem(100);
        }

        @media (max-width: $mobile) {
            @include adaptive-value('padding-inline', 40, 20);
        }
    }

    // .product__info
    &__info {
        display: grid;
        gap: rem(7);
        margin-bottom: rem(20);
    }

    // .product__sku
    &__sku {
        line-height: 140%;
        color: rgb(54 54 54 / 50%);

        @include adaptive-value('font-size', 16, 14);
    }

    // .product__title
    &__title {
        line-height: 140%;

        @include adaptive-value('font-size', 28, 20);
    }

    // .product__price
    &__price {
        font-weight: 500;
        line-height: 125%;

        @include adaptive-value('font-size', 28, 20);
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
        border-bottom: 1px solid $extraColor;

        @include adaptive-value('padding-bottom', 35, 20);
        @include adaptive-value('margin-bottom', 35, 20);

        &-info {
            display: flex;
            flex-direction: column;
            gap: rem(5);
        }

        &-outofstock {
            font-size: rem(14);
            color: rgb(54 54 54 / 50%);
        }
    }

    // .product__actions
    &__actions {
        display: flex;

        @include adaptive-value('gap', 20, 10);
    }

    // .product__description
    &__description {
        line-height: 140%;

        @include adaptive-value('font-size', 16, 14);
        @include adaptive-value('margin-top', 25, 20);
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
        cursor: pointer;
        border-radius: 50%;

        @include adaptive-value('width', 36, 30);
        @include adaptive-value('height', 36, 30);

        &:has(input:checked) {
            border: rem(3) solid $whiteColor;

            &::before {
                position: absolute;
                top: 50%;
                left: 50%;
                z-index: -1;
                width: calc(100% + rem(8));
                height: calc(100% + rem(8));
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
        line-height: 140%;
        color: rgb(54 54 54 / 50%);

        @include adaptive-value('font-size', 14, 12);
    }
}

.vh--holder {
    width: 100%;
    height: 100%;
}
</style>
