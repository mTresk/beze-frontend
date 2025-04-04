<script setup lang="ts">
import type { ApiPaginationMeta, ApiResponse, IProduct } from '@/types/api'
import { useQuery } from '@tanstack/vue-query'

const route = useRoute()
const meta = ref<ApiPaginationMeta>()
const currentPage = ref(Number(route.query.page) || 1)

const pages = computed(() => {
    if (!meta.value)
        return []

    const current = meta.value.current_page
    const last = meta.value.last_page
    const delta = 2

    const range = []
    const rangeWithDots = []

    for (let i = Math.max(2, current - delta); i <= Math.min(last - 1, current + delta); i++) {
        range.push(i)
    }

    if (current - delta > 2) {
        rangeWithDots.push(1, '...')
    }
    else {
        rangeWithDots.push(1)
    }

    range.forEach(i => rangeWithDots.push(i))

    if (current + delta < last - 1) {
        rangeWithDots.push('...', last)
    }
    else if (last !== 1) {
        rangeWithDots.push(last)
    }

    return rangeWithDots
})

const query = useQuery({
    queryKey: ['products', currentPage],
    queryFn: async () => {
        const data = await useFetcher<ApiResponse<IProduct[]>>(`api/products?page=${currentPage.value}`)
        return data
    },
})

await query.suspense()

meta.value = query.data.value?.meta

async function handlePageClick(page: number) {
    if (page === meta.value?.current_page)
        return

    await navigateTo({
        query: {
            ...route.query,
            page: page.toString(),
        },
    })
}

watch(
    () => route.query.page,
    (newPage) => {
        const page = Number(newPage) || 1
        if (page !== currentPage.value) {
            currentPage.value = page
        }
    },
)

watch(query.data, (newData) => {
    if (newData?.meta) {
        meta.value = newData.meta
    }
})
</script>

<template>
    <div>
        <section class="catalog spacer">
            <div class="catalog__container">
                <LayoutBreadcrumb
                    :items="[
                        { title: 'Каталог' },
                    ]"
                />
                <UiPageTitle>Каталог</UiPageTitle>
            </div>
            <div class="catalog__inner">
                <div class="catalog__filters">
                    ---
                </div>
                <div class="catalog__wrapper">
                    <UiSpinner v-if="query.isLoading.value" />
                    <div v-if="!query.isLoading.value" class="catalog__body">
                        <ProductItem
                            v-for="product in query.data.value?.data"
                            :key="product.id"
                            :product="product"
                        />
                    </div>

                    <div v-if="!query.isLoading.value && meta" class="catalog__pagination pagination">
                        <UiButton
                            v-if="meta.current_page > 1"
                            square
                            lite
                            :disabled="query.isFetching.value"
                            @click="handlePageClick(meta.current_page - 1)"
                        >
                            <UiIcon name="arrow-left" size="30" />
                        </UiButton>
                        <div class="pagination__pages">
                            <span
                                v-for="page in pages"
                                :key="page"
                                :class="{
                                    active: page === meta.current_page,
                                    dots: page === '...',
                                }"
                                @click="!query.isFetching.value && page !== '...' && handlePageClick(Number(page))"
                            >
                                {{ page }}
                            </span>
                        </div>
                        <UiButton
                            v-if="meta.current_page < meta.last_page"
                            square
                            lite
                            :disabled="query.isFetching.value"
                            @click="handlePageClick(meta.current_page + 1)"
                        >
                            <UiIcon name="arrow-right" size="30" />
                        </UiButton>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<style lang="scss" scoped>
.catalog {
    padding-top: rem(130);

    // .catalog__filters
    &__filters {
        // Стили для фильтров
    }

    // .catalog__wrapper
    &__wrapper {
        display: grid;
        gap: rem(40);
    }

    // .catalog__body
    &__body {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: rem(45) rem(25);
    }
}

.pagination {
    display: flex;
    gap: rem(10);
    align-items: center;
    justify-content: center;

    &__pages {
        display: flex;
        gap: rem(10);
        align-items: center;

        span {
            display: flex;
            align-items: center;
            justify-content: center;
            width: rem(40);
            height: rem(40);
            font-size: rem(16);
            line-height: 125%;
            cursor: pointer;
            border-radius: rem(4);
            transition: all 0.3s ease-in-out;

            &:not(.dots):hover {
                background-color: $lightColor;
            }

            &.active {
                pointer-events: none;
                background-color: $lightColor;
            }

            &.dots {
                cursor: default;
            }
        }
    }
}
</style>
