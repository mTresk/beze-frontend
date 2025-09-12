<script setup lang="ts">
interface IProps {
  pickupAddress: string
}

defineProps<IProps>()
</script>

<template>
  <div class="delivery-info">
    <div class="delivery-info__text">
      Заказ можно получить в магазине по адресу: <br>
      {{ pickupAddress }}
    </div>
  </div>
</template>

<style lang="scss" scoped>
.delivery-info {
  &__text {
    font-size: rem(16);
    line-height: 130%;
  }
}
</style>
