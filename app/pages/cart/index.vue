<script setup lang="ts">
import type { ICartProduct, IOrder, IProductVariant } from '@/types/api'

const { cartItems, clearCartItems } = useCart()

const products = ref<IProductVariant[]>()

const isLoading = ref(false)

const isDataLoaded = ref(false)

const cartTotal = ref()

const variantIds = computed(() => {
    return cartItems.value.map(item => item.variantId)
})

const form = ref<IOrder>()

async function fetchProducts() {
    if (!variantIds.value.length) {
        products.value = []
        return
    }

    products.value = await useFetcher<IProductVariant[]>(`/api/products/variants?ids=${variantIds.value.join(',')}`)
}

async function fetchAllData() {
    isLoading.value = true
    await fetchProducts()
    isLoading.value = false
    checkDataLoaded()
}

function checkDataLoaded() {
    if (products.value) {
        isDataLoaded.value = true
        calculateTotal()
    }
}

const productCartItems = computed(() => {
    if (!products.value) {
        return []
    }

    return cartItems.value.map((item) => {
        const variant = products.value?.find(
            variant => String(variant.id) === item.variantId,
        )

        if (!variant) {
            return null
        }

        return {
            id: variant.id,
            name: variant.product.name,
            slug: variant.product.slug,
            description: variant.product.description || '',
            sku: variant.sku,
            price: variant.price,
            image: variant.image,
            color: variant.color,
            size: variant.size,
            quantity: Number(item.qty),
            category: variant.category,
        } as ICartProduct
    }).filter(Boolean)
})

async function calculateTotal() {
    if (!isDataLoaded.value)
        return

    let total = 0

    productCartItems.value.forEach((item) => {
        if (item) {
            const price = Number.parseFloat(item.price.replace(/\s+/g, ''))
            const quantity = Number(item.quantity)
            total += price * quantity
        }
    })

    cartTotal.value = total
}

async function submitOrder() {
    const products = productCartItems.value.map((item) => {
        return {
            id: item?.id,
            quantity: item?.quantity,
        }
    })

    const payload = {
        products,
        ...form.value,
        communication: form.value?.communication?.name,
    }

    await useFetcher('/api/order', {
        body: payload,
        method: 'post',
    })
}

const {
    submit: handleSubmit,
    validationErrors: errors,
    isLoading: isFormSending,
} = useSubmit(
    () => {
        return submitOrder()
    },
    {
        onSuccess: () => {
            clearCartItems()
            navigateTo('/order', { replace: true })
        },
    },
)

watch(
    () => productCartItems.value.map(item => item?.quantity),
    () => {
        if (isDataLoaded.value) {
            calculateTotal()
        }
    },
)

onMounted(() => {
    fetchAllData()
})
</script>

<template>
    <div>
        <section class="cart spacer">
            <div class="cart__container">
                <LayoutBreadcrumb
                    :items="[
                        { title: 'Корзина' },
                    ]"
                />
                <UiPageTitle>Корзина</UiPageTitle>
                <UiSpinner v-if="isLoading" />
                <div v-if="productCartItems.length" class="cart__body">
                    <div class="cart__wrapper">
                        <div class="cart__table">
                            <CartItem v-for="product in productCartItems" :key="product?.id" :product="product as ICartProduct" />
                        </div>
                        <div class="cart__form">
                            <UiSpinner v-if="isFormSending" />
                            <CartForm v-model="form" :errors="errors" />
                        </div>
                    </div>
                    <div class="cart__checkout">
                        <div class="cart__links">
                            <NuxtLink to="/info/delivery">
                                <UiLink>
                                    Условия оплаты и доставки
                                </UiLink>
                            </NuxtLink>
                            <NuxtLink to="/info/refund">
                                <UiLink>
                                    Условия возврата и обмена
                                </UiLink>
                            </NuxtLink>
                        </div>
                        <div class="cart__caution">
                            <span>!</span>
                            Оплата производится после уточнения менеджером деталей заказа
                        </div>
                        <div class="cart__total">
                            <div class="cart__line">
                                <div class="cart__key">
                                    Доставка
                                </div>
                                <div class="cart__value">
                                    0 ₽
                                </div>
                            </div>
                            <div class="cart__line">
                                <div class="cart__key">
                                    Итого
                                </div>
                                <div class="cart__value cart__value--lg">
                                    {{ cartTotal }} ₽
                                </div>
                            </div>
                        </div>
                        <div class="cart__footer">
                            <UiButton :disabled="isFormSending" class="cart__button" @click="handleSubmit">
                                Сделать заказ
                            </UiButton>
                            <p class="cart__policy">
                                Нажимая на кнопку «сделать заказ», я принимаю условия <NuxtLink to="/info/offer">
                                    публичной оферты
                                </NuxtLink> и <NuxtLink to="/info/privacy">
                                    политики конфиденциальности
                                </NuxtLink>
                            </p>
                        </div>
                    </div>
                </div>
                <LayoutEmpty v-else>
                    <template #icon>
                        <UiIcon name="cart" size="48" />
                    </template>
                    <template #title>
                        Ваша корзина пока пуста
                    </template>
                    <template #text>
                        Добавьте товары в корзину, чтобы просматривать их здесь
                    </template>
                    <template #button>
                        <UiButton outline href="/catalog">
                            Перейти в каталог
                        </UiButton>
                    </template>
                </LayoutEmpty>
            </div>
        </section>
    </div>
