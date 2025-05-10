<script setup lang="ts">
const { isAuthenticated } = useSanctumAuth()
</script>

<template>
    <div>
        <div class="success-page">
            <div class="success-page__container">
                <LayoutBreadcrumb :items="[{ title: 'Заказ успешно оформлен' }]" />
                <div class="success-page__content">
                    <LayoutEmpty>
                        <template #icon>
                            <UiIcon name="success" size="48" />
                        </template>
                        <template #title>
                            Заказ успешно оформлен
                        </template>
                        <template #text>
                            Можете закрыть эту страницу
                        </template>
                        <template #button>
                            <UiButton v-if="isAuthenticated" outline href="/personal">
                                Закрыть
                            </UiButton>
                            <UiButton v-else outline href="/">
                                Закрыть
                            </UiButton>
                        </template>
                    </LayoutEmpty>
                </div>
            </div>
        </div>
    </div>
</template>
