<script setup lang="ts">
import type { IProduct, ISearchResult } from '@/types/api'
import type Lenis from 'lenis'
import { computed } from 'vue'

const { closeSearch } = useSearch()

const fetcher = async () => await useFetcher<IProduct[]>(`/api/products/featured`)

const lenis = useState<Lenis | null>('lenisVS')

const searchQuery = ref('')

const searchResult = ref<ISearchResult>()

const isLoading = ref(false)

const searchHistory = ref<string[]>([])

const productsPerRow = ref(6)

const currentProducts = ref<IProduct[]>([])

const currentTitle = ref('Вам может понравиться')

const displayedTitle = computed(() => {
    if (isLoading.value) {
        return currentTitle.value
    }

    if (searchQuery.value && !searchResult.value?.products?.length) {
        return ''
    }

    return searchResult.value?.products?.length ? 'Вот, что мы нашли' : 'Вам может понравиться'
})

function updateSearchHistory(query: string) {
    if (!query)
        return

    const currentHistory = [...searchHistory.value]

    const index = currentHistory.indexOf(query)
    if (index !== -1) {
        currentHistory.splice(index, 1)
    }

    currentHistory.unshift(query)

    searchHistory.value = currentHistory.slice(0, 5)

    localStorage.setItem('searchHistory', JSON.stringify(searchHistory.value))
}

const {
    data: featured,
    suspense,
} = useQuery({
    queryKey: ['featured'],
    queryFn: fetcher,
})

const displayedProducts = computed(() => {
    if (isLoading.value) {
        return currentProducts.value
    }

    if ((searchQuery.value && !searchResult.value?.products?.length)) {
        return []
    }

    const products = searchResult.value?.products || featured?.value
    return products?.slice(0, productsPerRow.value)
})

await suspense()

async function handleSearch() {
    isLoading.value = true
    searchResult.value = await useFetcher<ISearchResult>('/api/search', {
        params: { search: searchQuery.value },
    })
    isLoading.value = false
}

function handleClose() {
    closeSearch()

    if (lenis.value) {
        lenis.value.start()
    }

    document.documentElement.classList.remove('lock')
}

function handleSubmit() {
    if (searchQuery.value) {
        updateSearchHistory(searchQuery.value)
    }
    navigateTo(`/catalog/search?search=${encodeURIComponent(searchQuery.value)}`)
    handleClose()
}

function handleTapClick(tapTitle: string) {
    searchQuery.value = tapTitle
    updateSearchHistory(tapTitle)
}

function updateProductsPerRow() {
    const width = window.innerWidth
    if (width < 1100) {
        productsPerRow.value = 2
    }
    else if (width < 1440) {
        productsPerRow.value = 3
    }
    else if (width < 1600) {
        productsPerRow.value = 4
    }
    else if (width < 1800) {
        productsPerRow.value = 5
    }
    else {
        productsPerRow.value = 6
    }
}

watch(
    () => searchQuery.value,
    (value) => {
        if (value?.length) {
            currentProducts.value = displayedProducts.value || featured?.value?.slice(0, productsPerRow.value) || []
            currentTitle.value = displayedTitle.value
            handleSearch()
        }
        else {
            searchResult.value = undefined
        }
    },
)

onMounted(() => {
    currentProducts.value = featured?.value?.slice(0, productsPerRow.value) || []

    const savedHistory = localStorage.getItem('searchHistory')
    if (savedHistory) {
        searchHistory.value = JSON.parse(savedHistory)
    }

    updateProductsPerRow()
    window.addEventListener('resize', updateProductsPerRow)
})

onUnmounted(() => {
    window.removeEventListener('resize', updateProductsPerRow)
})
</script>

