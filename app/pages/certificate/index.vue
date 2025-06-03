<script setup lang="ts">
import type { ICertificate, ICertificateOrder } from '@/types/api'

const client = useSanctumClient()

const { isAuthenticated } = useSanctumAuth()

const certificates = ref<ICertificate[]>()

const isLoading = ref(false)

const certificateTotal = ref(0)

const form = ref<ICertificateOrder>()

const quantity = ref(1)

const amount = ref<number>()

const selectedOption = ref<any>(null)

const isInitialized = ref(false)

const isAgreementAccepted = ref(false)

const certificateOptions = computed(() => {
    return certificates.value?.map(cert => ({
        id: cert.id,
        name: cert.name,
        value: cert.amount,
    })) || []
})

const deliveryPrice = computed(() => {
    if (!form.value || form.value.delivery_type === 'pickup') {
        return 0
    }

    if (form.value.delivery_type === 'tyumen') {
        return Number(certificateTotal.value) >= 5000 ? 0 : 500
    }

    if (form.value.delivery_type === 'russia' && form.value.delivery_cost) {
        return form.value.delivery_cost
    }

    return 0
})

const totalWithDelivery = computed(() => {
    return Number(certificateTotal.value) + Number(deliveryPrice.value)
})

async function fetchCertificates() {
    try {
        isLoading.value = true
        certificates.value = await client<ICertificate[]>(`/api/certificates`)

        if (certificates.value && certificates.value.length > 0) {
            amount.value = certificates.value[0]!.amount
            selectedOption.value = certificateOptions.value[0]
            calculateTotal()
        }
    }
    finally {
        isLoading.value = false
        isInitialized.value = true
    }
}

fetchCertificates()

async function calculateTotal() {
    if (amount.value) {
        certificateTotal.value = amount.value * quantity.value
    }
    else {
        certificateTotal.value = 0
    }
}

async function submitOrder() {
    const certificate = certificates.value?.find(cert => cert.id === selectedOption.value.id)

    const payload = {
        certificate: certificate!,
        quantity: quantity.value,
        ...form.value,
        communication: form.value?.communication?.name,
    }

    const response = await client('/api/orders/certificate', {
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
        onSuccess: () => {},
    },
)

watch(
    [amount, quantity],
    () => {
        calculateTotal()
    },
    { immediate: true },
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

const seoTitle = 'Подарочный сертификат'
const seoDescription = 'Купить подарочный сертификат в интернет-магазине Beze Studio'
</script>

<template>
    <div>
        <Head>
            <Title>{{ seoTitle }}</Title>
            <Meta name="description" :content="seoDescription" />
            <Meta property="og:description" :content="seoDescription" />
            <Meta name="twitter:description" :content="seoDescription" />
        </Head>
        <section class="certificate spacer">
            <div class="certificate__container">
                <LayoutBreadcrumb
                    :items="[
                        { title: 'Подарочный сертификат' },
                    ]"
                />
                <UiPageTitle>Купить подарочный сертификат</UiPageTitle>
                <UiSpinner v-if="isLoading" />
                <div v-if="certificates?.length && isInitialized" class="certificate__body" :class="{ 'certificate__body--disabled': isFormSending }">
                    <div class="certificate__wrapper">
                        <div class="certificate__item">
                            <VFormSelect
                                v-model="selectedOption"
                                placeholder="Выберите номинал"
                                :options="certificateOptions"
                                @update:model-value="value => amount = value.value"
                            />
                            <VFormQuantity v-model="quantity" :min="1" :max="10" />
                        </div>
                        <UiLink v-if="!isAuthenticated" class="certificate__login" href="/auth/login">
                            Войти в личный кабинет
                        </UiLink>
                        <div class="certificate__form">
                            <UiSpinner v-if="isFormSending" />
                            <CartForm v-model="form" :errors="errors" />
                        </div>
                    </div>
                    <div class="certificate__checkout">
                        <div class="certificate__links">
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
                        <div class="certificate__caution">
                            <span>!</span>
                            Мы отправим бумажный (не электронный) сертификат
                        </div>
                        <div class="certificate__total">
                            <div v-if="form?.delivery_type !== 'pickup'" class="certificate__line">
                                <div class="certificate__key">
                                    Доставка
                                </div>
                                <div class="certificate__value">
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
                            <div v-if="form?.delivery_type === 'tyumen' && deliveryPrice > 0" class="certificate__line">
                                <div class="certificate__note">
                                    Бесплатная доставка по Тюмени от 5000 ₽
                                </div>
                            </div>
                            <div class="certificate__line">
                                <div class="certificate__key">
                                    Итого
                                </div>
                                <div class="certificate__value certificate__value--lg">
                                    {{ totalWithDelivery }} ₽
                                </div>
                            </div>
                        </div>
                        <div class="certificate__footer">
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
                                class="certificate__button"
                                @click="handleSubmit"
                            >
                                Оформить заказ
                            </UiButton>
                        </div>
                    </div>
                </div>
                <LayoutEmpty v-if="isInitialized && !certificates?.length">
                    <template #icon>
                        <UiIcon name="certificate" size="48" />
                    </template>
                    <template #title>
                        Сертификаты временно недоступны
                    </template>
                    <template #text>
                        Пожалуйста, попробуйте позже или свяжитесь с нами
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

<style lang="scss" scoped>
.certificate {
    // .certificate__body
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

    // .certificate__wrapper
    &__wrapper {
        flex: 0 1 rem(1000);
    }

    // .certificate__item
    &__item {
        display: flex;
        gap: rem(20);
        align-items: center;
        justify-content: space-between;
        padding-bottom: rem(40);
        margin-bottom: rem(40);
        border-bottom: 1px solid rgb(54 54 54 / 10%);
    }

    // .certificate__login
    &__login {
        margin-bottom: rem(20);
    }

    // .certificate__form
    &__form {
        position: relative;
    }

    // .certificate__checkout
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

    // .certificate__links
    &__links {
        display: grid;
        gap: rem(16);
    }

    // .certificate__link
    &__link {
        font-size: 16px;
        line-height: 130%;
        text-decoration: underline;
        text-decoration-thickness: 10%;
        text-decoration-style: dotted;
    }

    // .certificate__caution
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

    // .certificate__total
    &__total {
        display: grid;
        gap: rem(10);
    }

    // .certificate__line
    &__line {
        display: flex;
        gap: rem(20);
        align-items: center;
        justify-content: space-between;
    }

    // .certificate__key
    &__key {
        font-size: rem(16);
        line-height: 140%;
        text-transform: uppercase;
    }

    // .certificate__value
    &__value {
        font-size: rem(16);
        line-height: 140%;
        text-align: right;

        // .certificate__value--lg
        &--lg {
            font-size: rem(28);
            font-weight: 500;
        }
    }

    // .certificate__note
    &__note {
        font-size: rem(14);
        line-height: 130%;
        color: $accentColor;
    }

    // .certificate__footer
    &__footer {
        display: grid;
        gap: rem(10);
    }

    // .certificate__button
    &__button {
        width: 100%;
    }
}
</style>
