<script setup lang="ts">
import type { IInfoPageContent } from '@/types/api'
import { UiSpinner } from '#components'
import { useQuery } from '@tanstack/vue-query'

const fetcher = async () => await useFetcher<IInfoPageContent>(`/api/pages/sizes`)

const {
    data: sizes,
    suspense,
    isLoading,
} = useQuery({
    queryKey: ['sizes'],
    queryFn: fetcher,
})

await suspense()
</script>

<template>
    <div>
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