<template>
    <section class="search">
        <div class="search__content">
            <div class="search__inner">
                <div class="search__header">
                    <button
                        type="button"
                        class="search__close"
                        title="Закрыть"
                        @click="handleClose"
                    >
                        <UiIcon name="close" size="32" />
                    </button>
                </div>
                <div class="search__body">
                    <div v-if="searchQuery && !isLoading && searchResult && !searchResult.products?.length" class="search__empty">
                        <LayoutEmpty>
                            <template #icon>
                                <UiIcon name="sad" size="48" />
                            </template>
                            <template #title>
                                Ничего не нашлось
                            </template>
                            <template #text>
                                Проверьте, правильно ли введен запрос
                            </template>
                        </LayoutEmpty>
                    </div>
                    <div v-else class="search__results" :class="{ 'search__results--loading': isLoading }">
                        <h2 class="search__title">
                            {{ displayedTitle }}
                        </h2>
                        <UiSpinner v-if="isLoading" />
                        <div class="search__result">
                            <ProductItem
                                v-for="product in displayedProducts"
                                :key="product.id"
                                small
                                :product="product"
                                @click="handleClose"
                            />
                        </div>
                        <UiButton
                            v-if="searchResult?.products?.length"
                            class="search__button"
                            :href="`/catalog/search?search=${encodeURIComponent(searchQuery)}`"
                            @click="handleClose"
                        >
                            Показать все
                        </UiButton>
                    </div>

                    <form class="search__form" @submit.prevent="handleSubmit">
                        <div class="search__wrapper">
                            <button type="button" class="search__back" @click="handleClose">
                                <UiIcon name="arrow-left" size="20" />
                            </button>
                            <label class="search__field">
                                <UiIcon name="search" size="20" />
                                <input v-model="searchQuery" type="text" autocomplete="off" class="search__input" placeholder="Поиск">
                                <UiButtonSpinner v-if="isLoading" size="20" />
                                <button v-else-if="searchQuery" class="search__reset">
                                    <UiIcon
                                        name="close"
                                        size="20"
                                        @click="searchQuery = ''"
                                    />
                                </button>
                            </label>
                        </div>
                        <div v-if="searchResult?.taps?.length" class="search__taps">
                            <div
                                v-for="tap in searchResult.taps.slice(0, 8)"
                                :key="tap.title"
                                class="search__tap"
                                @click="handleTapClick(tap.title)"
                            >
                                {{ tap.title }}
                            </div>
                        </div>
                        <div v-if="searchHistory.length" class="search__history">
                            <p class="search__history-label">
                                Недавно искали
                            </p>
                            <ul class="search__history-list">
                                <li
                                    v-for="query in searchHistory"
                                    :key="query"
                                    class="search__history-item"
                                    @click="searchQuery = query"
                                >
                                    <span>{{ query }}</span>
                                    <UiIcon name="time" size="20" />
                                </li>
                            </ul>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </section>
</template>

