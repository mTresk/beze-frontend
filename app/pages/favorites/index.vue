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

async function fetchProducts() {
    isLoading.value = true

    const data = await useFetcher<IProduct[]>(`/api/products/favorites?ids=${favorites.value}`)

    products.value = data
    isLoading.value = false
}

watch(() => favorites.value, () => fetchProducts())
</script>

<template>
    <div>
        <section class="favorites spacer">
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
                <div class="favorites__wrapper">
                    <div v-if="favorites.length" class="favorites__body">
                        <ProductItem v-for="product in products" :key="product.id" :product="product" />
                    </div>
                    <LayoutEmpty v-else>
                        <template #icon>
                            <UiIcon name="favorite" size="48" />
                        </template>
                        <template #title>
                            Ваш вишлист пока пуст
                        </template>
                        <template #text>
                            Добавьте товары в вишлист, чтобы просматривать их здесь
                        </template>
                        <template #button>
                            <UiButton outline href="/catalog">
                                Перейти в каталог
                            </UiButton>
                        </template>
                    </LayoutEmpty>
                </div>
            </div>
        </section>
    </div>
</template>

<style lang="scss">
.favorites {
    padding-top: rem(130);

    // .favorites__body
    &__body {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: rem(45) rem(25);
    }

    // .favorites__empty
    &__empty {
        font-size: rem(16);
        line-height: 125%;
    }
}
</style>
