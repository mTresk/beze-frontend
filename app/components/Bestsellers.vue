<script setup lang="ts">
import type { ApiResponse, IProduct } from '@/types/api'

const client = useSanctumClient()

async function fetcher({ pageParam = 1 }) {
  const data = await client<ApiResponse<IProduct[]>>(`api/products/bestsellers?page=${pageParam}`)

  return {
    pageData: data.data || [],
    cursor: pageParam === data.meta.last_page ? undefined : data.meta.current_page + 1,
  }
}

const { data: productsData, fetchNextPage, hasNextPage, isFetchingNextPage, suspense, isLoading } = useInfiniteQuery({
  queryKey: ['bestsellers', { page: 'infinite' }],
  queryFn: fetcher,
  getNextPageParam: (lastPage) => { return lastPage.cursor },
  initialPageParam: 1,
})

await suspense()

const products = computed(() => {
  if (!productsData.value?.pages) {
    return []
  }

  return productsData.value.pages.flatMap(page => page.pageData)
})

watch(isFetchingNextPage, async (isFetching) => {
  if (!isFetching) {
    await nextTick()
  }
})
</script>

<template>
  <section class="bestsellers spacer">
    <div class="bestsellers__container">
      <UiTitle
        tag="h2"
        class="bestsellers__title"
      >
        Рекомендуем
      </UiTitle>
    </div>
    <div class="bestsellers__inner">
      <UiSpinner v-if="isLoading" />
      <div
        v-if="!isLoading"
        class="bestsellers__wrapper"
      >
        <div class="bestsellers__body">
          <ProductItem
            v-for="product in products"
            :key="product.id"
            :product="product"
          />
        </div>
        <div
          v-if="hasNextPage"
          class="bestsellers__footer"
        >
          <UiButton
            :is-loading="isFetchingNextPage"
            @click="fetchNextPage"
          >
            {{ isFetchingNextPage ? 'Загружаем' : 'Показать еще' }}
          </UiButton>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.bestsellers {
  &__inner {
    position: relative;
  }

  &__title {
    @include adaptive-value('margin-bottom', 40, 18);
  }

  &__wrapper {
    display: grid;

    @include adaptive-value('gap', 45, 30);
  }

  &__body {
    display: grid;
    grid-template-columns: repeat(4, 1fr);

    @include adaptive-value('column-gap', 25, 10);
    @include adaptive-value('row-gap', 45, 20);

    @media (max-width: $tablet) {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  &__footer {
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
