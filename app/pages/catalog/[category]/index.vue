<script setup lang="ts">
import type { ApiPaginationMeta, ApiResponse, ICategory, IProduct } from '@/types/api'
import { sortOptions } from '@/data/sort-options'
import { useQuery } from '@tanstack/vue-query'

const route = useRoute()

const meta = ref<ApiPaginationMeta>()

const currentPage = ref(Number(route.query.page) || 1)

const category = ref<ICategory>()

const categorySlug = computed(() => route.params.category)

const selectedSort = ref(route.query.sort || 'default')

const sort = computed({
    get: () => sortOptions.find(option => option.value === selectedSort.value) || sortOptions[0],
    set: (option) => {
        selectedSort.value = option?.value || 'default'
    },
})

const query = useQuery({
    queryKey: [`categories-${categorySlug.value}${route.params.slug ? `-${route.params.slug}` : ''}`, currentPage, selectedSort],
    queryFn: async () => {
        const params = new URLSearchParams()

        if (currentPage.value > 1) {
            params.append('page', String(currentPage.value))
        }

        if (selectedSort.value !== 'default') {
            params.append('sort', String(selectedSort.value))
        }

        const queryString = params.toString()
        const url = route.params.slug
            ? `api/products/categories/${categorySlug.value}/${route.params.slug}${queryString ? `?${queryString}` : ''}`
            : `api/products/categories/${categorySlug.value}${queryString ? `?${queryString}` : ''}`
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

async function getCategory() {
    return category.value = await useFetcher<ICategory>(`api/categories/${categorySlug.value}`)
}

await getCategory()

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
                        { title: 'Каталог', link: '/catalog' },
                        { title: category?.name || '' },
                    ]"
                />
                <UiPageTitle>Каталог</UiPageTitle>
                <div class="catalog__filters">
                    <div class="catalog__categories">
                        <NuxtLink
                            to="/catalog"
                            class="catalog__category"
                        >
                            Все товары
                        </NuxtLink>
                        <NuxtLink
                            v-for="subcategory in category?.subcategories"
                            :key="subcategory.id"
                            :to="`/catalog/${categorySlug}/${subcategory.slug}`"
                            class="catalog__category" :class="[
                                { 'catalog__category--active': route.params.slug === subcategory.slug },
                            ]"
                        >
                            {{ subcategory.name }}
                        </NuxtLink>
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
                    <LayoutPagination
                        v-if="!query.isLoading.value && meta"
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
    padding-top: rem(130);

    // .catalog__filters
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
            pointer-events: none;
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
</style>
