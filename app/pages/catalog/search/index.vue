<script setup lang="ts">
import type { ISearchResult } from '@/types/api'

const route = useRoute()
const searchQuery = computed(() => route.query.search as string || '')

async function fetcher() {
    return await useFetcher<ISearchResult>(`/api/search`, {
        params: { search: searchQuery.value },
    })
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
</script>

<template>
    <div>
        <section class="search-page spacer">
            <div class="search-page__container">
                <LayoutBreadcrumb :items="[{ title: 'Поиск' }]" />
                <UiPageTitle>
                    {{ searchQuery ? `Поиск по запросу: «${searchQuery}»` : '' }}
                </UiPageTitle>
            </div>
            <div class="search-page__inner">
                <div class="search-page__wrapper">
                    <UiSpinner v-if="isLoading" />
                    <div v-else-if="searchResult?.products?.length" class="search-page__body">
                        <ProductItem
                            v-for="product in searchResult.products"
                            :key="product.id"
                            :product="product"
                        />
                    </div>
                    <LayoutEmpty v-else>
                        <template #icon>
                            <UiIcon name="sad" size="48" />
                        </template>
                        <template #title>
                            Ничего не нашлось
                        </template>
                        <template #text>
                            Проверьте, правильно ли введен запрос
                        </template>
                        <template #button>
                            <UiButton outline href="/catalog">
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
    padding-top: rem(130);

    // .search-page__filters
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

    // .search-page__categories
    &__categories {
        display: flex;
        gap: rem(20);
    }

    // .search-page__category
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

    // .search-page__sort
    &__sort {
        min-width: rem(200);
    }

    // .search-page__wrapper
    &__wrapper {
        position: relative;
        display: grid;
        gap: rem(40);
    }

    // .search-page__body
    &__body {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: rem(45) rem(25);
    }
}
</style>
