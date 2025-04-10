<script setup lang="ts">
import type { ICategory } from '@/types/api'

const client = useSanctumClient()

const route = useRoute()

const category = ref<ICategory>()

const categorySlug = computed(() => route.params.category)

const subcategorySlug = computed(() => route.params.subcategory)

async function getCategory() {
    return category.value = await client<ICategory>(`api/categories/${categorySlug.value}`)
}

await getCategory()
</script>

<template>
    <Catalog
        :api-url="`api/products/categories/${categorySlug}/${subcategorySlug}`"
        :query-key="[`categories-${categorySlug}-${subcategorySlug}`]"
        :breadcrumbs="[
            { title: 'Каталог', link: '/catalog' },
            { title: category?.name || '' },
        ]"
        :current-category="category"
        :base-url="`/catalog/${categorySlug}`"
    />
</template>
