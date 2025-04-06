<script setup lang="ts">
import type { IInfoPageContent } from '@/types/api'

const fetcher = async () => await useFetcher<IInfoPageContent>(`/api/pages/delivery`)

const {
    data: delivery,
    suspense,
    isLoading,
} = useQuery({
    queryKey: ['delivery'],
    queryFn: fetcher,
})

await suspense()
</script>

<template>
    <div>
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
