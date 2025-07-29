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

const seoTitle = computed(() => category.value?.seo?.title ?? category.value?.name ?? null)
const seoDescription = computed(() => category.value?.seo?.description ?? category.value?.description ?? null)
const canonicalUrl = computed(() => `${useRuntimeConfig().public.appUrl}/catalog/category/${categorySlug.value}`)
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
            :api-url="`api/products/categories/${categorySlug}`"
            :query-key="[`categories-${categorySlug}`]"
            :breadcrumbs="[
                { title: 'Каталог', link: '/catalog' },
                { title: category?.name || '' },
            ]"
            :current-category="category"
            :base-url="`/catalog/category/${categorySlug}`"
        />
    </div>
</template>
