<script setup lang="ts">
import type { IOrderResponse, IUser } from '@/types/api'

const client = useSanctumClient()
const { $echo } = useNuxtApp()
const user: Ref<IUser | null> = useSanctumUser()
const route = useRoute()

const fetcher = async () => await client<IOrderResponse[]>(`/api/orders/users/${user.value?.id}`)

const { data: orders, isLoading, refetch } = useQuery({
  queryKey: ['orders'],
  queryFn: fetcher,
  enabled: computed(() => !!user.value?.id),
})

watch(route, () => {
  if (route.query.refetch === '1') {
    refetch()
  }
}, { immediate: true })

onMounted(() => {
  if (user.value) {
    $echo.private(`orders.${user.value.id}`)
      .listen('NewOrderStatus', (orderData: Partial<IOrderResponse>) => {
        if (orderData?.id && orders.value) {
          const orderIndex = orders.value.findIndex(order => order.id === orderData.id)

          if (orderIndex !== -1) {
            refetch()
            useToastify(`Новый статус заказа №${orderData.id} - «${orderData.status?.label}»`, { type: 'success' })
          }
        }
      })
  }
})

onUnmounted(() => {
  if (user.value) {
    $echo.private(`orders.${user.value.id}`).stopListening('NewOrderStatus')
  }
})
</script>

<template>
  <UiSpinner v-if="isLoading" />
  <div v-else>
    <OrderInfo
      v-for="order in orders"
      :key="order.id"
      :order="order"
    />
    <LayoutEmpty v-if="!orders?.length">
      <template #icon>
        <UiIcon
          name="user"
          size="48"
        />
      </template>
      <template #title>
        У вас пока нет заказов
      </template>
      <template #text>
        Закажите товары, чтобы просматривать их здесь
      </template>
      <template #button>
        <UiButton
          outline
          href="/catalog"
        >
          Перейти в каталог
        </UiButton>
      </template>
    </LayoutEmpty>
  </div>
</template>
