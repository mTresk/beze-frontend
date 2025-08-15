<script setup lang="ts">
import type { IInfoPageContent } from '@/types/api'

const client = useSanctumClient()

const fetcher = async () => await client<IInfoPageContent>(`/api/pages/offer`)

const {
  data: offer,
  suspense,
  isLoading,
} = useQuery({
  queryKey: ['offer'],
  queryFn: fetcher,
})

await suspense()

const seoTitle = 'Договор оферты'
const seoDescription = 'Договор оферты интернет-магазина Beze Studio'
const canonicalUrl = computed(() => `${useRuntimeConfig().public.appUrl}/info/offer`)
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
      <Link
        rel="canonical"
        :href="canonicalUrl"
      />
    </Head>
    <UiSpinner v-if="isLoading" />
    <InfoPage
      v-else
      :title="offer!.data.name"
      :breadcrumb-items="[
        { title: offer!.data.name },
      ]"
      :sidebar-links="offer!.otherPages.map(page => ({ title: page.name, to: `/info/${page.slug}` }))"
    >
      <div v-html="offer!.data.content" />
    </InfoPage>
  </div>
</template>
