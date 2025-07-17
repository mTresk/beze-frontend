<script setup lang="ts">
const { isAuthenticated } = useSanctumAuth()

const seoTitle = 'Успешный заказ'
const seoDescription = 'Успешный заказ в интернет-магазине Beze Studio'
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
        </Head>
        <div class="success-page">
            <div class="success-page__container">
                <LayoutBreadcrumb :items="[{ title: 'Заказ успешно оплачен' }]" />
                <div class="success-page__content">
                    <LayoutEmpty>
                        <template #icon>
                            <UiIcon
                                name="smile"
                                size="48"
                            />
                        </template>
                        <template #title>
                            Заказ успешно оплачен
                        </template>
                        <template #text>
                            Можете закрыть эту страницу
                        </template>
                        <template #button>
                            <UiButton
                                v-if="isAuthenticated"
                                outline
                                href="/personal"
                            >
                                Закрыть
                            </UiButton>
                            <UiButton
                                v-else
                                outline
                                href="/"
                            >
                                Закрыть
                            </UiButton>
                        </template>
                    </LayoutEmpty>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.success-page {
    &__content {
        padding-block: rem(100);
    }
}
</style>
