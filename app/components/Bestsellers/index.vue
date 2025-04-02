<script setup lang="ts">
import type { ApiResponse, IProduct, ProductsResponse } from '@/types/api'
import { useInfiniteQuery } from '@tanstack/vue-query'

async function fetcher({ pageParam = 1 }): Promise<ProductsResponse> {
    const data = await useFetcher<ApiResponse<IProduct[]>>(`api/bestsellers?page=${pageParam}`)

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
                <div class="bestsellers__footer">
                    <UiButton
                        v-if="hasNextPage"
                        :disabled="isFetchingNextPage" @click="fetchNextPage"
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
        margin-bottom: rem(40);
    }

    &__wrapper {
        display: grid;
        gap: rem(30);
    }

    // .bestsellers__body
    &__body {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: rem(45) rem(25);
    }

    // .bestsellers__footer
    &__footer {
        display: flex;
        align-items: center;
        justify-content: center;
    }
}
</style>
