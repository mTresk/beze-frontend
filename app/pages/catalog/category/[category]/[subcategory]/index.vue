<script setup lang="ts">
import type { ICategory, ISubCategory } from '@/types/api'

const client = useSanctumClient()

const route = useRoute()

const categorySlug = computed(() => route.params.category)

const subcategorySlug = computed(() => route.params.subcategory)

const fetchCategory = () => client<ICategory>(`api/categories/${categorySlug.value}`)

const fetchSubcategory = () => client<ISubCategory>(`api/categories/${categorySlug.value}/${subcategorySlug.value}`)

const {
    data: category,
    suspense: categorySuspense,
} = useQuery({
    queryKey: ['category', categorySlug.value],
    queryFn: fetchCategory,
})

const {
    data: subcategory,
    suspense: subcategorySuspense,
} = useQuery({
    queryKey: ['subcategory', categorySlug.value, subcategorySlug.value],
    queryFn: fetchSubcategory,
})

await Promise.all([categorySuspense(), subcategorySuspense()])

const seoTitle = computed(() => subcategory.value?.seo?.title ?? subcategory.value?.name ?? null)
const seoDescription = computed(() => subcategory.value?.seo?.description ?? subcategory.value?.description ?? null)
const canonicalUrl = computed(() => `${useRuntimeConfig().public.appUrl}/catalog/category/${categorySlug.value}/${subcategorySlug.value}`)
</script>

<template>
    <div>
        <Head>
            <Title>{{ seoTitle }}</Title>
            <Meta
                v-if="seoDescription"
                name="description"
                :content="seoDescription"
            />
            <Meta
                v-if="seoDescription"
                property="og:description"
                :content="seoDescription"
            />
            <Meta
                v-if="seoDescription"
                name="twitter:description"
                :content="seoDescription"
            />
            <Link
                rel="canonical"
                :href="canonicalUrl"
            />
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
