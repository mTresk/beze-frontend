<script setup lang="ts">
import type { IProduct } from '@/types/api'

const client = useSanctumClient()

const { favorites } = useFavorites()

const products = ref<IProduct[]>()

const isLoading = ref(false)

async function fetchProducts() {
    isLoading.value = true

    products.value = await client<IProduct[]>(`/api/products/favorites?ids=${favorites.value}`)

    isLoading.value = false
}

watch(() => favorites.value, () => fetchProducts())
</script>

<template>
    <div>
        <section class="favorites spacer">
            <div class="favorites__container">
                <LayoutBreadcrumb
                    :items="[
                        { title: 'Вишлист' },
                    ]"
                />
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
    // .favorites__body
    &__body {
        display: grid;
        grid-template-columns: repeat(4, 1fr);

        @include adaptive-value('column-gap', 25, 10);
        @include adaptive-value('row-gap', 45, 20);

        @media (max-width: $tablet) {
            grid-template-columns: repeat(2, 1fr);
        }
    }
}
</style>
