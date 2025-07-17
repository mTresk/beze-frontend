<script setup lang="ts">
import type { IInfoPageContent } from '@/types/api'

const client = useSanctumClient()

const fetcher = async () => await client<IInfoPageContent>(`/api/pages/sizes`)

const {
    data: sizes,
    suspense,
    isLoading,
} = useQuery({
    queryKey: ['sizes'],
    queryFn: fetcher,
})

await suspense()

const seoTitle = 'Таблица размеров'
const seoDescription = 'Таблица размеров интернет-магазина Beze Studio'
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
            :title="sizes!.data.name"
            :breadcrumb-items="[
                { title: sizes!.data.name },
            ]"
            :sidebar-links="sizes!.otherPages.map(page => ({ title: page.name, to: `/info/${page.slug}` }))"
        >
            <div v-html="sizes!.data.content" />
        </InfoPage>
    </div>
</template>
