<script setup lang="ts">
import type { IOrderResponse, IUser } from '@/types/api'

const client = useSanctumClient()

const user: Ref<IUser | null> = useSanctumUser()

const route = useRoute()

const fetcher = async () => await client<IOrderResponse[]>(`/api/orders/users/${user.value?.id}`)

const {
    data: orders,
    suspense,
    isLoading,
    refetch,
} = useQuery({
    queryKey: ['orders'],
    queryFn: fetcher,
})

await suspense()

watch(route, () => {
    if (route.query.refetch === '1') {
        refetch()
    }
}, { immediate: true })
</script>

<template>
    <UiSpinner v-if="isLoading" />
    <div v-else>
        <OrderInfo v-for="order in orders" :key="order.id" :order="order" />
        <LayoutEmpty v-if="!orders?.length">
            <template #icon>
                <UiIcon name="user" size="48" />
            </template>
            <template #title>
                У вас пока нет заказов
            </template>
            <template #text>
                Закажите товары, чтобы просматривать их здесь
            </template>
            <template #button>
                <UiButton outline href="/catalog">
                    Перейти в каталог
                </UiButton>
            </template>
        </LayoutEmpty>
    </div>
</template>
