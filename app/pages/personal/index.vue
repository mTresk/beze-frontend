<script setup lang="ts">
definePageMeta({
    middleware: ['verified'],
})

const { logout } = useSanctumAuth()
</script>

<template>
    <div>
        <section class="personal spacer">
            <div class="personal__container">
                <LayoutBreadcrumb :items="[{ title: 'Личный кабинет' }]" />
                <div class="personal__header">
                    <UiPageTitle flat class="personal__title">
                        Личный кабинет
                    </UiPageTitle>
                    <UiLink medium @click="logout()">
                        Выйти
                    </UiLink>
                </div>
            </div>
        </section>
    </div>
</template>

<style lang="scss" scoped>
.personal {
    // .personal__header
    &__header {
        display: flex;
        align-items: center;
        justify-content: space-between;

        @include adaptive-value('gap', 40, 20);
        @include adaptive-value('margin-bottom', 30, 20);
    }
}
</style>