</template>

<style lang="scss">
.cart {
    padding-top: rem(130);

    // .cart__body
    &__body {
        position: relative;
        display: flex;
        gap: rem(60);
        align-items: flex-start;
        justify-content: space-between;
    }

    // .cart__wrapper
    &__wrapper {
        flex: 0 1 rem(1000);
    }

    // .cart__table
    &__table {
        display: grid;
        gap: rem(40);
        padding-bottom: rem(40);
        margin-bottom: rem(40);
        border-bottom: 1px solid rgb(54 54 54 / 10%);
    }

    // .cart__form
    &__form {
        position: relative;
        max-width: rem(330);
    }

    // .cart__checkout
    &__checkout {
        position: sticky;
        top: rem(100);
        display: grid;
        flex: 0 1 rem(340);
        gap: rem(20);
    }

    // .cart__links
    &__links {
        display: grid;
        gap: rem(16);
    }

    // .cart__link
    &__link {
        font-size: 16px;
        line-height: 130%;
        text-decoration: underline;
        text-decoration-thickness: 10%;
        text-decoration-style: dotted;
    }

    // .cart__caution
    &__caution {
        display: flex;
        gap: rem(8);
        align-items: flex-start;
        padding: rem(14) rem(16);
        font-size: 13px;
        line-height: 130%;
        background-color: $lightColor;
        border-radius: rem(4);

        span {
            display: flex;
            flex-shrink: 0;
            align-items: center;
            justify-content: center;
            width: rem(16);
            height: rem(16);
            font-size: rem(12);
            line-height: 130%;
            color: $whiteColor;
            background-color: $accentColor;
            border-radius: 50%;
        }
    }

    // .cart__total
    &__total {
        display: grid;
        gap: rem(10);
    }

    // .cart__line
    &__line {
        display: flex;
        gap: rem(20);
        align-items: center;
        justify-content: space-between;
    }

    // .cart__key
    &__key {
        font-size: 16px;
        line-height: 140%;
        text-transform: uppercase;
    }

    // .cart__value
    &__value {
        font-size: 16px;
        line-height: 140%;
        text-align: right;

        // .cart__value--lg
        &--lg {
            font-size: 28px;
            font-weight: 500;
        }
    }

    // .cart__footer
    &__footer {
        display: grid;
        gap: rem(10);
    }

    // .cart__button
    &__button {
        width: 100%;
    }

    // .cart__policy
    &__policy {
        font-size: 14px;
        line-height: 140%;

        a {
            text-decoration: underline;
            text-decoration-thickness: 10%;
            text-decoration-style: dotted;
            transition: color 0.3s ease-in-out;

            @media (any-hover: hover) {
                &:hover {
                    color: $accentColor;
                }
            }
        }
    }
}
</style>
