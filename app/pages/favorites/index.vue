<script setup lang="ts">
import type { IProduct } from '@/types/api'

const { wishlistItems, isLoading } = useWishlist()

const isInitialized = ref(false)

watch(isLoading, (value) => {
    if (!value) {
        isInitialized.value = true
    }
})

onMounted(() => {
    if (!isLoading.value) {
        isInitialized.value = true
    }
})
</script>

<template>
    <div>
        <section class="favorites spacer">
            <div class="favorites__container">
                <LayoutBreadcrumb
                    :items="[
                        { title: 'Вишлист' },
                    ]"
                />
                <UiPageTitle>Вишлист</UiPageTitle>
                <UiSpinner v-if="isLoading" />
                <div v-else class="favorites__wrapper">
                    <div v-if="wishlistItems.length" class="favorites__body">
                        <ProductItem
                            v-for="item in wishlistItems"
                            :key="item.id"
                            :product="item.product as IProduct"
                        />
                    </div>
                    <LayoutEmpty v-if="isInitialized && !wishlistItems.length">
                        <template #icon>
                            <UiIcon name="favorite" size="48" />
                        </template>
                        <template #title>
                            Ваш вишлист пока пуст
                        </template>
                        <template #text>
                            Добавьте товары в вишлист, чтобы просматривать их здесь
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

<style lang="scss">
.favorites {
    // .favorites__body
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
