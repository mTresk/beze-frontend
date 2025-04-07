<script setup lang="ts">
import type { IProduct, ISearchResult } from '@/types/api'
import type Lenis from 'lenis'
import { watchDebounced } from '@vueuse/core'

const { closeSearch } = useSearch()

const fetcher = async () => await useFetcher<IProduct[]>(`/api/products/featured`)

const lenis = useState<Lenis | null>('lenisVS')

const searchQuery = ref('')

const searchResult = ref<ISearchResult>()

const isLoading = ref(false)

const searchHistory = ref<string[]>([])

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

onMounted(() => {
    const savedHistory = localStorage.getItem('searchHistory')
    if (savedHistory) {
        searchHistory.value = JSON.parse(savedHistory)
    }
})

const {
    data: featured,
    suspense,
} = useQuery({
    queryKey: ['featured'],
    queryFn: fetcher,
})

await suspense()

async function handleSearch() {
    isLoading.value = true
    searchResult.value = await useFetcher<ISearchResult>('/api/search', {
        params: { search: searchQuery.value },
    })
    isLoading.value = false

    if (searchResult.value?.products?.length) {
        updateSearchHistory(searchQuery.value)
    }
}

function handleClose() {
    closeSearch()

    if (lenis.value) {
        lenis.value.start()
    }
}

watchDebounced(
    () => searchQuery.value,
    (value) => {
        if (value?.length) {
            handleSearch()
        }
        else {
            searchResult.value = undefined
        }
    },
    { debounce: 200, maxWait: 1000 },
)
</script>

<template>
    <section class="search">
        <div class="search__content">
            <div class="search__inner">
                <div class="search__header">
                    <h2 class="search__title">
                        {{ searchResult?.products?.length ? 'Вот, что мы нашли' : 'Вам может понравиться' }}
                    </h2>
                    <button
                        type="button"
                        class="search__close"
                        @click="handleClose"
                    >
                        Закрыть
                    </button>
                </div>
                <div class="search__body">
                    <div class="search__results">
                        <UiSpinner v-if="isLoading" />
                        <div v-else-if="searchResult?.products?.length" class="search__result">
                            <ProductItem v-for="product in searchResult.products.slice(0, 6)" :key="product.id" small :product="product" />
                        </div>
                        <div v-else class="search__result">
                            <ProductItem v-for="product in featured?.slice(0, 6)" :key="product.id" small :product="product" />
                        </div>
                        <UiButton
                            v-if="searchResult?.products?.length && !isLoading"
                            class="search__button"
                            :href="`/catalog/search?search=${encodeURIComponent(searchQuery)}`"
                            @click="handleClose"
                        >
                            Показать все
                        </UiButton>
                    </div>
                    <div class="search__form">
                        <label class="search__field">
                            <UiIcon name="search" size="20" />
                            <input v-model="searchQuery" type="text" autocomplete="off" class="search__input" placeholder="Поиск">
                        </label>
                        <div v-if="searchResult?.taps?.length" class="search__taps">
                            <div
                                v-for="tap in searchResult.taps.slice(0, 8)"
                                :key="tap.title"
                                class="search__tap"
                                @click="searchQuery = tap.title"
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
                    </div>
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
        padding-top: rem(20);
        padding-bottom: rem(30);
        background-color: $whiteColor;
    }

    // .search__header
    &__header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: rem(20);
    }

    // .search__title
    &__title {
        font-size: 24px;
        line-height: 140%;
    }

    // .search__close
    &__close {
        font-size: 18px;
        line-height: 140%;
        transition: color 0.3s ease-in-out;

        &:hover {
            color: $accentColor;
        }
    }

    // .search__body
    &__body {
        display: flex;
        gap: rem(50);
        align-items: flex-start;
    }

    // .search__results
    &__results {
        display: grid;
        flex: 1;
        gap: rem(30);
    }

    // .search__result
    &__result {
        display: grid;
        grid-template-columns: repeat(6, 1fr);
        gap: rem(20);
    }

    // .search__button
    &__button {
        height: rem(45);
    }

    // .search__form
    &__form {
        flex: 0 0 rem(370);
    }

    // .search__field
    &__field {
        display: flex;
        gap: rem(10);
        align-items: center;
        height: rem(45);
        padding-inline: rem(16);
        margin-bottom: rem(25);
        border: rem(1) solid $extraColor;
        border-radius: rem(4);

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

    // .search__taps
    &__taps {
        display: flex;
        flex-wrap: wrap;
        gap: rem(10);
        align-items: center;
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
        padding-top: rem(25);
        margin-top: rem(25);
        border-top: 1px solid $extraColor;
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
