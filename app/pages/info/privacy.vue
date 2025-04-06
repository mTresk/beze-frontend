<script setup lang="ts">
import type { IInfoPageContent } from '@/types/api'

const fetcher = async () => await useFetcher<IInfoPageContent>(`/api/pages/privacy`)

const {
    data: privacy,
    suspense,
    isLoading,
} = useQuery({
    queryKey: ['privacy'],
    queryFn: fetcher,
})

await suspense()
</script>

<template>
    <div>
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
