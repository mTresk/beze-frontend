<script setup lang="ts">
import type { ICategory, ISubCategory } from '@/types/api'

const client = useSanctumClient()

const route = useRoute()

const category = ref<ICategory>()

const subcategory = ref<ISubCategory>()

const categorySlug = computed(() => route.params.category)

const subcategorySlug = computed(() => route.params.subcategory)

async function getCategoryData() {
    const [categoryData, subcategoryData] = await Promise.all([
        client<ICategory>(`api/categories/${categorySlug.value}`),
        client<ISubCategory>(`api/categories/${categorySlug.value}/${subcategorySlug.value}`),
    ])

    category.value = categoryData
    subcategory.value = subcategoryData
}

await getCategoryData()

const seoTitle = computed(() => subcategory.value?.seo?.title ?? subcategory.value?.name ?? null)
const seoDescription = computed(() => subcategory.value?.seo?.description ?? subcategory.value?.description ?? null)
</script>

<template>
    <div>
        <Head>
            <Title>{{ seoTitle }}</Title>
            <Meta v-if="seoDescription" name="description" :content="seoDescription" />
            <Meta v-if="seoDescription" property="og:description" :content="seoDescription" />
            <Meta v-if="seoDescription" name="twitter:description" :content="seoDescription" />
        </Head>
        <Catalog
            :api-url="`api/products/categories/${categorySlug}/${subcategorySlug}`"
            :query-key="[`categories-${categorySlug}-${subcategorySlug}`]"
            :breadcrumbs="[
                { title: 'Каталог', link: '/catalog' },
                { title: category?.name || '', link: `/catalog/category/${categorySlug}` },
                { title: subcategory?.name || '' },
            ]"
            :current-category="category"
            :base-url="`/catalog/category/${categorySlug}`"
        />
    </div>
</template>
