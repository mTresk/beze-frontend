<script setup lang="ts">
import type { IOrder } from '@/types/api'

const { cartItems, cartTotal, isLoading, clearCartItems } = useCart()

const { isAuthenticated, refreshIdentity } = useSanctumAuth()

const client = useSanctumClient()

const isInitialized = ref(false)

const form = ref<IOrder>()

const signedUrl = ref<string | null>(null)

async function submitOrder() {
    const products = cartItems.value.map((item) => {
        return {
            id: item.productVariant.id,
            quantity: item.quantity,
        }
    })

    const payload = {
        products,
        ...form.value,
        communication: form.value?.communication?.name,
    }

    const response = await client('/api/orders', {
        body: payload,
        method: 'post',
    })

    if (response) {
        signedUrl.value = response.signedUrl
    }
}

function extractSignedUrlParams(url: string) {
    const urlObj = new URL(url)
    const orderId = urlObj.pathname.split('/').slice(-2)[0]
    return {
        id: orderId,
        expires: urlObj.searchParams.get('expires'),
        signature: urlObj.searchParams.get('signature'),
    }
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
            if (isAuthenticated.value) {
                refreshIdentity()
                navigateTo({
                    path: '/personal',
                    query: {
                        refetch: 1,
                    },
                })
            }
            else {
                if (signedUrl.value) {
                    const { id, expires, signature } = extractSignedUrlParams(signedUrl.value)
                    navigateTo({
                        path: `/order/${id}`,
                        query: {
                            expires,
                            signature,
                        },
                    }, { replace: true })
                }
            }
            clearCartItems()
        },
    },
)

watch(isLoading, (value) => {
    if (!value) {
        isInitialized.value = true
    }
})

onMounted(() => {
    if (!isLoading.value) {
        isInitialized.value = true
    }
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
                <div v-if="cartItems.length" class="cart__body" :class="{ 'cart__body--disabled': isLoading }">
                    <div class="cart__wrapper">
                        <div class="cart__table">
                            <CartItem v-for="item in cartItems" :key="item.id" :cart-item="item" />
                        </div>
                        <UiLink v-if="!isAuthenticated" class="cart__login" href="/auth/login">
                            Войти в личный кабинет
                        </UiLink>
                        <div class="cart__form">
                            <UiSpinner v-if="isFormSending" />
                            <CartForm v-model="form" grid :errors="errors" />
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
                            После оформления заказа менеджер свяжется с вами для уточнения деталей
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
                            <UiButton :is-loading="isFormSending" class="cart__button" @click="handleSubmit">
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
                <LayoutEmpty v-if="isInitialized && !cartItems.length">
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
    // .cart__body
    &__body {
        position: relative;
        display: flex;
        align-items: flex-start;
        justify-content: space-between;

        @include adaptive-value('gap', 60, 20);

        @media (max-width: $tablet) {
            display: grid;
            justify-content: unset;
        }

        &--disabled {
            pointer-events: none;
            opacity: 0.5;
        }
    }

    // .cart__wrapper
    &__wrapper {
        flex: 0 1 rem(1000);
    }

    // .cart__table
    &__table {
        display: grid;
        border-bottom: 1px solid rgb(54 54 54 / 10%);

        @include adaptive-value('padding-bottom', 40, 20);
        @include adaptive-value('margin-bottom', 40, 20);
        @include adaptive-value('gap', 40, 20);
    }

    // .cart__login
    &__login {
        margin-bottom: rem(20);
    }

    // .cart__form
    &__form {
        position: relative;
    }

    // .cart__checkout
    &__checkout {
        position: sticky;
        top: rem(100);
        display: grid;
        flex: 0 1 rem(340);
        gap: rem(20);

        @media (max-width: $tablet) {
            position: static;
        }
    }

    // .cart__links
    &__links {
        display: grid;

        @include adaptive-value('gap', 16, 10);
    }

    // .cart__link
    &__link {
        line-height: 130%;
        text-decoration: underline;
        text-decoration-thickness: 10%;
        text-decoration-style: dotted;

        @include adaptive-value('font-size', 16, 14);
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
        font-size: rem(14);
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

        @media (max-width: $tablet) {
            text-align: center;
        }
    }
}
</style>
