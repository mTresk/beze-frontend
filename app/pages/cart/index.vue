<script setup lang="ts">
import type { IOrder } from '@/types/api'

const { cartItems, cartTotal, isLoading, clearCartItems } = useCart()

const { isAuthenticated } = useSanctumAuth()

const client = useSanctumClient()

const isInitialized = ref(false)

const form = ref<IOrder>()

const isAgreementAccepted = ref(false)

const deliveryPrice = computed(() => {
    if (!form.value || form.value.delivery_type === 'pickup') {
        return 0
    }

    if (form.value.delivery_type === 'tyumen') {
        return Number(cartTotal.value) >= 5000 ? 0 : 500
    }

    if (form.value.delivery_type === 'russia' && form.value.delivery_cost) {
        return form.value.delivery_cost
    }

    return 0
})

const totalWithDelivery = computed(() => {
    return Number(cartTotal.value) + Number(deliveryPrice.value)
})

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

    const response = await client<string>('/api/orders', {
        body: payload,
        method: 'post',
    })

    if (response) {
        window.location.href = response
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

const seoTitle = 'Корзина'
const seoDescription = 'Корзина интернет-магазина Beze Studio'
</script>

<template>
    <div>
        <Head>
            <Title>{{ seoTitle }}</Title>
            <Meta name="description" :content="seoDescription" />
            <Meta property="og:description" :content="seoDescription" />
            <Meta name="twitter:description" :content="seoDescription" />
        </Head>
        <section class="cart spacer">
            <div class="cart__container">
                <LayoutBreadcrumb
                    :items="[
                        { title: 'Корзина' },
                    ]"
                />
                <UiPageTitle>Корзина</UiPageTitle>
                <UiSpinner v-if="isLoading" />
                <div v-if="cartItems.length" class="cart__body" :class="{ 'cart__body--disabled': isFormSending }">
                    <div class="cart__wrapper">
                        <div class="cart__table">
                            <CartItem v-for="item in cartItems" :key="item.id" :cart-item="item" />
                        </div>
                        <UiLink v-if="!isAuthenticated" class="cart__login" href="/auth/login">
                            Войти в личный кабинет
                        </UiLink>
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
                            После оплаты заказа менеджер свяжется с вами для уточнения деталей
                        </div>
                        <div class="cart__total">
                            <div v-if="form?.delivery_type !== 'pickup'" class="cart__line">
                                <div class="cart__key">
                                    Доставка
                                </div>
                                <div class="cart__value">
                                    <template v-if="form?.delivery_type === 'russia' && !form?.delivery_cost">
                                        Выберите пункт выдачи
                                    </template>
                                    <template v-else-if="deliveryPrice > 0">
                                        {{ deliveryPrice }} ₽
                                    </template>
                                    <template v-else>
                                        Бесплатно
                                    </template>
                                </div>
                            </div>
                            <div v-if="form?.delivery_type === 'tyumen' && deliveryPrice > 0" class="cart__line cart__line--note">
                                <div class="cart__note">
                                    Бесплатная доставка по Тюмени от 5000 ₽
                                </div>
                            </div>
                            <div class="cart__line">
                                <div class="cart__key">
                                    Итого
                                </div>
                                <div class="cart__value cart__value--lg">
                                    {{ totalWithDelivery }} ₽
                                </div>
                            </div>
                        </div>
                        <div class="cart__footer">
                            <VFormCheckbox
                                :checked="isAgreementAccepted"
                                @update:checked="isAgreementAccepted = $event"
                            >
                                <template #text>
                                    <VFormPolicy />
                                </template>
                            </VFormCheckbox>
                            <UiButton
                                :disabled="form?.delivery_type === 'russia' && !form?.delivery_cost || !isAgreementAccepted"
                                :is-loading="isFormSending"
                                class="cart__button"
                                @click="handleSubmit"
                            >
                                Оформить заказ
                            </UiButton>
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

    &__wrapper {
        flex: 0 1 rem(1000);
    }

    &__table {
        display: grid;
        border-bottom: rem(1) solid rgb(54 54 54 / 10%);

        @include adaptive-value('padding-bottom', 40, 20);
        @include adaptive-value('margin-bottom', 40, 20);
        @include adaptive-value('gap', 40, 20);
    }

    &__login {
        margin-bottom: rem(20);
    }

    &__form {
        position: relative;
    }

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

    &__links {
        display: grid;

        @include adaptive-value('gap', 16, 10);
    }

    &__link {
        line-height: 130%;
        text-decoration: underline;
        text-decoration-thickness: 10%;
        text-decoration-style: dotted;

        @include adaptive-value('font-size', 16, 14);
    }

    &__caution {
        display: flex;
        gap: rem(8);
        align-items: flex-start;
        padding: rem(14) rem(16);
        font-size: rem(13);
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

    &__total {
        display: grid;
        gap: rem(10);
    }

    &__line {
        display: flex;
        gap: rem(20);
        align-items: center;
        justify-content: space-between;

        &--note {
            justify-content: flex-end;
        }
    }

    &__key {
        font-size: rem(16);
        line-height: 140%;
        text-transform: uppercase;
    }

    &__value {
        font-size: rem(16);
        line-height: 140%;
        text-align: right;

        &--lg {
            font-size: rem(28);
            font-weight: 500;
        }
    }

    &__note {
        font-size: rem(14);
        line-height: 130%;
        color: $accentColor;
    }

    &__footer {
        display: grid;
        gap: rem(10);
    }

    &__button {
        width: 100%;
    }
}
</style>
