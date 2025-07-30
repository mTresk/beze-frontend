<script setup lang="ts">
import type { ApiPaginationMeta, ApiResponse, ICategory, IProduct } from '@/types/api'
import { sortOptions } from '@/data/sort-options'

interface Props {
    apiUrl: string
    queryKey: string[]
    breadcrumbs: Array<{ title: string, link?: string }>
    categories?: ICategory[]
    currentCategory?: ICategory
    baseUrl?: string
}

const props = defineProps<Props>()

const client = useSanctumClient()

const route = useRoute()

const meta = ref<ApiPaginationMeta>()

const currentPage = ref(Number(route.query.page) || 1)

const selectedSort = ref(route.query.sort || 'default')

const sort = computed({
    get: () => sortOptions.find(option => option.value === selectedSort.value) || sortOptions[0],
    set: (option) => {
        selectedSort.value = option?.value || 'default'
    },
})

const query = useQuery({
    queryKey: [...props.queryKey, currentPage, selectedSort],
    queryFn: async () => {
        const params = new URLSearchParams()

        if (currentPage.value > 1) {
            params.append('page', String(currentPage.value))
        }

        if (selectedSort.value !== 'default') {
            params.append('sort', String(selectedSort.value))
        }

        const queryString = params.toString()
        const url = `${props.apiUrl}${queryString ? `?${queryString}` : ''}`

        return client<ApiResponse<IProduct[]>>(url)
    },
})

const cachedData = ref<IProduct[]>([])

await query.suspense()

if (query.data.value?.data) {
    cachedData.value = query.data.value.data
}

meta.value = query.data.value?.meta

if (meta.value && currentPage.value > meta.value.last_page && meta.value.last_page > 0) {
    throw createError({
        statusCode: 404,
        statusMessage: 'Страница не найдена',
    })
}

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

    if (selectedSort.value !== 'default') {
        query.sort = selectedSort.value
    }

    await navigateTo({ query })
}

watch(query.data, (newData) => {
    if (newData?.data) {
        cachedData.value = newData.data
    }
    if (newData?.meta) {
        meta.value = newData.meta
    }
})

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
    const newQuery = { ...route.query }

    if (newSort === 'default') {
        delete newQuery.sort
    }
    else {
        newQuery.sort = newSort
    }

    delete newQuery.page

    await navigateTo({ query: newQuery })

    currentPage.value = 1
})
</script>

<template>
    <div>
        <section class="catalog spacer">
            <div class="catalog__container">
                <LayoutBreadcrumb :items="breadcrumbs" />
                <UiPageTitle>Каталог</UiPageTitle>
                <div class="catalog__filters">
                    <div class="catalog__categories">
                        <template v-if="categories">
                            <NuxtLink
                                v-for="category in categories"
                                :key="category.id"
                                :to="`/catalog/category/${category.slug}`"
                                class="catalog__category"
                            >
                                {{ category.name }}
                            </NuxtLink>
                        </template>
                        <template v-else-if="currentCategory">
                            <NuxtLink
                                v-if="!route.params.subcategory"
                                to="/catalog"
                                class="catalog__category"
                            >
                                Все товары
                            </NuxtLink>
                            <NuxtLink
                                v-else
                                :to="baseUrl || '/catalog/category'"
                                class="catalog__category"
                            >
                                Вся категория
                            </NuxtLink>
                            <NuxtLink
                                v-for="subcategory in currentCategory.subcategories"
                                :key="subcategory.id"
                                :to="`${baseUrl}/${subcategory.slug}`"
                                class="catalog__category"
                                :class="[
                                    { 'catalog__category--active': route.params.subcategory === subcategory.slug },
                                ]"
                            >
                                {{ subcategory.name }}
                            </NuxtLink>
                        </template>
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
                    <UiSpinner v-if="query.isLoading.value && !cachedData.length" />
                    <div
                        v-if="cachedData.length"
                        class="catalog__body"
                        :class="{ 'catalog__body--loading': query.isFetching.value }"
                    >
                        <ProductItem
                            v-for="product in cachedData"
                            :key="`${product.id}-${query.isFetching.value}`"
                            :product="product"
                        />
                    </div>
                    <LayoutPagination
                        v-if="meta"
                        :meta="meta"
                        :is-loading="query.isFetching.value"
                        @page-click="handlePageClick"
                    />
                </div>
            </div>
        </section>
    </div>
</template>

<style lang="scss" scoped>
.catalog {
    &__filters {
        position: relative;
        z-index: 20;
        display: flex;
        gap: rem(20);
        align-items: center;
        justify-content: space-between;
        border-bottom: rem(1) solid rgb(54 54 54 / 10%);

        @include adaptive-value('padding-bottom', 40, 20);
        @include adaptive-value('margin-bottom', 40, 20);

        @media (max-width: $tablet) {
            display: grid;
            justify-content: unset;
        }
    }

    &__categories {
        display: flex;
        flex-wrap: wrap;

        @include adaptive-value('gap', 10, 6);
    }

    &__category {
        line-height: 120%;
        white-space: nowrap;
        border: rem(1) solid $extraColor;
        border-radius: rem(4);
        transition: all 0.3s ease-in-out;

        @include adaptive-value('font-size', 16, 12);
        @include adaptive-value('padding-block', 10, 6);
        @include adaptive-value('padding-inline', 20, 10);

        @media (any-hover: hover) {
            &:hover {
                color: $whiteColor;
                background-color: $extraColor;
            }
        }

        &--active {
            color: $whiteColor;
            pointer-events: none;
            background-color: $extraColor;
        }
    }

    &__sort {
        align-self: flex-start;
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

        &--loading {
            pointer-events: none;
            opacity: 0.5;
        }
    }
}
</style>
