<script setup lang="ts">
const { smartSearch } = useSearch()

const route = useRoute()

const searchQuery = computed(() => route.query.search as string || '')

async function fetcher() {
  return await smartSearch(searchQuery.value)
}

const {
  data: searchResult,
  suspense,
  isLoading,
} = useQuery({
  queryKey: ['search', searchQuery],
  queryFn: fetcher,
})

await suspense()

const displayQuery = computed(() => {
  return searchResult.value?.validQuery || searchQuery.value
})

const seoTitle = 'Поиск'
const seoDescription = 'Найденные товары в интернет-магазине Beze Studio'
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
    <section class="search-page spacer">
      <div class="search-page__container">
        <LayoutBreadcrumb :items="[{ title: 'Поиск' }]" />
        <UiPageTitle>
          {{ displayQuery ? `Поиск по запросу: «${displayQuery}»` : '' }}
        </UiPageTitle>
      </div>
      <div class="search-page__inner">
        <div class="search-page__wrapper">
          <UiSpinner v-if="isLoading" />
          <div
            v-else-if="searchResult?.products?.length"
            class="search-page__body"
          >
            <ProductItem
              v-for="product in searchResult.products"
              :key="product.id"
              :product="product"
            />
          </div>
          <LayoutEmpty v-else>
            <template #icon>
              <UiIcon
                name="sad"
                size="48"
              />
            </template>
            <template #title>
              Ничего не нашлось
            </template>
            <template #text>
              Проверьте, правильно ли введен запрос
            </template>
            <template #button>
              <UiButton
                outline
                href="/catalog"
              >
                Перейти в каталог
              </UiButton>
            </template>
          </LayoutEmpty>
        </div>
      </div>
    </section>
  </div>
</template>

<style lang="scss" scoped>
.search-page {
  &__filters {
    position: relative;
    z-index: 20;
    display: flex;
    gap: rem(20);
    align-items: center;
    justify-content: space-between;
    padding-bottom: rem(40);
    margin-bottom: rem(40);
    border-bottom: 1px solid rgb(54 54 54 / 10%);
  }

  &__categories {
    display: flex;
    gap: rem(20);
  }

  &__category {
    padding: rem(10) rem(20);
    border: 1px solid $extraColor;
    border-radius: rem(4);
    transition: all 0.3s ease-in-out;

    &:hover {
      color: $whiteColor;
      background-color: $extraColor;
    }

    &--active {
      color: $whiteColor;
      pointer-events: none;
      background-color: $extraColor;
    }
  }

  &__sort {
    min-width: rem(200);
  }

  &__wrapper {
    position: relative;
    display: grid;
    gap: rem(40);
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
}
</style>
