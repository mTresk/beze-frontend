<script setup>
definePageMeta({
    pageTransition: {
        name: 'layout',
        mode: 'out-in',
    },
})
</script>

<template>
    <div>
        <Hero />
        <Advantages />
        <Directions />
        <Bestsellers />
        <Collections />
        <About />
        <UiCursor />
    </div>
</template>
