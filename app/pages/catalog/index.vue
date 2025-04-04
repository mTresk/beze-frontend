<script setup lang="ts">
import type { ApiPaginationMeta, ApiResponse, IProduct } from '@/types/api'
import { useQuery } from '@tanstack/vue-query'

const route = useRoute()
const meta = ref<ApiPaginationMeta>()
const currentPage = ref(Number(route.query.page) || 1)

const sortOptions = [
    {
        id: 1,
        value: 'default',
        name: 'По умолчанию',
    },
    {
        id: 2,
        value: 'price_asc',
        name: 'Сначала дешевле',
    },
    {
        id: 3,
        value: 'price_desc',
        name: 'Сначала дороже',
    },

    {
        id: 4,
        value: 'newest',
        name: 'Сначала новые',
    },
]

const selectedSort = ref(route.query.sort || 'default')
const sort = computed({
    get: () => sortOptions.find(option => option.value === selectedSort.value) || sortOptions[0],
    set: (option) => {
        selectedSort.value = option?.value || 'default'
    },
})

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
    queryKey: ['products', currentPage, selectedSort],
    queryFn: async () => {
        const params = new URLSearchParams()

        if (currentPage.value > 1) {
            params.append('page', String(currentPage.value))
        }

        if (selectedSort.value !== 'default') {
            params.append('sort', String(selectedSort.value))
        }

        const queryString = params.toString()
        const url = `api/products${queryString ? `?${queryString}` : ''}`
        const data = await useFetcher<ApiResponse<IProduct[]>>(url)
        return data
    },
})

await query.suspense()

meta.value = query.data.value?.meta

async function handlePageClick(page: number) {
    if (page === meta.value?.current_page)
        return

    const query = { ...route.query }

    if (page === 1) {
        delete query.page
    }
    else {
        query.page = page.toString()
    }

    await navigateTo({ query })
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

watch(
    () => route.query.sort,
    (newSort) => {
        if (newSort !== selectedSort.value) {
            selectedSort.value = newSort || 'default'
        }
    },
)

watch(selectedSort, async (newSort) => {
    const query = { ...route.query }

    if (newSort === 'default') {
        delete query.sort
    }
    else {
        query.sort = newSort
    }

    delete query.page

    await navigateTo({ query })
    currentPage.value = 1
})

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
                <div class="catalog__filters">
                    <div class="catalog__categories">
                        <a href="#" class="catalog__category catalog__category--active">
                            Все товары
                        </a>
                        <a href="#" class="catalog__category">
                            Для невест
                        </a>
                        <a href="#" class="catalog__category">
                            Для дома
                        </a>
                    </div>
                    <div class="catalog__sort">
                        <VFormSelect
                            v-model="sort"
                            placeholder="По умолчанию"
                            :options="sortOptions"
                        />
                    </div>
                </div>
            </div>
            <div class="catalog__inner">
                <div class="catalog__wrapper">
                    <UiSpinner v-if="query.isLoading.value" />
                    <div v-if="!query.isLoading.value" class="catalog__body">
                        <ProductItem
                            v-for="product in query.data.value?.data"
                            :key="product.id"
                            :product="product"
                        />
                    </div>
                    <div v-if="!query.isLoading.value && meta && meta.last_page > 1" class="catalog__pagination pagination">
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
        position: relative;
        z-index: 20;
        display: flex;
        gap: rem(20);
        align-items: center;
        justify-content: space-between;
        margin-bottom: rem(40);
    }

    // .catalog__categories
    &__categories {
        display: flex;
        gap: rem(20);
    }

    // .catalog__category
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
            background-color: $extraColor;
        }
    }

    // .catalog__sort
    &__sort {
        min-width: rem(200);
    }

    // .catalog__wrapper
    &__wrapper {
        position: relative;
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
                color: $whiteColor;
                background-color: $extraColor;
            }

            &.active {
                color: $whiteColor;
                pointer-events: none;
                background-color: $extraColor;
            }

            &.dots {
                cursor: default;
            }
        }
    }
}
</style>
