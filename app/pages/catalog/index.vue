<script setup lang="ts">
import type { ICategory } from '@/types/api'

const client = useSanctumClient()

async function fetchCategories() {
    return await client<ICategory[]>('api/categories')
}

const {
    data: categories,
    suspense,
} = useQuery({
    queryKey: ['categories'],
    queryFn: fetchCategories,
})

await suspense()

const seoTitle = 'Каталог товаров'
const seoDescription = 'Каталог одежды и аксессуаров на утро невесты и для дома'
</script>

<template>
    <div>
        <Head>
            <Title>{{ seoTitle }}</Title>
            <Meta name="description" :content="seoDescription" />
            <Meta property="og:description" :content="seoDescription" />
            <Meta name="twitter:description" :content="seoDescription" />
        </Head>
        <Catalog
            api-url="api/products"
            :query-key="['products']"
            :breadcrumbs="[{ title: 'Каталог' }]"
            :categories="categories"
        />
    </div>
</template>
