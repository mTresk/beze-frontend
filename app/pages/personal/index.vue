<script setup lang="ts">
import { PersonalInfo, PersonalOrders } from '#components'

definePageMeta({
    middleware: ['verified'],
})

const { logout } = useSanctumAuth()

type TabName = 'PersonalOrders' | 'PersonalInfo'

const currentTab = ref<TabName>('PersonalOrders')

const tabs = {
    PersonalOrders,
    PersonalInfo,
} as const

const seoTitle = 'Личный кабинет'
const seoDescription = 'Личный кабинет интернет-магазина Beze Studio'
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
        <section class="personal spacer">
            <div class="personal__container">
                <LayoutBreadcrumb :items="[{ title: 'Личный кабинет' }]" />
                <div class="personal__header">
                    <UiPageTitle
                        flat
                        class="personal__title"
                    >
                        Личный кабинет
                    </UiPageTitle>
                    <UiLink
                        medium
                        @click="logout"
                    >
                        Выйти
                    </UiLink>
                </div>
                <div class="personal__body">
                    <div class="personal__navigation">
                        <button
                            class="personal__button"
                            type="button"
                            :class="[{ 'personal__button--active': currentTab === 'PersonalOrders' }]"
                            @click="currentTab = 'PersonalOrders'"
                        >
                            История заказов
                        </button>
                        <button
                            class="personal__button"
                            type="button"
                            :class="[{ 'personal__button--active': currentTab === 'PersonalInfo' }]"
                            @click="currentTab = 'PersonalInfo'"
                        >
                            Личные данные
                        </button>
                    </div>
                    <div class="personal__warapper">
                        <ClientOnly>
                            <component :is="tabs[currentTab]" />
                            <template #fallback>
                                <UiSpinner />
                            </template>
                        </ClientOnly>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<style lang="scss" scoped>
.personal {
    &__header {
        display: flex;
        align-items: center;
        justify-content: space-between;

        @include adaptive-value('gap', 40, 20);
        @include adaptive-value('margin-bottom', 30, 20);
    }

    &__body {
        display: grid;

        @include adaptive-value('gap', 30, 20);
    }

    &__navigation {
        display: flex;
        gap: rem(20);
        padding-bottom: rem(20);
        border-bottom: rem(1) solid rgb(54 54 54 / 10%);
    }

    &__button {
        line-height: 120%;
        white-space: nowrap;
        border: rem(1) solid $extraColor;
        border-radius: rem(4);
        transition: all 0.3s ease-in-out;

        @include adaptive-value('font-size', 16, 12);
        @include adaptive-value('padding-block', 10, 6);
        @include adaptive-value('padding-inline', 20, 10);

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
}
</style>
