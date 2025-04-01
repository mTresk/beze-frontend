<script setup lang="ts">
import type { LenisScrollData } from '@/types/lenis'
import Lenis from 'lenis'

const lenisVS = ref<Lenis>()
const lenisRaf = ref()

const { setScrollState, setLenis } = useScrollState()

const lenisOptions = computed(() => {
    return {
        direction: 'vertical',
        gestureDirection: 'vertical',
        smooth: true,
        mouseMultiplier: 1,
        smoothTouch: false,
        touchMultiplier: 2,
        infinite: false,
    }
})

function initLenis() {
    lenisVS.value = new Lenis(lenisOptions.value)
    lenisVS.value.on('scroll', (scrollData: LenisScrollData) => {
        setScrollState(scrollData)
    })
    lenisVS.value.on('scroll', ScrollTrigger.update)
    setLenis(lenisVS.value)
    lenisRaf.value = requestAnimationFrame(raf)

    gsap.ticker.add((time) => {
        lenisVS.value?.raf(time * 1000)
    })

    gsap.ticker.lagSmoothing(0)
}

function raf(time: number) {
    if (!lenisVS.value) {
        return
    }

    lenisVS.value.raf(time)
    requestAnimationFrame(raf)
}

function destroyLenis() {
    if (!lenisVS.value) {
        return
    }
    setScrollState(false)
    lenisVS.value?.off('scroll', () => {})
    lenisVS.value.destroy()
    cancelAnimationFrame(lenisRaf.value)
}

onMounted(() => {
    initLenis()
})

onBeforeUnmount(() => {
    destroyLenis()
})

onUpdated(() => {
    destroyLenis()
    initLenis()
})
</script>

<template>
    <div>
        <slot />
    </div>
</template>

<style>
html.lenis {
    height: auto;
}

.lenis.lenis-smooth {
    scroll-behavior: auto !important;
}

.lenis.lenis-smooth [data-lenis-prevent] {
    overscroll-behavior: contain;
}

.lenis.lenis-stopped {
    overflow: hidden;
}

.lenis.lenis-scrolling iframe {
    pointer-events: none;
}
</style>
