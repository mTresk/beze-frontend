<script setup lang="ts">
import type { IOrderResponse } from '@/types/api'

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
</script>

<template>
    <div>
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

                    <div v-else-if="order" class="order__content">
                        <div class="order__success">
                            Ваш заказ #{{ order.id }} успешно оформлен
                        </div>
                        <div v-if="order" class="order__details">
                            <div class="order__info">
                                <div class="order__row">
                                    <span class="order__label">Статус:</span>
                                    <span class="order__value">{{ order.status.label }}</span>
                                </div>
                                <div class="order__row">
                                    <span class="order__label">Сумма заказа:</span>
                                    <span class="order__value">{{ order.total }} ₽</span>
                                </div>
                            </div>
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