<style lang="scss">
.search {
    position: fixed;
    inset: 0;
    z-index: 200;
    width: 100%;
    height: 100%;

    &::before {
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
        content: '';
        background-color: rgb(0 0 0 / 50%);
    }

    &__content {
        position: relative;
        z-index: 10;
        max-height: 100vh;
        padding-top: rem(30);
        padding-bottom: rem(30);
        overflow-y: auto;
        background-color: $whiteColor;

        @media (max-width: $mobile) {
            height: 100%;
            max-height: none;
        }
    }

    // .search__header
    &__header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: rem(20);

        @media (max-width: $mobile) {
            display: none;
        }
    }

    // .search__title
    &__title {
        line-height: 140%;

        @include adaptive-value('font-size', 24, 20);
    }

    // .search__close
    &__close {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-left: auto;
        transition: color 0.3s ease-in-out;

        &:hover {
            color: $accentColor;
        }
    }

    // .search__body
    &__body {
        display: flex;
        align-items: flex-start;

        @include adaptive-value('gap', 50, 30);

        @media (max-width: $mobile) {
            flex-direction: column-reverse;
        }
    }

    // .search__results
    &__results {
        position: relative;
        display: grid;
        flex: 1;
        gap: rem(20);
        min-width: rem(360);
        min-height: rem(390);
        margin-top: rem(-55);

        &--loading {
            pointer-events: none;
            opacity: 0.5;
        }

        @media (max-width: $mobile) {
            min-height: auto;
            margin: 0;
        }
    }

    // .search__result
    &__result {
        display: grid;
        grid-template-columns: repeat(6, 1fr);
        gap: rem(20);

        @media (max-width: em(1799)) {
            grid-template-columns: repeat(5, 1fr);
        }

        @media (max-width: em(1599)) {
            grid-template-columns: repeat(4, 1fr);
        }

        @media (max-width: em(1439)) {
            grid-template-columns: repeat(3, 1fr);
        }

        @media (max-width: em(1099)) {
            grid-template-columns: repeat(2, 1fr);
        }
    }

    // .search__empty
    &__empty {
        display: flex;
        align-items: center;
        align-self: center;
        justify-content: center;
        width: 100%;
    }

    // .search__button
    &__button {
        height: rem(45);
    }

    // .search__form
    &__form {
        flex: 0 1 rem(370);

        @media (max-width: $mobile) {
            flex: unset;
            width: 100%;
        }
    }

    &__wrapper {
        display: flex;
        gap: rem(10);
        align-items: center;
        margin-bottom: rem(25);
    }

    // .search__field
    &__field {
        display: flex;
        flex: 1;
        gap: rem(10);
        align-items: center;
        border: rem(1) solid $extraColor;
        border-radius: rem(4);

        @include adaptive-value('height', 45, 40);
        @include adaptive-value('padding-inline', 16, 10);

        &:has(input:focus) {
            border-color: $accentColor;

            svg {
                color: $accentColor;
            }
        }

        svg {
            color: $extraColor;
        }
    }

    &__back {
        display: none;

        @media (max-width: $mobile) {
            display: flex;
            align-items: center;
            justify-content: center;
            color: $extraColor;
            border: rem(1) solid $extraColor;
            border-radius: rem(4);

            @include adaptive-value('width', 45, 40);
            @include adaptive-value('height', 45, 40);
        }
    }

    // .search__input
    &__input {
        width: 100%;
        font-size: 14px;
        line-height: 130%;

        &::placeholder {
            color: rgb(54 54 54 / 50%);
        }

        &:focus {
            &::placeholder {
                opacity: 0;
            }
        }
    }

    // .search__reset
    &__reset {
        display: flex;
        align-items: center;
        justify-content: center;
        transition: color 0.3s ease-in-out;

        &:hover {
            color: $accentColor;
        }
    }

    // .search__taps
    &__taps {
        display: flex;
        flex-wrap: wrap;
        gap: rem(10);
        align-items: center;
        padding-bottom: rem(25);
        border-bottom: 1px solid $extraColor;
    }

    // .search__tap
    &__tap {
        padding: rem(5) rem(10);
        font-size: 14px;
        line-height: 120%;
        cursor: pointer;
        border: 1px solid $mainColor;
        border-radius: rem(4);
        transition: all 0.3s ease-in-out;

        @media (any-hover: hover) {
            &:hover {
                color: $accentColor;
                border-color: $accentColor;
            }
        }
    }

    // .search__history
    &__history {
        display: grid;
        gap: rem(15);
        margin-top: rem(25);
    }

    // .search__history-label
    &__history-label {
        font-size: 12px;
        line-height: 120%;
        color: rgb(54 54 54 / 60%);
        text-transform: uppercase;
    }

    // .search__history-list
    &__history-list {
        display: grid;
        gap: rem(20);
    }

    // .search__history-item
    &__history-item {
        display: flex;
        gap: rem(20);
        align-items: center;
        justify-content: space-between;
        font-size: 18px;
        line-height: 120%;
        cursor: pointer;
        transition: color 0.3s ease-in-out;

        @media (any-hover: hover) {
            &:hover {
                color: $accentColor;

                svg {
                    color: $accentColor;
                }
            }
        }

        svg {
            color: $extraColor;
            transition: color 0.3s ease-in-out;
        }
    }
}
</style>
