<script setup lang="ts">
import type { ApiResponse, IProduct, ProductsResponse } from '@/types/api'
import { useInfiniteQuery } from '@tanstack/vue-query'

async function fetcher({ pageParam = 1 }): Promise<ProductsResponse> {
    const data = await useFetcher<ApiResponse<IProduct[]>>(`api/products/bestsellers?page=${pageParam}`)

    return {
        pageData: data?.data || [],
        cursor: pageParam === data?.meta.last_page ? undefined : data?.meta.current_page + 1,
    }
}

const {
    data: products,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    suspense,
    isLoading,
} = useInfiniteQuery({
    queryKey: ['bestsellers'],
    queryFn: fetcher,
    getNextPageParam: (lastPage) => {
        return lastPage.cursor
    },
    initialPageParam: 1,
})

await suspense()
</script>

<template>
    <section class="bestsellers spacer">
        <div class="bestsellers__container">
            <UiTitle tag="h2" class="bestsellers__title">
                Рекомендуем
            </UiTitle>
        </div>
        <div class="bestsellers__inner">
            <UiSpinner v-if="isLoading" />
            <div v-if="!isLoading" class="bestsellers__wrapper">
                <div class="bestsellers__body">
                    <template v-for="(page, index) in products?.pages" :key="index">
                        <ProductItem v-for="product in page.pageData" :key="product.id" :product="product" />
                    </template>
                </div>
                <div v-if="hasNextPage" class="bestsellers__footer">
                    <UiButton
                        :disabled="isFetchingNextPage"
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
    // .bestsellers__inner
    &__inner {
        position: relative;
    }

    // .bestsellers__title
    &__title {
        @include adaptive-value('margin-bottom', 40, 18);
    }

    &__wrapper {
        display: grid;

        @include adaptive-value('gap', 45, 30);
    }

    // .bestsellers__body
    &__body {
        display: grid;
        grid-template-columns: repeat(4, 1fr);

        @include adaptive-value('column-gap', 25, 10);
        @include adaptive-value('row-gap', 45, 20);

        @media (max-width: $tablet) {
            grid-template-columns: repeat(2, 1fr);
        }
    }

    // .bestsellers__footer
    &__footer {
        display: flex;
        align-items: center;
        justify-content: center;
    }
}
</style>
