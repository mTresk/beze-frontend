<script setup lang="ts">
defineProps<{
    name: string
    size: string
}>()
</script>

<template>
    <svg :width="size" :height="size">
        <use :href="`/images/icons.svg#${name}`" />
    </svg>
</template>
