<script setup lang="ts">
import type { IOrderResponse } from '@/types/api'
import { formatDate } from '@/helpers'

const route = useRoute()

const client = useSanctumClient()

const order = ref<IOrderResponse | null>(null)

const isLoading = ref(false)

const error = ref<string | null>(null)

const orderId = route.params.id as string

const expires = route.query.expires as string

const signature = route.query.signature as string

// Проверяем наличие всех необходимых параметров
const hasAllParams = computed(() => orderId && expires && signature)

async function fetchOrder() {
    try {
        isLoading.value = true
        error.value = null

        if (!hasAllParams.value) {
            throw new Error('Отсутствуют необходимые параметры для получения заказа')
        }

        // Формируем URL с параметрами
        const params = new URLSearchParams({
            expires,
            signature,
        })

        const url = `/api/orders/${orderId}/view?${params}`

        const response = await client(url)

        if (response) {
            order.value = response
        }
    }
    catch (e) {
        error.value = 'Не удалось загрузить информацию о заказе'
        console.error('Ошибка при загрузке заказа:', e)
    }
    finally {
        isLoading.value = false
    }
}

onMounted(() => {
    fetchOrder()
})

const seoTitle = 'Заказ'
const seoDescription = 'Детали заказа в интернет-магазине Beze Studio'
</script>

<template>
    <div>
        <Head>
            <Title>{{ seoTitle }}</Title>
            <Meta name="description" :content="seoDescription" />
            <Meta property="og:description" :content="seoDescription" />
            <Meta name="twitter:description" :content="seoDescription" />
        </Head>
        <section class="order spacer">
            <div class="order__container">
                <LayoutBreadcrumb
                    :items="[
                        { title: 'Заказ' },
                    ]"
                />
                <UiPageTitle>Ваш заказ</UiPageTitle>

                <UiSpinner v-if="isLoading" />

                <template v-else>
                    <div v-if="error" class="order__error">
                        {{ error }}
                    </div>

                    <div v-if="order" class="personal-order">
                        <div class="personal-order__info">
                            <div class="personal-order__value">
                                <span>Заказ:</span> № {{ order.id }} <span>от</span> {{ formatDate(order.createdAt) }}
                            </div>
                            <div class="personal-order__value">
                                <span>На сумму:</span> {{ order.total }} ₽
                            </div>
                            <div class="personal-order__value">
                                <span>Доставка:</span> {{ order.deliveryType }}
                            </div>
                            <div class="personal-order__value">
                                <span>Сумма доставки:</span> {{ order.deliveryCost }} ₽
                            </div>
                            <div class="personal-order__value">
                                <span>Статус:</span>
                                {{ order.status.label }}
                            </div>
                        </div>
                        <div class="personal-order__items">
                            <OrderItem
                                v-for="item in order.items"
                                :key="item.id"
                                :item="item"
                            />
                        </div>
                    </div>

                    <div v-else class="order__empty">
                        Информация о заказе не найдена
                    </div>
                </template>
            </div>
        </section>
    </div>
</template>

<style lang="scss" scoped>
.personal-order {
    display: grid;
    border-bottom: 1px solid rgb(54 54 54 / 10%);

    @include adaptive-value('padding-bottom', 30, 20);
    @include adaptive-value('margin-bottom', 30, 20);
    @include adaptive-value('gap', 20, 10);

    // .personal-order__info
    &__info {
        display: grid;
        gap: rem(10);
    }

    // .personal-order__value
    &__value {
        font-size: rem(16);
        font-weight: 500;
        line-height: 120%;

        span {
            font-weight: 400;
        }
    }

    // .personal-order__items
    &__items {
        display: grid;

        @include adaptive-value('gap', 20, 10);
    }
}
</style>
