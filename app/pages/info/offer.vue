<script setup lang="ts">
import type { IInfoPageContent } from '@/types/api'
import { UiSpinner } from '#components'
import { useQuery } from '@tanstack/vue-query'

async function fetcher() {
    return await useFetcher<IInfoPageContent>(`/api/pages/offer`)
}

const {
    data: offer,
    suspense,
    isLoading,
} = useQuery({
    queryKey: ['offer'],
    queryFn: fetcher,
})

await suspense()
</script>

<template>
    <div>
        <UiSpinner v-if="isLoading" />
        <InfoPage
            v-else
            :title="offer?.data.name"
            :breadcrumb-items="[
                { title: offer?.data.name },
            ]"
            :sidebar-links="offer?.otherPages.map(page => ({ title: page.name, to: `/info/${page.slug}` }))"
        >
            <div v-html="offer?.data.content" />
        </InfoPage>
    </div>
</template>
