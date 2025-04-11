<script setup lang="ts">
import type { IOrderResponse, IUser } from '@/types/api'
import { formatDate } from '@/helpers'

const client = useSanctumClient()

const user: Ref<IUser | null> = useSanctumUser()

const fetcher = async () => await client<IOrderResponse[]>(`/api/orders/${user.value?.id}`)

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

onMounted(async () => {
    await refetch()
})
</script>

<template>
    <UiSpinner v-if="isLoading" />
    <div v-else>
        <div v-for="order in orders" :key="order.id" class="personal-order">
            <div class="personal-order__info">
                <div class="personal-order__value">
                    <span>Заказ:</span> № {{ order.id }} <span>от</span> {{ formatDate(order.createdAt) }}
                </div>
                <div class="personal-order__value">
                    <span>На сумму:</span> {{ order.total }} ₽
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
