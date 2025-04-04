<script setup lang="ts">
import type { ICategory } from '@/types/api'

const categories = ref<ICategory[]>([])

async function getCategories() {
    return categories.value = await useFetcher<ICategory[]>('api/categories')
}

await getCategories()
</script>

<template>
    <Catalog
        api-url="api/products"
        :query-key="['products']"
        :breadcrumbs="[{ title: 'Каталог' }]"
        :categories="categories"
    />
</template>
