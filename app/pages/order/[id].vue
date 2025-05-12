<script setup lang="ts">
import type { IOrderResponse } from '@/types/api'

const route = useRoute()

const client = useSanctumClient()

const order = ref<IOrderResponse | null>(null)

const isLoading = ref(false)

const orderId = route.params.id as string

const expires = route.query.expires as string

const signature = route.query.signature as string

const hasAllParams = computed(() => orderId && expires && signature)

async function fetchOrder() {
    try {
        isLoading.value = true

        if (!hasAllParams.value) {
            throw new Error('Отсутствуют необходимые параметры для получения заказа')
        }

        const params = new URLSearchParams({
            expires,
            signature,
        })

        const url = `/api/orders/${orderId}?${params}`

        const response = await client(url)

        if (response) {
            order.value = response
        }
    }
    catch (e) {
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
const title = computed(() => order.value ? 'Ваш заказ' : 'Заказ не найден')
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
                <UiPageTitle>{{ title }}</UiPageTitle>
                <UiSpinner v-if="isLoading" />
                <template v-else>
                    <OrderInfo v-if="order" :order="order" />

                    <LayoutEmpty v-if="!order">
                        <template #icon>
                            <UiIcon name="sad" size="48" />
                        </template>
                        <template #title>
                            Заказ не найден
                        </template>
                        <template #text>
                            Возможно, он был удален или не существует
                        </template>
                        <template #button>
                            <UiButton outline href="/personal">
                                Перейти в личный кабинет
                            </UiButton>
                        </template>
                    </LayoutEmpty>
                </template>
            </div>
        </section>
    </div>
</template>
