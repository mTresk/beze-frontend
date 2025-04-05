<script setup lang="ts">
interface SidebarLink {
    to: string
    title: string
}

interface Props {
    title: string
    breadcrumbItems: Array<{
        title: string
        to?: string
    }>
    sidebarLinks?: SidebarLink[]
}

defineProps<Props>()
</script>

<template>
    <section class="info spacer">
        <div class="info__container">
            <LayoutBreadcrumb
                :items="breadcrumbItems"
            />
            <UiPageTitle class="info__title">
                {{ title }}
            </UiPageTitle>
            <div class="info__body">
                <div class="info__content content">
                    <slot />
                </div>
                <aside
                    v-if="sidebarLinks?.length"
                    class="info__sidebar sidebar"
                >
                    <p class="sidebar__label">
                        Другие материалы
                    </p>
                    <ul class="sidebar__list">
                        <li
                            v-for="link in sidebarLinks"
                            :key="link.to"
                            class="sidebar__item"
                        >
                            <NuxtLink
                                :to="link.to"
                                class="sidebar__link"
                            >
                                {{ link.title }}
                            </NuxtLink>
                        </li>
                    </ul>
                </aside>
            </div>
        </div>
    </section>
</template>

<style lang="scss" scoped>
.info {
    padding-top: rem(130);

    // .info__body
    &__body {
        display: flex;
        gap: rem(60);
        align-items: flex-start;
        justify-content: space-between;
    }

    // .info__content
    &__content {
        flex: 0 1 rem(880);
    }

    // .info__sidebar
    &__sidebar {
        position: sticky;
        top: rem(100);
        flex: 0 1 rem(340);
    }
}

.sidebar {
    display: grid;
    gap: rem(10);

    // .sidebar__label
    &__label {
        font-size: 14px;
        line-height: 140%;
        color: rgb(54 54 54 / 60%);
        text-transform: uppercase;
    }

    // .sidebar__list
    &__list {
        display: grid;
        gap: rem(10);
    }

    // .sidebar__link
    &__link {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        padding: rem(16);
        font-size: 16px;
        line-height: 140%;
        text-decoration: underline;
        text-decoration-thickness: 10%;
        text-decoration-style: dotted;
        text-underline-offset: rem(3);
        background-color: $lightColor;
        border-radius: rem(4);
        transition: all 0.3s ease-in-out;
        text-decoration-skip-ink: none;

        @media (any-hover: hover) {
            &:hover {
                color: $whiteColor;
                background-color: $extraColor;
            }
        }
    }
}
</style>
