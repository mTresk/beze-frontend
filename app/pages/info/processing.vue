<script setup lang="ts">
import type { IInfoPageContent } from '@/types/api'

const client = useSanctumClient()

const fetcher = async () => await client<IInfoPageContent>(`/api/pages/processing`)

const { data: processing, suspense, isLoading } = useQuery({
  queryKey: ['processing'],
  queryFn: fetcher,
})

await suspense()

const seoTitle = 'Согласие на обработку персональных данных'
const seoDescription = 'Согласие на обработку персональных данных интернет-магазина Beze Studio'
const canonicalUrl = computed(() => `${useRuntimeConfig().public.appUrl}/info/processing`)
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
      :title="processing!.data.name"
      :breadcrumb-items="[
        { title: processing!.data.name },
      ]"
      :sidebar-links="processing!.otherPages.map(page => ({ title: page.name, to: `/info/${page.slug}` }))"
    >
      <div v-html="processing!.data.content" />
    </InfoPage>
  </div>
</template>
