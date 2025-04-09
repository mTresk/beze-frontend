<script setup lang="ts">
import type { IGallery } from '@/types/api'

const containerRef = ref(null)

const fetcher = async () => await useFetcher<IGallery>(`/api/gallery`)

const {
    data: gallery,
    suspense,
    isLoading,
} = useQuery({
    queryKey: ['gallery'],
    queryFn: fetcher,
})

await suspense()

useSwiper(containerRef, {
    speed: 3000,
    loop: true,
    spaceBetween: 20,
    autoplay: {
        delay: 0,
        disableOnInteraction: false,

    },
    slidesPerView: 'auto',
    injectStyles: [
        `.swiper {overflow: visible;}`,
        `.swiper-wrapper {transition-timing-function: linear;}`,
    ],
    breakpoints: {
        320: {
            spaceBetween: 10,
        },
        768: {
            spaceBetween: 20,
        },
    },
})
</script>

<template>
    <section class="gallery spacer">
        <UiSpinner v-if="isLoading" />
        <ClientOnly v-else>
            <swiper-container ref="containerRef" :init="false" class="gallery__slider">
                <swiper-slide v-for="(image, index) in gallery?.images" :key="index" class="gallery__item">
                    <img
                        class="gallery__image"
                        :src="image.normal"
                        :srcset="`${image.normal} 1x, ${image.retina} 2x`"
                        alt=""
                        loading="lazy"
                    >
                </swiper-slide>
            </swiper-container>
        </ClientOnly>
    </section>
</template>

<style lang="scss" scoped>
.gallery {
    position: relative;

    // .gallery__item
    &__item {
        width: rem(258);
        aspect-ratio: 1;
        overflow: hidden;
        border-radius: rem(4);
    }

    // .gallery__image
    &__image {
        @include image;
    }
}
</style>
