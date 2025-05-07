<script setup lang="ts">
import type { ICertificate, ICertificateOrder } from '@/types/api'

const client = useSanctumClient()

const certificates = ref<ICertificate[]>()

const isLoading = ref(false)

const certificateTotal = ref(0)

const form = ref<ICertificateOrder>()

const quantity = ref(1)

const amount = ref<number>()

const selectedOption = ref<any>(null)

const certificateOptions = computed(() => {
    return certificates.value?.map(cert => ({
        id: cert.id,
        name: cert.name,
        value: cert.amount,
    })) || []
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
    }

    await client('/api/order', {
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
            navigateTo('/order', { replace: true })
        },
    },
)

watch(
    [amount, quantity],
    () => {
        calculateTotal()
    },
    { immediate: true },
)
</script>

<template>
    <div>
        <section class="certificate spacer">
            <div class="certificate__container">
                <LayoutBreadcrumb
                    :items="[
                        { title: 'Подарочный сертификат' },
                    ]"
                />
                <UiPageTitle>Купить подарочный сертификат</UiPageTitle>
                <UiSpinner v-if="isLoading" />
                <div v-if="certificates?.length" class="certificate__body" :class="{ 'certificate__body--disabled': isFormSending }">
                    <div class="certificate__wrapper">
                        <div class="certificate__item">
                            <VFormSelect
                                v-model="selectedOption"
                                placeholder="Выберите номинал"
                                :options="certificateOptions"
                                @update:model-value="value => amount = value.value"
                                @clear-error="clearError"
                            />
                            <VFormQuantity v-model="quantity" :min="1" :max="10" />
                        </div>
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
                            После оплаты менеджер свяжется с вами для уточнения деталей заказа
                        </div>
                        <div class="certificate__total">
                            <div class="certificate__line">
                                <div class="certificate__key">
                                    Доставка
                                </div>
                                <div class="certificate__value">
                                    0 ₽
                                </div>
                            </div>
                            <div class="certificate__line">
                                <div class="certificate__key">
                                    Итого
                                </div>
                                <div class="certificate__value certificate__value--lg">
                                    {{ certificateTotal }} ₽
                                </div>
                            </div>
                        </div>
                        <div class="certificate__footer">
                            <UiButton :disabled="isFormSending" class="certificate__button" @click="handleSubmit">
                                Сделать заказ
                            </UiButton>
                            <p class="certificate__policy">
                                Нажимая на кнопку «сделать заказ», я принимаю условия <NuxtLink to="/info/offer">
                                    публичной оферты
                                </NuxtLink> и <NuxtLink to="/info/privacy">
                                    политики конфиденциальности
                                </NuxtLink>
                            </p>
                        </div>
                    </div>
                </div>
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
        font-size: 16px;
        line-height: 140%;
        text-transform: uppercase;
    }

    // .certificate__value
    &__value {
        font-size: 16px;
        line-height: 140%;
        text-align: right;

        // .certificate__value--lg
        &--lg {
            font-size: 28px;
            font-weight: 500;
        }
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

    // .certificate__policy
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
    }
}
</style>
