<script setup lang="ts">
import { VueImageZoomer } from 'vue-image-zoomer'
import 'vue-image-zoomer/dist/style.css'

interface IProps {
  alt: string
  regular: string
  zoom: string
  width: number
  height: number
}

defineProps<IProps>()

onBeforeUnmount(() => {
  const zoomElements = document.querySelectorAll('.vh--outer')

  zoomElements.forEach((element) => {
    const clone = element.cloneNode(true)
    element.parentNode?.replaceChild(clone, element)
  })
})
</script>

<template>
  <VueImageZoomer
    :zoom-amount="3"
    :alt="alt"
    :lazyload="true"
    img-class="product__zoom"
    :img-height="height"
    :img-width="width"
    :regular="regular"
    :zoom="zoom"
    :click-zoom="true"
    touch-message="Коснитесь для увеличения"
    :show-message="false"
  />
</template>

<style lang="scss">
.vh {
  &--message {
    background-color: rgb(183 157 131 / 80%);

    @include adaptive-value('font-size', 14, 10);
  }

  &--holder {
    width: 100%;
    height: 100%;
  }

  &--close {
    background-color: rgb(183 157 131 / 80%);
  }
}
</style>
