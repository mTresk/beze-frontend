<script setup lang="ts">
import type { ICategory } from '@/types/api'

const client = useSanctumClient()

const route = useRoute()

const category = ref<ICategory>()

const categorySlug = computed(() => route.params.category)

async function getCategory() {
    return category.value = await client<ICategory>(`api/categories/${categorySlug.value}`)
}

await getCategory()
</script>

<template>
    <Catalog
        :api-url="`api/products/categories/${categorySlug}`"
        :query-key="[`categories-${categorySlug}`]"
        :breadcrumbs="[
            { title: 'Каталог', link: '/catalog' },
            { title: category?.name || '' },
        ]"
        :current-category="category"
        :base-url="`/catalog/category/${categorySlug}`"
    />
</template>
