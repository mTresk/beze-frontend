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

const seoTitle = 'Вишлист'
const seoDescription = 'Здесь лежат желанные товары'
const canonicalUrl = computed(() => `${useRuntimeConfig().public.appUrl}/favorites`)
</script>

<template>
    <div>
        <Head>
            <Title>{{ seoTitle }}</Title>
            <Meta
                name="description"
                :content="seoDescription"
            />
            <Meta
                property="og:description"
                :content="seoDescription"
            />
            <Meta
                name="twitter:description"
                :content="seoDescription"
            />
            <Link
                rel="canonical"
                :href="canonicalUrl"
            />
        </Head>
        <section class="favorites spacer">
            <div class="favorites__container">
                <LayoutBreadcrumb
                    :items="[
                        { title: 'Вишлист' },
                    ]"
                />
                <UiPageTitle>Вишлист</UiPageTitle>
                <UiSpinner v-if="isLoading && !isInitialized" />
                <div
                    v-else
                    class="favorites__wrapper"
                >
                    <div
                        v-if="wishlistItems.length"
                        class="favorites__body"
                    >
                        <TransitionGroup
                            name="wishlist-item"
                            tag="div"
                            class="favorites__grid"
                        >
                            <ProductItem
                                v-for="item in wishlistItems"
                                :key="item.id"
                                :product="item.product as IProduct"
                            />
                        </TransitionGroup>
                    </div>
                    <LayoutEmpty v-if="isInitialized && !wishlistItems.length">
                        <template #icon>
                            <UiIcon
                                name="favorite"
                                size="48"
                            />
                        </template>
                        <template #title>
                            Ваш вишлист пока пуст
                        </template>
                        <template #text>
                            Добавьте товары в вишлист, чтобы просматривать их здесь
                        </template>
                        <template #button>
                            <UiButton
                                outline
                                href="/catalog"
                            >
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
    &__grid {
        display: grid;
        grid-template-columns: repeat(4, 1fr);

        @include adaptive-value('column-gap', 25, 10);
        @include adaptive-value('row-gap', 45, 20);

        @media (max-width: $tablet) {
            grid-template-columns: repeat(2, 1fr);
        }
    }
}

.wishlist-item-enter-active,
.wishlist-item-leave-active {
    transition: all 0.3s ease;
}

.wishlist-item-enter-from {
    opacity: 0;
    transform: scale(0.8) translateY(20px);
}

.wishlist-item-leave-to {
    opacity: 0;
    transform: scale(0.8) translateY(-20px);
}

.wishlist-item-move {
    transition: transform 0.3s ease;
}
</style>
