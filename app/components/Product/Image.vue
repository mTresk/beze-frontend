<script setup lang="ts">
import { VueImageZoomer } from 'vue-image-zoomer'
import 'vue-image-zoomer/dist/style.css'

defineProps<{
    alt: string
    regular: string
    zoom: string
}>()

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
        :show-message="false"
        :show-message-touch="false"
        :alt="alt"
        :lazyload="true"
        img-class="product__zoom"
        :regular="regular"
        :zoom="zoom"
    />
</template>
