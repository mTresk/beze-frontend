<script setup lang="ts">
import type { IInfoPageContent } from '@/types/api'

const client = useSanctumClient()

const fetcher = async () => await client<IInfoPageContent>(`/api/pages/privacy`)

const {
    data: privacy,
    suspense,
    isLoading,
} = useQuery({
    queryKey: ['privacy'],
    queryFn: fetcher,
})

await suspense()

const seoTitle = 'Политика конфиденциальности'
const seoDescription = 'Политика конфиденциальности интернет-магазина Beze Studio'
</script>

<template>
    <div>
        <Head>
            <Title>{{ seoTitle }}</Title>
            <Meta name="description" :content="seoDescription" />
            <Meta property="og:description" :content="seoDescription" />
            <Meta name="twitter:description" :content="seoDescription" />
        </Head>
        <UiSpinner v-if="isLoading" />
        <InfoPage
            v-else
            :title="privacy!.data.name"
            :breadcrumb-items="[
                { title: privacy!.data.name },
            ]"
            :sidebar-links="privacy!.otherPages.map(page => ({ title: page.name, to: `/info/${page.slug}` }))"
        >
            <div v-html="privacy!.data.content" />
        </InfoPage>
    </div>
</template>
