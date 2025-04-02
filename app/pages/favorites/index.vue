<script setup lang="ts">
import type { IProduct } from '@/types/api'

definePageMeta({
    pageTransition: {
        name: 'layout',
        mode: 'out-in',
    },
})

const { favorites } = useFavorites()

const products = ref<IProduct[]>()

const isLoading = ref(false)

async function fetchFovorites() {
    isLoading.value = true

    const data = await useFetcher<IProduct[]>(`/api/favorites?ids=${favorites.value}`)

    products.value = data
    isLoading.value = false
}

watch(() => favorites.value, () => fetchFovorites())
</script>

<template>
    <div>
        <section class="favorites">
            <div class="favorites__container">
                <ul class="breadcrumb">
                    <li>
                        <NuxtLink to="/">
                            Главная
                        </NuxtLink>
                    </li>
                    <li><span>Избранное</span></li>
                </ul>
                <UiPageTitle>Вишлист</UiPageTitle>
                <UiSpinner v-if="isLoading" />
                <div class="favorites__body">
                    <ProductItem v-for="product in products" :key="product.id" :product="product" />
                </div>
            </div>
        </section>
    </div>
</template>

<style lang="scss">
.favorites {
	padding-top: rem(130);
	padding-bottom: rem(160);

	// .favorites__body
	&__body {
		display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: rem(45) rem(25);
	}

	// .favorites__footer
	&__footer {
		display: flex;
        align-items: center;
        justify-content: center;
	}
}
</style>
