<script setup lang="ts">
import type { IInfoPageContent } from '@/types/api'
import { UiSpinner } from '#components'
import { useQuery } from '@tanstack/vue-query'

const fetcher = async () => await useFetcher<IInfoPageContent>(`/api/pages/refund`)

const {
    data: refund,
    suspense,
    isLoading,
} = useQuery({
    queryKey: ['refund'],
    queryFn: fetcher,
})

await suspense()
</script>

<template>
    <div>
        <UiSpinner v-if="isLoading" />
        <InfoPage
            v-else
            :title="refund!.data.name"
            :breadcrumb-items="[
                { title: refund!.data.name },
            ]"
            :sidebar-links="refund!.otherPages.map(page => ({ title: page.name, to: `/info/${page.slug}` }))"
        >
            <div v-html="refund!.data.content" />
        </InfoPage>
    </div>
</template>
