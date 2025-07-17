<script setup lang="ts">
import type { IInfoPageContent } from '@/types/api'

const client = useSanctumClient()

const fetcher = async () => await client<IInfoPageContent>(`/api/pages/delivery`)

const {
    data: delivery,
    suspense,
    isLoading,
} = useQuery({
    queryKey: ['delivery'],
    queryFn: fetcher,
})

await suspense()

const seoTitle = 'Оплата и доставка'
const seoDescription = 'Информация об оплате и доставке в интернет-магазине Beze Studio'
</script>

<template>
    <div>
        <Head>
            <Title>{{ seoTitle }}</Title>
            <Meta
                name="description"
                :content="seoDescription"
            />
            <Meta
                property="og:description"
                :content="seoDescription"
            />
            <Meta
                name="twitter:description"
                :content="seoDescription"
            />
        </Head>
        <UiSpinner v-if="isLoading" />
        <InfoPage
            v-else
            :title="delivery!.data.name"
            :breadcrumb-items="[
                { title: delivery!.data.name },
            ]"
            :sidebar-links="delivery!.otherPages.map(page => ({ title: page.name, to: `/info/${page.slug}` }))"
        >
            <div v-html="delivery!.data.content" />
        </InfoPage>
    </div>
</template>
