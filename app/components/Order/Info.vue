<script setup lang="ts">
import type { IOrderResponse } from '@/types/api'
import { formatDate } from '@/helpers'
import { EOrderStatus } from '@/types/api'

interface IProps {
  order: IOrderResponse
}

defineProps<IProps>()

const client = useSanctumClient()

const isLoading = ref(false)

async function handlePayment(orderId: number) {
  isLoading.value = true

  const response = await client<string>(`/api/payments/create/${orderId}`, {
    method: 'post',
  })

  if (response) {
    isLoading.value = false
    window.location.href = response
  }
}

function getBadgeVariant(status: string) {
  switch (status) {
    case EOrderStatus.PENDING:
      return 'warning'
    case EOrderStatus.PAID:
      return 'success'
    case EOrderStatus.SHIPPED:
      return 'info'
    case EOrderStatus.DELIVERED:
      return 'success'
    case EOrderStatus.CANCELLED:
      return 'error'
    case EOrderStatus.RETURNED:
      return 'error'
    default:
      return 'info'
  }
}
</script>

<template>
  <div class="personal-order">
    <div
      v-if="order"
      class="personal-order__header"
    >
      <div class="personal-order__info">
        <div class="personal-order__value">
          <span>Заказ:</span> № {{ order?.id }} <span>от</span> {{ formatDate(order?.createdAt) }}
        </div>
        <div class="personal-order__value">
          <span>На сумму:</span> {{ order?.total }} ₽
        </div>
        <div class="personal-order__value">
          <span>Доставка:</span> {{ order?.deliveryType }}
        </div>
        <div class="personal-order__value">
          <span>Сумма доставки:</span> {{ order?.deliveryCost }} ₽
        </div>
        <div class="personal-order__value">
          <span>Статус:</span>
          <UiBadge :variant="getBadgeVariant(order?.status.value ?? '')">
            {{ order?.status.label }}
          </UiBadge>
        </div>
      </div>
      <div class="personal-order__action">
        <UiButton
          v-if="order.status.value === EOrderStatus.PENDING"
          small
          wide
          class="order-item__action"
          :is-loading="isLoading"
          @click="handlePayment(order.id)"
        >
          <span>Оплатить заказ</span>
        </UiButton>
      </div>
    </div>
    <div class="personal-order__items">
      <OrderItem
        v-for="item in order?.items"
        :key="item.id"
        :item="item"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.personal-order {
  display: grid;
  border-bottom: rem(1) solid var(--color-border);

  @include adaptive-value('padding-bottom', 30, 20);
  @include adaptive-value('margin-bottom', 30, 20);
  @include adaptive-value('gap', 20, 10);

  &__header {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;

    @include adaptive-value('gap', 30, 10);

    @media (max-width: $mobileSmall) {
      align-items: flex-end;
    }
  }

  &__info {
    display: grid;
    gap: rem(10);
  }

  &__value {
    display: flex;
    gap: rem(6);
    align-items: center;
    font-size: rem(16);
    font-weight: 500;
    line-height: 120%;

    span {
      font-weight: 400;
    }
  }

  &__items {
    display: grid;

    @include adaptive-value('gap', 20, 10);
  }
}
</style>
